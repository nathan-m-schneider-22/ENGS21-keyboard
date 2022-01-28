# Generates input combinations for different key/finger layouts
import itertools
import sys
from re import L
NON_PRESS = "-"


def get_letters(filename):  # Pull the desired outputs
    lines = open(filename).read().split("\n")
    return lines


# Rate the difficulty of an input combination based on custom criteria
def rate_difficulty(keys):
    difficulty = 10*(len(keys) - keys.count(NON_PRESS))
    difficulty += len(set(keys))
    return difficulty


# Find and print the inputs based on most-used letters and easiest inputs
def main(input_file, num_keys, num_fingers):
    # options = ["↑", "↓", "→", "←", NON_PRESS]
    options = ["U", "D", "L", "R", NON_PRESS]

    all_inputs = list(itertools.product(
        options, repeat=num_keys))  # All combinations

    # Reduce to all `possible` combinations
    possible_inputs = [i for i in all_inputs
                       if i.count(NON_PRESS) >= num_keys-num_fingers and i.count(NON_PRESS) != num_keys]
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
    print("char *inputs[] = {", ','.join(input_strings[0:len(letters)]), "};")
    letters = ['"' + l + '"' for l in letters]
    print("char *letters[] = {", ','.join(letters), "};")
    print("const int NUM_LETTERS = ", len(letters), ";")


if __name__ == "__main__":
    if len(sys.argv) != 4:  # Incorrect number of inputs, use this schema
        print("ERROR: To generate a key layout, run this script with the arguments:")
        print(
            "python generate_layout.py <INPUT_FILE> <NUM_KEYS> <NUM_FINGERS>")
        exit(1)
    main(sys.argv[1], int(sys.argv[2]), int(sys.argv[3]))
