import GuideBlock from './components/GuideBlock';

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Guide to Your Custom Layout</h1>
      <GuideBlock />
      <div style={{ textAlign: "center", marginTop: "2em" }}>
        <textarea name="paragraph_text" cols="100" rows="10"></textarea>
      </div>
    </div>
  );
}

export default App;
