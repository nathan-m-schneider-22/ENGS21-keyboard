import React from "react";
import GuideBlock from './components/GuideBlock';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shiftActive: false,
      tempKey: null,
    };
  }
  
  render() {
    return (
      <div className="App">
        <h1 style={{ textAlign: "center" }}>Guide to Your Custom Layout</h1>
        <GuideBlock />
        <div style={{ textAlign: "center", marginTop: "2em" }}>
          <textarea style={{ fontSize: '36px' }} name="paragraph_text" cols="50" rows="10" onKeyDown={(e) => this.handleKeyDown(e)} onKeyUp={(e) => this.handleKeyUp(e)}></textarea>
          <p>{this.state.tempKey || "none"}</p>
        </div>
      </div>
    );
  }
  handleKeyDown(e) {
    if(!this.state.shiftActive && (this.e.key === "Shift" || this.e.keyCode === 16)) {
      this.setState({ shiftActive: true });
    }
    this.setState({ tempKey: e.key });
    console.log(e);
  };

  handleKeyUp(e) {
    if(this.state.shiftActive && (this.e.key === "Shift" || this.e.keyCode === 16)) {
      this.setState({ shiftActive: false });
    }
  };

}


//const handleKeyDown = ()