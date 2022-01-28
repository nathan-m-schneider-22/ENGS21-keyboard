// Nathan Schneider
// Week 4 Prototype

const int NUM_KEYS = 5;
const int D = 512;
const int MINVAL = 250;
const int MAXVAL = 770;
const int THRESHOLD = 80;
const int COOLDOWN = 200;
const int TEST_KEY = 0;

int xvals[NUM_KEYS] = {D, D, D, D, D};
int yvals[NUM_KEYS] = {D, D, D, D, D};

char directions[NUM_KEYS] = "-----";

#include <Keyboard.h>

void setup()
{
  Serial.begin(9600);
//  Keyboard.begin();

}

void loop()
{
  read_keys();
  get_directions();
  //Serial.println(directions);
  char* letter = map_letter(directions);
  if (strcmp(letter, "?") != 0){
    Serial.println(letter);
    delay(COOLDOWN);
  }

}
void get_directions()
{
  for (int i = 0; i < NUM_KEYS; i++)
  {
    int mapped_x = map(xvals[i], MINVAL, MAXVAL, 100, -100);
    int mapped_y = map(yvals[i], MINVAL, MAXVAL, -100, 100);
    //    Serial.println(xvals[i]);
    //    Serial.println(yvals[i]);
    //    Serial.println(mapped_x);
    //    Serial.println(mapped_y);
    //    Serial.println(" ");
    if (mapped_x < -THRESHOLD)
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

void read_keys()
{
  int sensorValue = analogRead(A0);
  int sensorValue2 = analogRead(A1);
  yvals[TEST_KEY] = sensorValue;
  xvals[TEST_KEY] = sensorValue2;
}
