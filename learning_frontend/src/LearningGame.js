import React from "react";
import {Link } from "react-router-dom";
import { keyMapping } from './constants/layout';
import CharacterBlock from './components/CharacterBlock';

function characterObj(character_1, shift_1, characterBlock_1, weight_1) {
  this.character = character_1;
  this.shift = shift_1;
  this.characterBlock = characterBlock_1;
  this.weight = weight_1;
}

export default class LearningGame extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      targetChar: "",
      characterPool: [],
      firstBoot: true,
    };
  }

  componentDidMount() {
    if (this.state.firstBoot) {
      this.populateCharacterPool()
      this.setState({ firstBoot: false })
    }
    const index = this.weightedRandomSelection(this.state.characterPool);
    this.updateTarget(this.state.characterPool[index].character);
  }

  updateTarget(targetChar_1) {
    this.setState({targetChar: targetChar_1})
  }

  addToCharacterPool(newCharacter) {
    this.setState(prevState => ({
      characterPool: [...prevState.characterPool, newCharacter]
    }))
  }

  getCharacterBlock(charLine, shiftActive) {
      return (
        <CharacterBlock line={charLine} shiftActive={shiftActive}/>
      )
  }

  getInitialWeight(character) {
    return 0.5;
  }

  populateCharacterPool() {
    const lines = keyMapping.trim().split("\n");
    for(let i = 0; i < lines.length; i++) {
      const characterNonShift = lines[i].substring(7, 8);
      this.addToCharacterPool(new characterObj(characterNonShift, false, this.getCharacterBlock(lines[i], false), this.getInitialWeight(characterNonShift)));
      const characterShift = lines[i].substring(8,9);
      if (characterShift !== characterNonShift) {
        this.addToCharacterPool(new characterObj(characterShift, true, this.getCharacterBlock(lines[i], true), this.getInitialWeight(characterShift)));
      } 
    }
  }

  weightedRandomSelection(characterPool) {
    let i;
    let weights = [];

    for (i = 0; i < characterPool.length; i++) {
      weights[i] = characterPool[i].weight + (weights[i - 1] || 0);
    }

    const randomVal = Math.random() * weights[weights.length - 1];
    
    for (i = 0; i < weights.length; i++) {
      if (weights[i] > randomVal) break;
    }     

    return characterPool[i];
}

  render() { 
    return (
      <div className="LearningGame">
        <div>
          <p>Hello</p>
        {/* {this.state.characterPool[index].characterBlock} */}
        </div>
        <Link to="/">
          <button className="button-9">
            Go to Layout Guide!
          </button>
        </Link>
      </div>
    );
  }
}


