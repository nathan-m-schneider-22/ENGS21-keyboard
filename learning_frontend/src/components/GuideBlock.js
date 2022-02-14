import CharacterBlock from './CharacterBlock'
import { keyMapping } from '../constants/layout'
import { keyLayout } from '../constants/layout'
import Grid from '@material-ui/core/Grid';

//if there are more than 3 arrows needed, have to enlarge boxes
const xsValue = keyLayout.length > 3 ? 1 : 2;

const GuideBlock = () => {
    //create array with each element being a line from layout.js
    let lines = keyMapping.trim().split("\n");
    //sort alphabetically by the character
    // lines.sort(function compareChars(a, b) {
    //     if (a.substring(a.indexOf(": ") + 2) < b.substring(b.indexOf(": ") + 2)) return -1;
    //     if (a.substring(a.indexOf(": ") + 2) > b.substring(b.indexOf(": ") + 2)) return 1;
    //     return 0;
    // });

    //grab HTML for the characterBlocks
    let characterBlocks = []
    for(let i = 0; i < lines.length; i++) {
        characterBlocks.push(getCharacterBlock(lines[i]));
    }

    //Put all the character blocks in a grid. spacing indicates space between grid elements
    return (
        <Grid container spacing={3}>
            {characterBlocks}
        </Grid>
    )
}

const getCharacterBlock = (charLine) => {
    //xs refers to how many grid locations an item takes up. 12 are allocated per row.
    return (
        <Grid item xs={xsValue}>
            <CharacterBlock line={charLine} />
        </Grid>
    )
}

export default GuideBlock