char *inputs[] = { "-U---","-D---","-L---","-R---","--U--","--D--","--L--","--R--","---U-","---D-","---L-","---R-","-UU--","-U-U-","-DD--","-D-D-","-LL--","-L-L-","-RR--","-R-R-","--UU-","--DD-","--LL-","--RR-","-UD--","-UL--","-UR--","-U-D-","-U-L-" };
char *letters[] = { " ","E","A","178","R","I","O","T","N","S","L","176","C","U","D","P","M","H","G","B","F","Y","W","K","V","X","Z","J","Q" };
const int NUM_LETTERS =  29 ;


// above are outputs of the generate_layout.py script to generate key layouts
char *map_letter(char* input)
{// (wish I had a dict now)
    for (int i=0;i<NUM_LETTERS;i++){ // iterate over all options 
      if(strcmp(input, inputs[i]) == 0) { // see if there's a match
        return letters[i]; // return the match
      }
    }
    return "none"; // no match
}
