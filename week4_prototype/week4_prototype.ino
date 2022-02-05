// Nathan Schneider
// Week 4 Prototype

// Constants for inputs
const int NUM_KEYS = 5;
const int D = 512;
const int MINVAL = 250;
const int MAXVAL = 770;
const int THRESHOLD = 80;
const int COOLDOWN = 100;
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


  read_keys(); // read the joystick inputs
  get_directions(); //convert input voltages into directions
  char* letter = map_letter(directions); // map directions to a letter through the generated layout
//  Serial.println(directions);

  int prev_dash = count_dash(directions);
  int new_dash = prev_dash;
  while(strcmp(directions, "-----") != 0) {
    read_keys(); // read the joystick inputs
    get_directions(); //convert input voltages into directions
//    Serial.println(directions);

    new_dash = count_dash(directions);

    if (new_dash <= prev_dash){
      prev_dash = new_dash;
      letter = map_letter(directions);

    }
    delay(10);
  }
    Serial.println(letter);

  if (strcmp(letter, "none") != 0){
    Serial.println(letter);
    String str_letter = String(letter);
    
    if (str_letter.length() > 1){
      int key_as_num = str_letter.toInt();
      Serial.println(key_as_num);
      Keyboard.write(key_as_num);
    }
    else{
      Keyboard.print(letter);
    }
    
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
  directions[NUM_KEYS] = '\0';
}

void read_keys() // reads joysticks, currently only reads TEST_KEY
{

  xvals[1] = analogRead(A0);
  yvals[1] = analogRead(A1);
//
  xvals[2] = analogRead(A2);
  yvals[2] = analogRead(A3);

  xvals[3] = analogRead(A4);
  yvals[3] = analogRead(A5);


//
  
}
