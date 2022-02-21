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

const SPECIAL_KEY_NAMES = {8: '⌫', 13: '↩', 9: '⇥',
                     32: "⎵", 91: '⌘', "17": '⌃', 18: '⌥'}

export default class LearningGame extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      targetIndex: -1,
      characterPool: [],
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
    }),this.weightedRandomSelection)
  }

  updateWeight(adjustValue) {
    let currIndex = this.state.targetIndex;
    let characterPool = [...this.state.characterPool];
    let charItem = {...characterPool[currIndex]};
    charItem.weight = Math.round(Math.max(charItem.weight + adjustValue, 0.1) * 10) / 10;
    characterPool[currIndex] = charItem;
    this.setState({characterPool});
  }
  
  getCharacterBlock(charLine, shiftActive, i) {
      return (
        <CharacterBlock line={charLine} index={i} shiftActive={shiftActive}/>
      )
  }

  getInitialWeight(i) {
    // if (i < 15) {
    //   return 2;
    // }
    // else if (i < 30) {
    //   return 1;
    // }
    // else {
    //   return 0.5;
    // }
    return Math.round(Math.max((50-i)*0.1, 0.5));
  }

  populateCharacterPool() {
    const lines = keyMapping.trim().split("\n");
    for(let i = 0; i < lines.length; i++) {
      const characterNonShift = lines[i].substring(7, 8);
      if (characterNonShift !== "⇥") {
        this.addToCharacterPool(new characterObj(characterNonShift, false, this.getCharacterBlock(lines[i], false, i), this.getInitialWeight(i)));
        const characterShift = lines[i].substring(8,9);
        if (characterShift !== characterNonShift) {
          this.addToCharacterPool(new characterObj(characterShift, true, this.getCharacterBlock(lines[i], true, lines.length + i), this.getInitialWeight(i)));
        }
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


  clearInput() {
    document.getElementById('gameInputBox').style.backgroundColor = "transparent";
    document.getElementById('gameInputBox').value = "";
    document.getElementById('gameInputBox').focus();
  }

  handleKeyPress(e) {
    console.log(e.charCode);
    if (e.key === "Shift" || (e.charCode in SPECIAL_KEY_NAMES && e.charCode !== 91)) return;
    const enteredKey = e.key;
    if (enteredKey === this.state.characterPool[this.state.targetIndex].character) {
      this.updateWeight(-0.1);
      document.getElementById('gameInputBox').style.backgroundColor = "green";
    }
    else {
      this.updateWeight(0.1);
      document.getElementById('gameInputBox').style.backgroundColor = "red";
    }
    setTimeout(this.clearInput, 500);
    this.weightedRandomSelection();
  }

  handleKeyUp(e) {
    console.log(e.keyCode);
    if (!(e.keyCode in SPECIAL_KEY_NAMES)) return;
    const enteredKey = SPECIAL_KEY_NAMES[e.keyCode];
    if (enteredKey === this.state.characterPool[this.state.targetIndex].character) {
      this.updateWeight(-0.1);
      document.getElementById('gameInputBox').style.backgroundColor = "green";
    }
    else {
      this.updateWeight(0.1);
      document.getElementById('gameInputBox').style.backgroundColor = "red";
    }
    setTimeout(this.clearInput, 500);
    this.weightedRandomSelection();
  }

  render() { 
    if(!this.state.characterPool[this.state.targetIndex]){
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
          <input id="gameInputBox" type="text" onKeyUp={(e) => this.handleKeyUp(e)} onKeyPress={(e) => this.handleKeyPress(e)}/>
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


