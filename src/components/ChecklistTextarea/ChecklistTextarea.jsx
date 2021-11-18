import { useRef } from 'react';
import { ADD_LIST_TEXT } from '../../constants/constants';
import { CHECKLIST_CONTENT_DECORATION_VALUE } from '../../constants/iconStyles';
import useAutoHeightTextarea from '../../hooks/useAutoHeightTextarea';
import './ChecklistTextarea.scss';
const ChecklistTextarea = ({
	content,
	isDone,
	handleChecklistContentOnChange,
	handleOnKeyDown,
}) => {
	const contentRef = useRef(null);

	// hook : textarea auto height -----------------------------
	useAutoHeightTextarea(contentRef, content);

	// Render ------------------------------------------
	return (
		<textarea
			className="checklist-block-textarea"
			type="text"
			value={content}
			onChange={handleChecklistContentOnChange}
			onKeyDown={handleOnKeyDown}
			placeholder={ADD_LIST_TEXT}
			rows={1}
			ref={contentRef}
			spellCheck={false}
			autoFocus={true}
			style={{
				textDecoration: isDone && CHECKLIST_CONTENT_DECORATION_VALUE,
			}}
		/>
	);
};

export default ChecklistTextarea;
