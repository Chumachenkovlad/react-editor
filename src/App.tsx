import React from "react";
import "./App.css";
import { ConnectedEditor } from 'shared/Editor';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-maintitle">Text Editor</h1>
        <h2 className="App-subtitle">React test task</h2>
      </header>
      <section className="App-content">
        <ConnectedEditor />
      </section>
    </div>
  );
};

export default App;
