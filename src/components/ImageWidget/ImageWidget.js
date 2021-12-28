import React from 'react';
import './ImageWidget.css';

const ImageWidget = (props) => {
	const { index, image, allocateDraggedWidget } = props;
	const onDrag = (event) => {
		event.preventDefault();
		allocateDraggedWidget(index);
	};
	return (
		<div className='ImageWidget'>
			<img src={image} onDrag={onDrag} alt='A flower widget' draggable />
		</div>
	);
};

export default ImageWidget;
