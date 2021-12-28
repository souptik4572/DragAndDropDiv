import React, { useState, useRef } from 'react';
import './DrawSpace.css';
import WidgetsTray from '../WidgetsTray/WidgetsTray';

import flower1 from '../../assets/flower1.jpg';
import flower2 from '../../assets/flower2.jpg';
import flower3 from '../../assets/flower3.jpg';

const DrawSpace = (props) => {
	const [widgets, setWidgets] = useState([flower1, flower2, flower3]);
	const [draggedWidgetIndex, setDraggedWidgetIndex] = useState(null);
	const draggedWidgetRef = useRef();
	const allocateDraggedWidget = (widgetIndex) => setDraggedWidgetIndex(widgetIndex);
	const onDrop = (event) => {
		event.preventDefault();
		draggedWidgetRef.current.children[0].src = widgets[draggedWidgetIndex];
	};
	const handleReset = () => {
		draggedWidgetRef.current.children[0].src = '';
	};
	return (
		<div className='DrawSpace'>
			<div className='DrawSpace-widgets'>
				<WidgetsTray widgets={widgets} allocateDraggedWidget={allocateDraggedWidget} />
			</div>
			<div className='DrawSpace-main'>
				<h3>Main Draw Area</h3>
				<button onClick={handleReset}>Reset</button>
				<div
					className='draw-area'
					ref={draggedWidgetRef}
					onDragOver={(event) => event.preventDefault()}
					onDrop={onDrop}
				>
					<img alt='Drag and Drop widgets here' />
				</div>
			</div>
		</div>
	);
};

export default DrawSpace;
