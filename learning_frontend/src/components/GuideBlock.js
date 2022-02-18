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
  
  getCharacterBlock = (charLine) => {
    //xs refers to how many grid locations an item takes up. 12 are allocated per row.
        return (
            <Grid item xs={this.state.xsValue}>
                <CharacterBlock line={charLine} shiftActive={this.props.shiftActive}/>
            </Grid>
        )
    }

  render() {
    //create array with each element being a line from layout.js
    let lines = keyMapping.trim().split("\n");

    //grab HTML for the characterBlocks
    let characterBlocks = []
    for(let i = 0; i < lines.length; i++) {
        characterBlocks.push(this.getCharacterBlock(lines[i]));
    }

    //Put all the character blocks in a grid. spacing indicates space between grid elements
    return (
        <Grid container spacing={3}>
          {characterBlocks}
        </Grid>
    )
  }
}