import "./App.css";

import PoemCard from "./components/PoemCard";

let poemCards = []
for (let i = 0; i < 10; i++) {
  poemCards.push(<PoemCard/>)
}
function App() {
  return (
    <div className="container app">
      <h1>Awesome Poems</h1>
      <div className="poemGridContainer">
        {poemCards}
      </div>
    </div>
  );
}

export default App;
