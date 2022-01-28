char *inputs[] = { "U----","D----","L----","R----","-U---","-D---","-L---","-R---","--U--","--D--","--L--","--R--","---U-","---D-","---L-","---R-","----U","----D","----L","----R","UU---","U-U--","U--U-","U---U","DD---","D-D--" };
char *letters[] = { "E","A","R","I","O","T","N","S","L","C","U","D","P","M","H","G","B","F","Y","W","K","V","X","Z","J","Q" };
const int NUM_LETTERS =  26 ;

char *map_letter(char* input)
{
    for (int i=0;i<NUM_LETTERS;i++){
      //Serial.println(input);
      //Serial.println(inputs[i]);

      if(strcmp(input, inputs[i]) == 0) {
        return letters[i];
      }
    }
    return "?";
}
