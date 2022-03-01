// Nathan Schneider
// Week 4 Prototype
int fsrAnalogPin = 6; 
int LEDpin = 11; 
int sticky_pin = 12;


// Constants for inputs
const int NUM_KEYS = 1;
const int COOLDOWN = 100;
const int TEST_KEY = 0;


int shifting_threshold = 875;
bool isShifting = false;


// Initialize joystick readings to the middle range
int keysExpressed[NUM_KEYS] = {0,0,0};

// Stick directions, expressed by 3 characters (U,D,L,R)
char directions[NUM_KEYS] = "-";

// keyboard not working on Arduino Uno
#include <Keyboard.h> 

void setup()
{
  Serial.begin(9600);
  pinMode(LEDpin, OUTPUT);
  pinMode(2, INPUT);
  pinMode(3, INPUT);
  pinMode(4, INPUT);
  pinMode(5, INPUT);
  pinMode(6, INPUT);
  pinMode(7, INPUT);
  pinMode(8, INPUT);
  pinMode(9, INPUT);
  pinMode(10, INPUT);
  pinMode(11, INPUT);
  pinMode(12, INPUT);
  pinMode(13, INPUT);

// keyboard not working on Arduino Uno
  Keyboard.begin();

}

void loop()
{


  read_keys(); // read the joystick inputs
  char* letter = map_letter(directions); // map directions to a letter through the generated layout
  bool sticky;
//  Serial.println(directions);

  int prev_dash = count_dash(directions);
  int new_dash = prev_dash;
  while(strcmp(directions, "---") != 0) {
    read_keys(); // read the joystick inputs
    get_directions(); //convert input voltages into directions
    Serial.println(directions);

    new_dash = count_dash(directions);
  
    if (new_dash <= prev_dash){
      prev_dash = new_dash;
      letter = map_letter(directions);
      sticky = is_sticky(directions);

    }
    delay(50);
  }
  

  
  if (strcmp(letter, "none") != 0){
    send_letter(letter);
    Serial.println(sticky);
    if (sticky) analogWrite(sticky_pin, 255);
    else {
      Keyboard.releaseAll();
      analogWrite(sticky_pin, 0);
    }

  }




}

void send_letter(char * letter) {
  Serial.println(letter);
    String str_letter = String(letter);
    
    if (str_letter.length() > 1){
      int key_as_num = str_letter.toInt();
      Keyboard.press(key_as_num);
    }
    else{
      Keyboard.print(letter);
    }
  delay(50); // if a real letter is typed, cool down before the next reading
}


int count_dash(char* input){
  int sum = 0;
  for (int i = 0; i < NUM_KEYS; i++) {
    if (input[i] == '-') sum++;
  }
  return sum;
}

void read_keys() // reads joysticks, currently only reads TEST_KEY
{
  
  check_shifting();
  for (int i = 0; i < NUM_KEYS; i++)
  {
    if (digitalRead(2+i*4) == 1)
      directions[i] = 'U';
    else if (digitalRead(3+i*4) == 1)
      directions[i] = 'D';
    else if(digitalRead(4+i*4) == 1)
      directions[i] = 'L';
    else if(digitalRead(5+i*4) == 1)
      directions[i] = 'R';
    else
      directions[i] = '-'
  }
  directions[NUM_KEYS] = '\0';

//
}
void check_shifting() {

  int force_val = analogRead(A10);

  if (force_val > shifting_threshold) {
    isShifting = true;
    Keyboard.press(KEY_LEFT_SHIFT);
    
  }
  else if (strcmp(directions, "-----") == 0) isShifting = false;
  
  if (isShifting) analogWrite(LEDpin, 255);
  else{
    analogWrite(LEDpin, 0);
    Keyboard.release(KEY_LEFT_SHIFT);
  }
}
