import CharacterBlock from './CharacterBlock';
import { keyMapping } from '../constants/layout';
import { keyLayout } from '../constants/layout';
import Grid from '@material-ui/core/Grid';
import React from "react";

export default class GuideBlock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        xsValue: keyLayout.length > 3 ? 1 : 2,
    };
  }
  

  getCharacterBlock = (charLine, i) => {
    //xs refers to how many grid locations an item takes up. 12 are allocated per row.
      return (
          <Grid item xs={this.state.xsValue}>
              <CharacterBlock line={charLine} index={i} shiftActive={this.props.shiftActive}/>
          </Grid>
      )
  }

  
  findBlock = (letter,lines) => {
    if (!lines) return null
    for(let i = 0; i < lines.length; i++) {
      let line_letter = lines[i].substring(7, 8);
      if (letter === line_letter) return this.getCharacterBlock(lines[i]);
    } 
    return (
      <div className='filler'>

      </div>
    )
  }

  render() {
    //create array with each element being a line from layout.js
    const lines = keyMapping.trim().split("\n");

    
    //grab HTML for the characterBlocks
    let characterBlocks = []
    for(let i = 0; i < lines.length; i++) {
        characterBlocks.push(this.getCharacterBlock(lines[i]), i);
    }
    let rows = []
    rows.push([null,null,"1","2","3","4","5","6","7","8","9","0","-","=","⌫",null].map(letter => this.findBlock(letter,lines)))
    rows.push(["⇥","q","w","e","r","t","y","u","i","o","p",'[',']',null,null].map(letter => this.findBlock(letter,lines)))
    rows.push([null,null,null,"a","s","d","f","g","h","j","k","l",";","'","↩",null].map(letter => this.findBlock(letter,lines)))
    rows.push([null,null,null,null,"z","x","c","v","b","n","m",",",".","/",null,null,null,null].map(letter => this.findBlock(letter,lines)))
    rows.push([null,"⌃","⌥","⌘",null,null,null,null,null,"⎵",null,null,null,null,"⌘","⌥"].map(letter => this.findBlock(letter,lines)))


    //Put all the character blocks in a grid. spacing indicates space between grid elements
    return (
      <div>
        <div className='row'>
            {rows[0]}
          </div>
          <div className='row'>
            {rows[1]}
          </div>
          <div className='row'>
            {rows[2]}
          </div>
          <div className='row'>
            {rows[3]}
          </div>
          <div className='row'>
            {rows[4]}
          </div>
      </div>

    )
  }
}