import React from 'react';
import { TEXT_DECORATION_VALUE } from '../../constants/constants';

const ChecklistContent = ({ isDone, content }) => {
	return (
		<div
			className="content"
			style={{
				textDecoration: isDone && TEXT_DECORATION_VALUE,
			}}
		>
			{content}
		</div>
	);
};

export default ChecklistContent;
