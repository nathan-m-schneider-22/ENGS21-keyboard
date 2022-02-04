char *inputs[] = { "-U---","-D---","-L---","-R---","--U--","--D--","--L--","--R--","-UU--","-DD--","-LL--","-RR--","-UD--","-UL--","-UR--","-DU--","-DL--","-DR--","-LU--","-LD--","-LR--","-RU--","-RD--","-RL--" };
char *letters[] = { "E","A","R","I","O","T","N","S","L","C","U","D","P","M","H","G","B","F","Y","W","K","V","X","Z" };
const int NUM_LETTERS =  24 ;


// above are outputs of the generate_layout.py script to generate key layouts
char *map_letter(char* input)
{// (wish I had a dict now)
    for (int i=0;i<NUM_LETTERS;i++){ // iterate over all options 
      if(strcmp(input, inputs[i]) == 0) { // see if there's a match
        return letters[i]; // return the match
      }
    }
    return ""; // no match
}
