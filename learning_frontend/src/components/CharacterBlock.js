import { keyLayout } from '../constants/layout';
import React from "react";

export default class CharacterBlock extends React.Component {

    getArrowImg = (direction) => {
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

    getDisplayCharacter() {
        let displayCharacter = this.props.line.substring(7, 8);
        if (this.props.shiftActive){
            displayCharacter = this.props.line.substring(8,9);
        }
        return displayCharacter;
    }
  
    render() {
        if (this.props.line.length < 5) return null;

        //grab the HTML for the arrows
        let arrows = [];
        for (let i = 0; i < 5; i++){
            //only push if it's an actual key
            if (keyLayout.charAt(i) === "1") {
                arrows.push(this.getArrowImg(this.props.line.charAt(i)))
            }
        }
        const targeted = this.getDisplayCharacter() === this.props.targetLetter
        //Put all the character blocks in a grid. spacing indicates space between grid elements
        if (this.props.targetLetter === ""){
            return (
                <div className="characterBlock" key={this.props.index}>
                <h1 className="centerText">{this.getDisplayCharacter()}</h1>
                <div className="centerText">
                    {arrows}
                </div>
            </div>
            )
        }
        if (targeted){
            return (
            <div className="characterBlock" key={this.props.index} style={{ background: '#FFD700aa'}}>
                <h1 className="centerText">{this.getDisplayCharacter()}</h1>
                <div className="centerText">
                    {arrows}
                </div>
            </div>)
        }
        return (
            <div className="characterBlock" key={this.props.index} style={{ background: 'grey'}}>
                <h1 className="centerText">{this.getDisplayCharacter()}</h1>
                <div className="centerText">
                    {arrows}
                </div>
            </div>
        )
    }
  }