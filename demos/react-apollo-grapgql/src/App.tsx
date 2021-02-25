import React from 'react';
import JiraEditor from "react-jira-editor";
import './App.css';

function App() {

  function onJIRAEditor_Change(editorContents: any) {
    console.log(editorContents.text);
    console.log(editorContents.html);
    console.log(editorContents.markup);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
      <div>
        <JiraEditor onChange={onJIRAEditor_Change} />
      </div>
    </div>
  );
}

export default App;
