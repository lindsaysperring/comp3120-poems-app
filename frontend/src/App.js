import "./App.css";

import PoemCard from "./components/PoemCard";

let x = { title: "Poem Title", author: "Bob Loblaw", text: "" };
let poems = [
  {
    title: "Poem Title",
    author: "Bob Loblaw",
    text:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at ante vel eros rhoncus placerat. Cras pulvinar lorem eu suscipit condimentum. Maecenas malesuada dui vitae viverra imperdiet. Praesent in libero non magna ullamcorper placerat eget ut elit. Nulla ultricies tempus ultricies. Aliquam consequat elementum commodo. Vivamus et erat eu nunc molestie facilisis. Suspendisse varius commodo libero, non euismod est laoreet in. ",
  },
  {
    title: "Poem Title",
    author: "Bob Loblaw",
    text:
      " Mauris at lorem nulla. Morbi et finibus tellus, at convallis felis. Aenean pellentesque risus in porttitor dictum. Quisque volutpat rutrum erat eu accumsan. Suspendisse placerat ligula rhoncus, feugiat orci condimentum, venenatis nibh. Nullam interdum rutrum lacus, vel mollis tortor porttitor ac. Integer imperdiet in velit et convallis. Mauris congue dolor sit amet iaculis feugiat. Ut quis mi ut lacus tristique condimentum. Nulla varius turpis et sollicitudin interdum. Sed ut augue sit amet ante malesuada viverra ac eu ipsum. ",
  },
  {
    title: "Poem Title",
    author: "Bob Loblaw",
    text:
      " Fusce magna odio, imperdiet a dignissim quis, fermentum at mi. Nulla sem lorem, placerat non fringilla sed, tincidunt nec nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce ut elit in elit consequat ultrices. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget nisl rhoncus, rutrum nisl ac, scelerisque ante. Etiam elementum dignissim ex et vulputate. Pellentesque maximus ex ut odio ornare faucibus. Suspendisse tempor, mauris non euismod hendrerit, magna purus accumsan lorem, eget fermentum ipsum ante vel nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent a sapien id elit elementum varius eget ut lorem. Fusce eget pretium turpis. Duis felis elit, bibendum nec molestie laoreet, consequat quis felis. ",
  },
  {
    title: "Poem Title",
    author: "Bob Loblaw",
    text:
      " Nunc malesuada purus nec tortor dictum viverra. Etiam a dolor odio. Nam orci tellus, faucibus nec libero et, laoreet lacinia sem. Ut varius tincidunt nisi sit amet mattis. Phasellus eget risus diam. Curabitur tellus mauris, dapibus sit amet nisl efficitur, iaculis condimentum sem. Morbi molestie arcu sit amet sapien ornare, vel dictum odio pretium. Sed id imperdiet sapien. Praesent quis sagittis justo, at volutpat mauris. ",
  },
  {
    ...x,
    text:
      " Suspendisse potenti. Nullam venenatis, justo nec semper fringilla, nunc est bibendum mi, id finibus enim orci ut nunc. Nulla gravida lacus et risus faucibus, et pretium nisi ullamcorper. Donec feugiat lorem ut eros tempor tempus. Donec ac purus a nisi fermentum accumsan. Fusce quis enim bibendum, molestie enim ac, hendrerit tortor. Nunc vel arcu neque. Nulla semper vel mi id aliquet. Aenean scelerisque, dolor sit amet aliquet malesuada, massa ante finibus diam, in laoreet lorem justo in ante. Phasellus lacinia lectus eget tempus pellentesque. Etiam congue, massa a varius imperdiet, tellus quam pretium elit, vel facilisis eros nulla id arcu. Aliquam vulputate mi eu massa blandit auctor. Quisque tincidunt ex augue, a sollicitudin lectus euismod blandit. Etiam auctor urna nec est euismod gravida. Aenean sed velit ut risus porta viverra et vitae lectus. ",
  },
];


function App() {
  return (
    <div className="container app">
      <h1>Awesome Poems</h1>
      <div className="poemGridContainer">
        {poems.map((poem) => (
          <PoemCard
            title={poem.title}
            author={poem.author}
            text={poem.text}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
