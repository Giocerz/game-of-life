import { useEffect, useState } from 'react'
import './App.css'
import { randomBoard } from './logic/randomBoard';
import GameGrid from './Components/GameGrid/GameGrid';
import { compareBoard, countPopulation } from './logic/compareBoard';
import { MdRefresh, MdPause, MdPlayArrow, MdSettings } from "react-icons/md";
import { rleReader, rleToArray } from './logic/rleToArray';
import { centerPattern } from './logic/centerPattern';

const ConfigurationView = ({ children, className }) => {
  return(
    <div className={className}>
      {children}
    </div>
  )
}

function App() {
  const [board, setBoard] = useState(randomBoard());
  const [isPause, setIsPause] = useState(true);
  const [generations, setGenerations] = useState(0);
  const [population, setPopulation] = useState(0);
  const [gameDelayId, setGameDelayId] = useState();
  const [gameDelay, setGameDelay] = useState(500);
  const [configDisplay, setConfigDisplay] = useState(true);
  const [inputPattern, setInpurPattern] = useState('');
  const [animConfig, setAnimConfig] = useState('');

  useEffect(() => {
    if (isPause) return;
    const timeOutId = setTimeout(() => {
      const newBoard = compareBoard(board);
      const newPopulation = countPopulation(newBoard);
      setPopulation(newPopulation);
      setBoard(newBoard);
      setGenerations(generations + 1)
      clearTimeout(timeOutId);
    }, gameDelay);
    setGameDelayId(timeOutId);
  }, [generations, isPause])

  const resetGame = () => {
    clearTimeout(gameDelayId);
    setBoard(randomBoard());
    setPopulation(0);
    setGenerations(0);
    setIsPause(true);
  }

  const applyConfiguration = () => {
    clearTimeout(gameDelayId);
    setBoard(randomBoard());
    setPopulation(0);
    setGenerations(0);
    setIsPause(true);
    setAnimConfig('out');
  };

  const openConfigurationView = () => {
    setConfigDisplay(true);
    setIsPause(true);
    setAnimConfig('');
  };

  const handleChangeTextArea = (event) => {
    setInpurPattern(event.target.value);
  };

  const handlePattern = () => {
    if(inputPattern === '') {
      alert('Paste your pattern');
      return
    }
    const arrPattern = rleReader(inputPattern);
    const patternBoard = rleToArray(arrPattern);
    const centerBoard = centerPattern(patternBoard);
    clearTimeout(gameDelayId);
    setBoard(centerBoard);
    setPopulation(0);
    setGenerations(0);
    setIsPause(true);
    setAnimConfig('out');
  };



  return (
    <>
      <header className='header'>
        <div className='header-top-decorate'></div>
        <h1>Game of life</h1>
      </header>
      <main className='game-main'>
        {configDisplay &&
          <ConfigurationView key={`config-1${animConfig}`} className={`configurations ${animConfig}`} >
            <h2>Configurations</h2>
            <label>y: 
              <input type='number' min={1} max={100} defaultValue={100} />
            </label>
            <label>x: 
              <input type='number' min={1} max={50} defaultValue={50} />
            </label>
            <label>Paste your pattern: 
            </label>
            <textarea value={inputPattern} cols={25} rows={10} onChange={handleChangeTextArea} />
            <button onClick={applyConfiguration}>Set Random</button>
            <button onClick={handlePattern}>Set Pattern</button>
          </ConfigurationView>
        }
        <div className='game-box'>
          <div className='game-panel'>
            <button onClick={openConfigurationView}><MdSettings /></button>
            <button onClick={resetGame}><MdRefresh /></button>
            <button onClick={() => setIsPause(!isPause)}>
              {
                isPause
                  ?
                  <MdPlayArrow />
                  :
                  <MdPause />
              }
            </button>
            <button onClick={() => setGameDelay(240)}>1x</button>
            <button onClick={() => setGameDelay(120)}>2x</button>
            <button onClick={() => setGameDelay(80)}>3x</button>
            <span>{`Gen:${generations}`}</span>
            <span>{`Pop:${population}`}</span>
          </div>
          <div className='game-board'>
            {board && <GameGrid board={board} />}
          </div>
        </div>
      </main>
    </>
  );
}

export default App
