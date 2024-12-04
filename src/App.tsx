import "./App.css";
import mindful from "./assets/mindful.jpg";

function App() {
  return (
    <>
      <div>
        <img
          width={400}
          src={mindful}
          alt="Person sitting on beach in meditation pose"
        />
        {/* Photo by <a href="https://unsplash.com/@chelseacgates?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Chelsea Gates</a> on <a href="https://unsplash.com/photos/person-in-blue-shorts-sitting-on-beach-shore-during-daytime-n8L1VYaypcw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a> */}
      </div>
      <h1>Mindful</h1>
    </>
  );
}

export default App;
