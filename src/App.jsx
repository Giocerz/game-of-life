import { useEffect, useState } from 'react'
import './App.css'
import { randomBoard } from './logic/randomBoard';
import GameGrid from './Components/GameGrid/GameGrid';
import { compareBoard, countPopulation } from './logic/compareBoard';
import { MdRefresh, MdPause, MdPlayArrow, MdSettings } from "react-icons/md";

function App() {
  const [board, setBoard] = useState(randomBoard());
  const [isPause, setIsPause] = useState(true);
  const [generations, setGenerations] = useState(0);
  const [population, setPopulation] = useState(0);
  const [gameDelayId, setGameDelayId] = useState();
  const [gameDelay, setGameDelay] = useState(500);
  const [configDisplay, setConfigDisplay] = useState(false);

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
    setConfigDisplay(false);
    clearTimeout(gameDelayId);
    setBoard(randomBoard());
    setPopulation(0);
    setGenerations(0);
    setIsPause(true);
  };

  const openConfigurationView = () => {
    setConfigDisplay(true);
    setIsPause(true);
  }

  return (
    <>
      <header className='header'>
        <div className='header-top-decorate'></div>
        <h1>Game of life</h1>
      </header>
      <main className='game-main'>
        {configDisplay &&
          <div className='configurations' >
            <h2>Configurations</h2>
            <label>y: </label>
            <input type='number' min={1} max={100} defaultValue={100} />
            <label>x: </label>
            <input type='number' min={1} max={50} defaultValue={50} />
            <input></input>
            <button onClick={applyConfiguration}>Random</button>
          </div>
        }
        <div className='game-box'>
          <div className='game-panel'>
            <button><MdSettings /></button>
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
            <button onClick={() => setGameDelay(500)}>1x</button>
            <button onClick={() => setGameDelay(250)}>2x</button>
            <button onClick={() => setGameDelay(167)}>3x</button>
            <span>{`Gen:${generations}`}</span>
            <span>{`Pop:${population}`}</span>
          </div>
          <div className='game-board'>
            {board && <GameGrid board={board} />}
          </div>
        </div>
      </main>
    </>
  )
}

export default App
