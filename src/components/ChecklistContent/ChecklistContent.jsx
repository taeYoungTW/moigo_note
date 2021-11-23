import React from 'react';
import { CHECKLIST_CONTENT_DECORATION_VALUE } from '../../constants/iconStyles';
import './ChecklistContent.scss';

const ChecklistContent = ({ isDone, content }) => {
	return (
		<div
			className="checklist-content"
			style={{
				textDecoration: isDone && CHECKLIST_CONTENT_DECORATION_VALUE,
			}}
		>
			{content}
		</div>
	);
};

export default ChecklistContent;
