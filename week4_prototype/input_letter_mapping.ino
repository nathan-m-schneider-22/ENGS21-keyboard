char *inputs[] = { "-U---","-D---","-L---","-R---","--U--","--D--","--L--","--R--","---U-","---D-","---L-","---R-","-UU--","-U-U-","-DD--","-D-D-","-LL--","-L-L-","-RR--","-R-R-","--UU-","--DD-","--LL-","--RR-","-UD--","-UL--","-UR--","-U-D-","-U-L-","-U-R-","-DU--","-DL--","-DR--","-D-U-","-D-L-","-D-R-","-LU--","-LD--","-LR--","-L-U-","-L-D-","-L-R-","-RU--" };
char *lowercase[] = { " ","178","e","t","a","o","i","n","s","r","h","l","d","c","u","m","f","g","p","y","w","176","b","v","k","x","j","q","z","",".","-","'","1","2","3","4","5","6","7","8","9","0" };
char *uppercase[] = { " ","","E","T","A","O","I","N","S","R","H","L","D","C","U","M","F","G","P","Y","E","176","B","V","K","X","J","Q","Z","",">","_","\"","!","@","#","$","%","^","&","*","(",")" };
const int NUM_LETTERS =  43 ;


// above are outputs of the generate_layout.py script to generate key layouts
char *map_letter(char* input)
{// (wish I had a dict now)
    for (int i=0;i<NUM_LETTERS;i++){ // iterate over all options 
      if(strcmp(input, inputs[i]) == 0) { // see if there's a match
        
        if (isShifting) return uppercase[i];
        else return lowercase[i]; // return the match
        
      }
    }
    return "none"; // no match
}
