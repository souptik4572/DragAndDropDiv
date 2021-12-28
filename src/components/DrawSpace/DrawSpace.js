import React, { useState, useRef, useCallback } from 'react';
import './DrawSpace.css';
import WidgetsTray from '../WidgetsTray/WidgetsTray';

import flower1 from '../../assets/flower1.jpg';
import flower2 from '../../assets/flower2.jpg';
import flower3 from '../../assets/flower3.jpg';

const DrawSpace = (props) => {
	const [widgets, setWidgets] = useState([flower1, flower2, flower3]);
	const [draggedWidgetIndex, setDraggedWidgetIndex] = useState(null);
	const [size, setSize] = useState({ x: 600, y: 500 });
	const draggedWidgetRef = useRef();
	const allocateDraggedWidget = (widgetIndex) => setDraggedWidgetIndex(widgetIndex);
	const topRightAlign = useRef();
	const topLeftAlign = useRef();
	const bottomRightAlign = useRef();
	const bottomLeftAlign = useRef();
	const aligners = [topRightAlign, topLeftAlign];
	const onDrop = (event) => {
		event.preventDefault();
		draggedWidgetRef.current.children[0].style.backgroundImage = `url(${widgets[draggedWidgetIndex]})`;
	};
	const handleReset = () => {
		draggedWidgetRef.current.children[0].style.backgroundImage = '';
	};
	const calculateResize = (currentX, currentY, eX, eY, btnPos) => {
		console.log(btnPos);
		switch (btnPos) {
			case 'top-right':
				return {
					x: currentX + eX,
					y: currentY - eY,
				};
			case 'top-left':
				return {
					x: currentX - eX,
					y: currentY - eY,
				};
			case 'bottom-right':
				return {
					x: currentX + eX,
					y: currentY - eY,
				};
			case 'bottom-left':
				return {
					x: currentX + eX,
					y: currentY - eY,
				};
			default:
				return {
					x: currentX,
					y: currentY,
				};
		}
	};
	const resizeHandler = useCallback(() => {
		function onMouseMove(e, btnPos) {
			setSize((currentSize) =>
				calculateResize(currentSize.x, currentSize.y, e.movementX, e.movementY, btnPos)
			);
		}
		function onMouseUp() {
			aligners.forEach((anAligner) => {
				anAligner.current.removeEventListener('mousemove', onMouseMove);
				anAligner.current.removeEventListener('mouseup', onMouseUp);
			});
		}
		topRightAlign.current.addEventListener('mousemove', (event) =>
			onMouseMove(event, 'top-right')
		);
		topLeftAlign.current.addEventListener('mousemove', (event) =>
			onMouseMove(event, 'top-left')
		);
		topRightAlign.current.addEventListener('mouseleave', onMouseUp);
		topRightAlign.current.addEventListener('onmouseup', onMouseUp);
		topLeftAlign.current.addEventListener('mouseleave', onMouseUp);
		topLeftAlign.current.addEventListener('onmouseup', onMouseUp);
	}, []);
	return (
		<div className='DrawSpace'>
			<div className='DrawSpace-widgets'>
				<WidgetsTray widgets={widgets} allocateDraggedWidget={allocateDraggedWidget} />
			</div>
			<div className='DrawSpace-main'>
				<h3>Main Draw Area</h3>
				<button className='reset' onClick={handleReset}>
					Reset
				</button>
				<div
					className='draw-area'
					ref={draggedWidgetRef}
					onDragOver={(event) => event.preventDefault()}
					onDrop={onDrop}
				>
					<div
						className='inner'
						style={{
							width: size.x,
							height: size.y,
							backgroundSize: 'cover',
						}}
					>
						<button
							ref={topRightAlign}
							onMouseDown={resizeHandler}
							style={{
								top: 0,
								right: -size.x / 2,
							}}
						>
							+
						</button>
						<button
							ref={topLeftAlign}
							onMouseDown={resizeHandler}
							style={{
								top: 0,
								right: size.x / 2,
							}}
						>
							+
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DrawSpace;
