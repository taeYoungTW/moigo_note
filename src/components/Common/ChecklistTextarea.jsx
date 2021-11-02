import { useRef } from 'react';
import {
	ADD_LIST_TEXT,
	TEXT_DECORATION_VALUE,
} from '../../constants/constants';
import useAutoHeightTextArea from '../../hooks/useAutoHeightTextArea';

const ChecklistTextarea = ({
	content,
	isDone,
	handleChecklistContentOnChange,
}) => {
	const contentRef = useRef(null);

	// hook : textarea auto height -----------------------------
	useAutoHeightTextArea(contentRef, content);

	// Render ------------------------------------------
	return (
		<textarea
			className="checklist_block_textarea"
			type="text"
			value={content}
			onChange={handleChecklistContentOnChange}
			placeholder={ADD_LIST_TEXT}
			rows={1}
			ref={contentRef}
			spellCheck={false}
			autoFocus={true}
			style={{
				textDecoration: isDone && TEXT_DECORATION_VALUE,
			}}
		/>
	);
};

export default ChecklistTextarea;
