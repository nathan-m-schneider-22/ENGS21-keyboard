# Generates input combinations for different key/finger layouts
import itertools
import sys
from re import L
NON_PRESS = "-"

SPECIAL_KEY_NAMES = {'"178"': '"⌫"', '"176"': '"↩"', '"179"': '"⇥"',
                     '" "': "⎵", '"131"': '"⌘"', '"128"': '"⌃"', '"130"': '"⌥"'}
FRONT_END_LAYOUT_PATH = './learning_frontend/src/constants/layout.js'
STICKY = ["130", "131", "128"]


def get_letters(filename):  # Pull the desired outputs
    lines = open(filename).read().split("\n")
    return lines


# Rate the difficulty of an input combination based on custom criteria
def rate_difficulty(keys):
    difficulty = 10*(len(keys) - keys.count(NON_PRESS))
    difficulty += len(set(keys))
    return difficulty


# Determine whether a given input combination can be accomplished by the given keys
def valid_input(input, key_layout, finger_layout):
    if input.count(NON_PRESS) == 5:
        return False

    for i in range(len(input)):
        press = input[i]
        if press != NON_PRESS:
            if key_layout[i] != "1":
                return False

    ranges = [(0, 1), (0, 1, 2), (1, 2, 3), (2, 3), [4]]
    finger_layout = [f for f in finger_layout]
    for i in range(len(input)):
        if input[i] != NON_PRESS:
            valid = False
            for f_index in ranges[i]:
                if finger_layout[f_index] == '1':
                    valid = True
                    finger_layout[f_index] = '0'
                    break
            if not valid:
                return False
    return True


# Find and print the inputs based on most-used letters and easiest inputs
def main(input_file, key_layout, finger_layout):
    # options = ["↑", "↓", "→", "←", NON_PRESS]
    options = ["U", "D", "L", "R", NON_PRESS]

    all_inputs = list(itertools.product(
        options, repeat=5))  # All combinations

    # Reduce to all `possible` combinations
    possible_inputs = [i for i in all_inputs
                       if valid_input(i, key_layout, finger_layout)]
    possible_inputs.sort(key=rate_difficulty)  # sort them based on difficulty
    letters = get_letters(input_file)

    # Convert tuples to strings
    input_strings = ["".join(inp) for inp in possible_inputs]
    for i in range(len(letters)):
        try:
            # print in list form
            print("%s: %s" % (input_strings[i], letters[i]))

        except:
            print("ERROR: Cannot calculate mapping for this configuration")
            exit(1)

    input_strings = ['"' + inp + '"' for inp in input_strings]
    # print in Arduino Form
    print()
    print("char *inputs[] = {", ','.join(input_strings[0:len(letters)]), "};")
    lowercase = ['"' + l.split(',')[0] + '"' for l in letters]
    uppercase = ['"' + l.split(',')[-1] + '"' for l in letters]
    for i in range(len(lowercase)):
        if lowercase[i] == '""':
            lowercase[i] = '","'

    sticky = [str(int(l.split(',')[0] in STICKY)) for l in letters]
    print("char *lowercase[] = {", ','.join(lowercase), "};")
    print("int sticky[] = {", ','.join(sticky), "};")
    print("const int NUM_LETTERS = ", len(letters), ";")

    f = open(FRONT_END_LAYOUT_PATH, "w")
    f.write("export const keyMapping = \n`")
    for i in range(len(letters)):
        tempLine = ""
        if lowercase[i] in SPECIAL_KEY_NAMES:
            tempLine = "%s: %s" % (
                input_strings[i], SPECIAL_KEY_NAMES[lowercase[i]])
        else:
            tempLine = "%s: %s" % (input_strings[i], lowercase[i])
        if uppercase[i] in SPECIAL_KEY_NAMES:
            tempLine = tempLine + SPECIAL_KEY_NAMES[uppercase[i]]
        else:
            tempLine = tempLine + uppercase[i]

        f.write(tempLine.replace('"', '') + "\n")
    f.write('`\nexport const keyLayout = "%s"' % key_layout)


if __name__ == "__main__":
    if len(sys.argv) != 4:  # Incorrect number of inputs, use this schema
        print("ERROR: To generate a key layout, run this script with the arguments:")
        print(
            "python generate_layout.py <INPUT_FILE> <KEY OPTIONS> <FINGER OPTIONS>")
        print(
            "ex: python generate_layout.py ranked_inputs.txt 11001 01001"
        )
        exit(1)
    main(sys.argv[1], sys.argv[2], sys.argv[3])
