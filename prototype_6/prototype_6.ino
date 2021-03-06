// Nathan Schneider
// Prototype 6
int fsrAnalogPin = 6; 
int LEDpin = 11; 
int sticky_pin = 12;


// Constants for inputs
const int NUM_KEYS = 5;
const int D = 512;
//const int MINVAL = 250;
//const int MAXVAL = 770;
//const int THRESHOLD =90;
const int HIGH_THRESHOLD = D + 400;
const int LOW_THRESHOLD = D - 400;
const int COOLDOWN = 100;
const int TEST_KEY = 0;


int shifting_threshold = 875;
bool isShifting = false;


// Initialize joystick readings to the middle range
int xvals[NUM_KEYS] = {D, D, D, D, D};
int yvals[NUM_KEYS] = {D, D, D, D, D};

// Stick directions, expressed by 5 characters (U,D,L,R)
char directions[NUM_KEYS] = "-----";

// keyboard not working on Arduino Uno
#include <Keyboard.h> 

void setup()
{
  Serial.begin(9600);
  pinMode(LEDpin, OUTPUT);
  pinMode(sticky_pin, OUTPUT);

  pinMode(A0, INPUT);
  pinMode(A1, INPUT);
  pinMode(A2, INPUT);
  pinMode(A3, INPUT);

// keyboard not working on Arduino Uno
  Keyboard.begin();

}

void loop()
{
  read_keys(); // read the joystick inputs
  get_directions(); //convert input voltages into directions
  char* letter = map_letter(directions); // map directions to a letter through the generated layout
  bool sticky;
//  Serial.println(directions);

  int prev_dash = count_dash(directions);
  int new_dash = prev_dash;
  while(strcmp(directions, "-----") != 0) {
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

void get_directions()
{
  if (digitalRead(A0) == 1)
    directions[0] = 'L';
  else if (digitalRead(A1) == 1)
    directions[0] = 'U';
  else if(digitalRead(A2) == 1)
    directions[0] = 'R';
  else if(digitalRead(A3) == 1)
    directions[0] = 'D';
  else
    directions[0] = '-';
    
  for (int i = 1; i < NUM_KEYS; i++)
  { // Map the inputs from -100 to 100
//    int mapped_x = map(xvals[i], MINVAL, MAXVAL, 100, -100);
//    int mapped_y = map(yvals[i], MINVAL, MAXVAL, 100, -100);
//    
//    if (mapped_x < -THRESHOLD) // if surpasses a threshold, assign a direction
//      directions[i] = 'L';
//    else if (mapped_x > THRESHOLD)
//      directions[i] = 'R';
//    else if (mapped_y > THRESHOLD)
//      directions[i] = 'U';
//    else if (mapped_y < -THRESHOLD)
//      directions[i] = 'D';
//    else
//      directions[i] = '-';
//  }
    if (xvals[i] > HIGH_THRESHOLD && abs(xvals[i] - D) >= abs(yvals[i] - D)){ // if surpasses a threshold, assign a direction
            directions[i] = 'L';
          }
          else if (xvals[i] < LOW_THRESHOLD && abs(xvals[i] - D) >= abs(yvals[i] - D)){
            directions[i] = 'R';
          }
          else if (yvals[i] > HIGH_THRESHOLD && abs(xvals[i] - D) < abs(yvals[i] - D)){
            directions[i] = 'D';
          }
          else if (yvals[i] < LOW_THRESHOLD && abs(xvals[i] - D) < abs(yvals[i] - D)){
            directions[i] = 'U';
          }
          else
            directions[i] = '-';
  directions[NUM_KEYS] = '\0';
  }
}

void read_keys() // reads joysticks, currently only reads TEST_KEY
{

  check_shifting();

  xvals[1] = analogRead(A4);
  yvals[1] = analogRead(A5);
  
  xvals[2] = analogRead(A8);
  yvals[2] = analogRead(A9);

//  xvals[3] = analogRead(A6);
//  yvals[3] = analogRead(A7);
//
//  xvals[4] = analogRead(A8);
//  yvals[4] = analogRead(A9);

  xvals[3] = D;
  yvals[3] = D;

  xvals[4] = D;
  yvals[4] = D;

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
