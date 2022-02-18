import React from "react";
import GuideBlock from './components/GuideBlock';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shiftActive: false,
    };
    this.onShiftActiveChange = this.onShiftActiveChange.bind(this);
  }

  onShiftActiveChange(isActive){
    this.setState({ shiftActive: isActive });
  }
  
  render() {
    return (
      <div className="App">
        <h1 style={{ textAlign: "center" }}>Guide to Your Custom Layout</h1>
        <GuideBlock shiftActive={this.state.shiftActive}/>
        <div style={{ textAlign: "center", marginTop: "2em" }}>
          <textarea style={{ fontSize: '36px' }} name="paragraph_text" cols="50" rows="10" onKeyDown={(e) => this.handleKeyDown(e)} onKeyUp={(e) => this.handleKeyUp(e)}></textarea>
        </div>
        <p>{this.state.shiftActive + ""}</p>
      </div>
    );
  }

  handleKeyDown(e) {
    if(!this.state.shiftActive && (e.key === "Shift" || e.keyCode === 16)) {
      this.onShiftActiveChange(true);
    }
  };

  handleKeyUp(e) {
    if(this.state.shiftActive && (e.key === "Shift" || e.keyCode === 16)) {
      this.onShiftActiveChange(false);
    }
  };

}