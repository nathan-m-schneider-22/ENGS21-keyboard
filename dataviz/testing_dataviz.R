library(tidyverse)


data = read.csv(file.choose())

data %>%
  mutate(time = min + sec/60, speed = characters/time/4.7) %>%
  filter(test_id == 2 | test_id == 6) %>%
  ggplot(aes(x=test_id,y=speed,color=tester)) +
  geom_point() +
  geom_line() +
  theme_minimal() +
  ylim(2.5,5)+
  labs(x="",y="Words per minute",color="Tester",
       title = "WPM on Prototype before and after basic training") + 
  theme(axis.text.x = element_blank())


data %>%
  mutate(accuracy = )
