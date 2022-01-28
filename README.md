# ENGS21-keyboard

This repo contains code used for the ENGS-21 Keyboard for missing fingers. 




## generate_layout.py
Given a number of keys and a number of fingers, generates an input setup that minimizes difficulty of typing. For example:

```bash
python3 generate_layout.py ranked_inputs.txt 5 2
```
This generates the ideal layout for 5 keys, utilizing at most 2 keys at once. 


## week4_prototype
Initial work on an arduino prototype for joystick input. Utilizes the Arduino output of the generate layout script. 