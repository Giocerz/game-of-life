import { useRef, useEffect } from 'react'
import './GameGrid.css'
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { MdZoomIn, MdZoomOut, MdZoomInMap} from "react-icons/md";

const ZoomControls = () => {
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
    const canvaBoardRef = useRef(null);

    const draw = (context) => {
        context.fillStyle = '#EFF2F4';
        context.fillRect(0, 0, 400, 600);

        board.forEach((row, y) => {
            row.forEach((value, x) => {
                if(value) {
                    context.fillStyle = 'black';
                    context.fillRect(x, y, 1, 1);
                }
            })
        });
    }

    useEffect(() => {
        const canvas = canvaBoardRef.current;
        const context = canvas.getContext('2d');
        context.resetTransform();
        context.scale(4, 4);
        draw(context);
    }, [board])

    return (
        <>
        <TransformWrapper style={{ position: 'relative'}}>
            <ZoomControls />
            <TransformComponent>
                <canvas ref={canvaBoardRef} width={400} height={600} />
            </TransformComponent>
        </TransformWrapper>
        </>
    );
}

export default GameGrid;

