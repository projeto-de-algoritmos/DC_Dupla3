import React, { useRef, useState } from "react";
import './App.css';
import Keyboard from 'react-simple-keyboard'
import "react-simple-keyboard/build/css/index.css";
import mergeSort from "./components/mergeSort";
import medianOfMedians from "./components/medianOfMedians";

function App() {
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
  const [mergeWord, setMergeWord] = useState("");
  const [medianChar, setMedianChar] = useState("");
  const [showMedian, setShowMedian] = useState(false);
  const [showMerge, setShowMerge] = useState(false);
  const [positionMedian, setPositionMedian] = useState(0);
  const keyboard = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    if (showMedian) {
      const arr = input.split('');
      const median = medianOfMedians(arr, positionMedian);

      setMedianChar(median);
    }
  };

  const mergeAction = () => {
    const arr = input.split('')
    const merge = mergeSort(arr).join('');

    setMergeWord(merge);

  }

  const onChange = input => {
    setInput(input);
  };

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const onKeyPress = button => {
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const onChangeInput = event => {
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(input);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p className="header-title">
          TERMO
        </p>
      </header>
      <body>
        <div>
          <div className="action">
            <input id="partitioned" type="text" maxLength="5" value={input} onChange={onChangeInput} />
          </div>
          {
            !showMedian && !showMerge ?
              <div className="action">

                <div className="action">
                  <button className="graph-button mrg-right-10" type="button" onClick={() => { setShowMerge(true); mergeAction() }}>
                    Ordenar Vetor
                  </button>
                  <button className="graph-button mrg-right-10" type="button" onClick={() => setShowMedian(true)}>
                    Encontrar k-ésimo elemento (Sem precisar ordenar)
                  </button>
                </div>

              </div>
              : null
          }
          {
            showMedian ?
              <div>
                <form onSubmit={onSubmit}>
                  <div className="action">
                    <input type="number" className="node-input" onChange={(e) => setPositionMedian(e.target.value)} max="4" min='0' />
                  </div>

                  <div className="action">
                    <button className="graph-button mrg-top-20" type="submit">
                      Buscar
                    </button>
                  </div>
                </form>
              </div>
              : null
          }
          {
            mergeWord != '' ?
              <div><span>{mergeWord}</span></div>
              : null
          }
          {
            medianChar != '' ?
              <div><span>{medianChar}</span></div>
              : null
          }
        </div>
      </body>
      <footer>
        <div className="keyboard">
          <Keyboard
            keyboardRef={r => (keyboard.current = r)}
            layoutName={layout}
            onChange={onChange}
            onKeyPress={onKeyPress}
          />
        </div>
      </footer>
    </div>
  );
}

export default App;