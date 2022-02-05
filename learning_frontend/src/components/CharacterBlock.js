import PropTypes from 'prop-types';
import { keyLayout } from '../constants/layout'

//line is one line from layout.js of the form "-UU--: E"
const CharacterBlock = ({ line }) => {
    if (line.length < 5) return;

    //grab the HTML for the arrows
    let arrows = [];
    for (let i = 0; i < 5; i++){
        //only push if it's an actual key
        if (keyLayout.charAt(i) === "1") {
            arrows.push(getArrowImg(line.charAt(i)))
        }
    }
    
    return (
        <div className="characterBlock" key={line}>
            <h1 className="centerText">{line.substring(line.indexOf(": ") + 2)}</h1>
            <div className="centerText">
                {arrows}
            </div>
        </div>
    )
}

CharacterBlock.propTypes = {
    line: PropTypes.string.isRequired,
}

const getArrowImg = (direction) => {
    let img_path = "";
    //could be done with the name of the file, but I typically don't like that approach
    switch (direction) {
        case 'U':
            img_path="/u_direction.png";
            break;
        case 'D':
            img_path="/d_direction.png";
            break;
        case "L":
            img_path="/l_direction.png";
            break;
        case "R":
            img_path="/r_direction.png";
            break;
        default:
            img_path="/no_direction.png";
    }
    return (
        <div className="inline-block">
            <img src={img_path} alt={direction + " arrow"}></img>
        </div>
    )
}

export default CharacterBlock