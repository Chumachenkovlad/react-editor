import React from "react";
import "./App.css";
import { ConnectedEditor } from 'shared/Editor';
import { getContent, updateContent } from 'shared/api/content';

const App: React.FC = () => {
  const htmlContent = getContent();
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-maintitle">Text Editor</h1>
        <h2 className="App-subtitle">React test task</h2>
      </header>
      <section className="App-content">
        <ConnectedEditor htmlContent={htmlContent} updateContent={updateContent} />
      </section>
    </div>
  );
};

export default App;
