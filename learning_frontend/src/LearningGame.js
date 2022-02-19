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
      targetIndex: 0,
      characterPool: [],
      typedCharacter: "",
    };
  }

  componentDidMount() {
    this.populateCharacterPool()
  }

  updateTargetIndex(targetIndex_1) {
    this.setState({targetIndex: targetIndex_1})
  }

  addToCharacterPool(newCharacter) {
    this.setState(prevState => ({
      characterPool: [...prevState.characterPool, newCharacter]
    }))
  }

  updateWeight(adjustValue) {
    //adjust weight by value (set min)
  }

  getCharacterBlock(charLine, shiftActive, i) {
      return (
        <CharacterBlock line={charLine} index={i} shiftActive={shiftActive}/>
      )
  }

  getInitialWeight(character) {
    return 0.5;
  }

  populateCharacterPool() {
    const lines = keyMapping.trim().split("\n");
    for(let i = 0; i < lines.length; i++) {
      const characterNonShift = lines[i].substring(7, 8);
      this.addToCharacterPool(new characterObj(characterNonShift, false, this.getCharacterBlock(lines[i], false, i), this.getInitialWeight(characterNonShift)));
      const characterShift = lines[i].substring(8,9);
      if (characterShift !== characterNonShift) {
        this.addToCharacterPool(new characterObj(characterShift, true, this.getCharacterBlock(lines[i], true, lines.length + i), this.getInitialWeight(characterShift)));
      } 
    }
  }

  weightedRandomSelection() {
    let i;
    let weights = [];

    for (i = 0; i < this.state.characterPool.length; i++) {
      weights[i] = this.state.characterPool[i].weight + (weights[i - 1] || 0);
    }

    const randomVal = Math.random() * weights[weights.length - 1];
    
    for (i = 0; i < weights.length; i++) {
      if (weights[i] > randomVal) break;
    }     

    this.updateTargetIndex(i);
  }

  handleKeyDown(e) {
    if (e.key === this.state.characterPool[this.state.targetIndex]) {
      this.updateWeight(-0.1);
    }
    else {
      this.updateWeight(0.1);
    }
    this.weightedRandomSelection();
  }

  render() { 
    if(!this.state.characterPool[0]){
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      )
    }
    return (
      <div className="LearningGame">
        <div style={{ textAlign: "center" }}>
          <h1>Welcome to the Learning Game!</h1>
          {this.state.characterPool[this.state.targetIndex].characterBlock}
          {this.state.characterPool[this.state.targetIndex].shift ? 'Shift' : 'No shift'}
        </div>
        <p>Current Weighting: {this.state.characterPool[this.state.targetIndex].weight}</p>
        <div style={{ textAlign: "center" }}>
          <input type="text" onKeyDown={(e) => this.handleKeyDown(e)}/>
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


