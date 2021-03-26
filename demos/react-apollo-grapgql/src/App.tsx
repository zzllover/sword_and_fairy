import React, { useState } from 'react';
// import JiraEditor from "react-jira-editor";
import './App.css';
import { Canvas4, Canvas6, Canvas7 } from './canvas-components/Canvas1';
import { MyUseEffectComponent } from './components/LearnHooks';

function App() {

  // function onJIRAEditor_Change(editorContents: any) {
  //   console.log(editorContents.text);
  //   console.log(editorContents.html);
  //   console.log(editorContents.markup);
  // }

  const [num, setNum] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
      <div>
        {/* <JiraEditor onChange={onJIRAEditor_Change} /> */}
      </div>
      <MyUseEffectComponent num={num} />
      <button onClick={() => setNum(num + 1)}>click</button>
      <div>
        <Canvas4 width={'300px'} height={'300px'} />
      </div>
      <div>
        <Canvas6 width={'300px'} height={'300px'} />
      </div>

      <div>
        <Canvas7
          width={'300px'}
          height={'300px'}
          draw={(ctx: CanvasRenderingContext2D, frameCount: number) => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
            ctx.fillStyle = '#000000'
            ctx.beginPath()
            ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI)
            ctx.fill()
          }}
        />
      </div>
    </div>
  );
}

export default App;
