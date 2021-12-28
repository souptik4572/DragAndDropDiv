import React from 'react';
import './WidgetsTray.css';
import ImageWidget from '../ImageWidget/ImageWidget';

const WidgetsTray = (props) => {
	const { widgets, allocateDraggedWidget } = props;
	return (
		<div className='WidgetsTray'>
			<h3>The different Widgets</h3>
			{widgets.map((aWidget, index) => (
				<ImageWidget
					key={index}
					index={index}
					image={aWidget}
					allocateDraggedWidget={allocateDraggedWidget}
				/>
			))}
		</div>
	);
};

export default WidgetsTray;
