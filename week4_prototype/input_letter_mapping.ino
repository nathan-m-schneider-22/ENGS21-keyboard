char *inputs[] = { "U----","D----","L----","R----","-U---","-D---","-L---","-R---","----U","----D","----L","----R","U---U","D---D","L---L","R---R","-U--U","-D--D","-L--L","-R--R","U---D","U---L","U---R","D---U","D---L","D---R","L---U","L---D","L---R","R---U","R---D","R---L","-U--D","-U--L","-U--R","-D--U","-D--L","-D--R","-L--U","-L--D","-L--R","-R--U","-R--D","-R--L" };
char *lowercase[] = { "e","t","178"," ","a","o","i","n","s","r","h","l","d","c","u","m","f","g","p","y","w","176","b","v","k","x","j","q","z",".",",","/","-","=","'",";","179","1","2","3","4","5","6","7" };
int sticky[] = { 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 };
const int NUM_LETTERS =  44 ;

// above are outputs of the generate_layout.py script to generate key layouts
char *map_letter(char *input)
{ // (wish I had a dict now)
  for (int i = 0; i < NUM_LETTERS; i++)
  { // iterate over all options
    if (strcmp(input, inputs[i]) == 0)
    { // see if there's a match

      return lowercase[i]; // return the match
    }
  }
  return "none"; // no match
}

bool is_sticky(char *input)
{
  for (int i = 0; i < NUM_LETTERS; i++)
  {
    if (strcmp(input, inputs[i]) == 0)
    {
      return sticky[i] == 1;
    }
  }
  return false; // no match
}
