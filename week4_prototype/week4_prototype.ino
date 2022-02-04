// Nathan Schneider
// Week 4 Prototype

// Constants for inputs
const int NUM_KEYS = 5;
const int D = 512;
const int MINVAL = 250;
const int MAXVAL = 770;
const int THRESHOLD = 80;
const int COOLDOWN = 50;
const int TEST_KEY = 0;


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

// keyboard not working on Arduino Uno
  Keyboard.begin();

}

void loop()
{


//  Serial.println(directions);
  read_keys(); // read the joystick inputs
  get_directions(); //convert input voltages into directions
  char* letter = map_letter(directions); // map directions to a letter through the generated layout

  while(strcmp(directions, "-----") != 0) {
    read_keys(); // read the joystick inputs
    get_directions(); //convert input voltages into directions
    
//    letter = map_letter(directions);
  }

  
  if (strcmp(letter, "") != 0){
    Serial.println(letter);
    //Keyboard.print(letter);
  }
  delay(COOLDOWN); // if a real letter is typed, cool down before the next reading
  
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
  for (int i = 0; i < NUM_KEYS; i++)
  { // Map the inputs from -100 to 100
    int mapped_x = map(xvals[i], MINVAL, MAXVAL, 100, -100);
    int mapped_y = map(yvals[i], MINVAL, MAXVAL, 100, -100);
    
    if (mapped_x < -THRESHOLD) // if surpasses a threshold, assign a direction
      directions[i] = 'L';
    else if (mapped_x > THRESHOLD)
      directions[i] = 'R';
    else if (mapped_y > THRESHOLD)
      directions[i] = 'U';
    else if (mapped_y < -THRESHOLD)
      directions[i] = 'D';
    else
      directions[i] = '-';
  }
}

void read_keys() // reads joysticks, currently only reads TEST_KEY
{

  xvals[1] = analogRead(A0);
  yvals[1] = analogRead(A1);
//
  xvals[2] = analogRead(A2);
  yvals[2] = analogRead(A3);


//
  
}
