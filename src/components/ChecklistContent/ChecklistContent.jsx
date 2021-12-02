import React from 'react';
import { CHECKLIST_CONTENT_DECORATION_VALUE } from '../../constants/iconStyles';
import styles from './ChecklistContent.scss';

const ChecklistContent = ({ isDone, content }) => {
	return (
		<div
			className={styles.checklistContent}
			style={{
				textDecoration: isDone && CHECKLIST_CONTENT_DECORATION_VALUE,
			}}
		>
			{content}
		</div>
	);
};

export default ChecklistContent;
