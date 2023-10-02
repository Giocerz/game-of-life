import { useEffect } from 'react'
import './GameGrid.css'
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { MdZoomIn, MdZoomOut, MdZoomInMap} from "react-icons/md";

const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    return (
      <div className='controls-container'>
        <button onClick={() => zoomIn()}><MdZoomIn /></button>
        <button onClick={() => zoomOut()}><MdZoomOut /></button>
        <button onClick={() => resetTransform()}><MdZoomInMap /></button>
      </div>
    );
  };

function GameGrid({ board }) {
    const flattenBoard = () => {
        let flatBoard = [];
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                flatBoard.push(board[i][j]);
            }
        }
        return flatBoard;
    };
    return (
        <TransformWrapper style={{ position: 'relative'}}>
            <Controls />
            <TransformComponent>
                <div className='gameGrid'>
                    {flattenBoard().map((value, index) => {
                        if (value) {
                            return <span key={index} className='cell life'></span>
                        } else {
                            return <span key={index} className='cell '></span>
                        }
                    })}
                </div>
            </TransformComponent>
        </TransformWrapper>
    );
}

export default GameGrid;

