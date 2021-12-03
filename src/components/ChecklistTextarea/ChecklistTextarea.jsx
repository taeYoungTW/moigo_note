import { useCallback, useRef } from 'react';
import { ADD_LIST_TEXT, BlockTypes } from '../../constants/constants';
import { CHECKLIST_CONTENT_DECORATION_VALUE } from '../../constants/iconStyles';
import { useAppAction } from '../../contexts/AppStateContext';
import useAutoHeightTextarea from '../../hooks/useAutoHeightTextarea';
import styles from './ChecklistTextarea.scss';
const ChecklistTextarea = ({ block }) => {
	// Global Actions ------------------------------------
	const { _addTypeBlock, _updateBlock } = useAppAction();

	// Event Handler ------------------------------------
	const handleChecklistContentOnChange = useCallback(
		(e) => {
			const {
				target: { value },
			} = e;
			_updateBlock({ ...block, content: value });
		},
		[_updateBlock, block]
	);

	const handleOnKeyDown = (e) => {
		const { keyCode, shiftKey } = e;
		if (keyCode !== 13) {
			return;
		}
		e.preventDefault();
		if (!shiftKey) {
			_addTypeBlock(BlockTypes.CHECKLIST);
		}
		if (shiftKey) {
			_updateBlock({ ...block, content: (block.content += '\n') });
		}
	};

	// Ref ---------------------------------------------------
	const contentRef = useRef(null);

	// hook : textarea auto height -----------------------------
	useAutoHeightTextarea(contentRef, block.content);

	// Render ------------------------------------------
	return (
		<textarea
			className={styles.checklistBlockTextarea}
			type="text"
			value={block.content}
			onChange={handleChecklistContentOnChange}
			onKeyDown={handleOnKeyDown}
			placeholder={ADD_LIST_TEXT}
			rows={1}
			ref={contentRef}
			spellCheck={false}
			autoFocus={true}
			style={{
				textDecoration: block.isDone && CHECKLIST_CONTENT_DECORATION_VALUE,
			}}
		/>
	);
};

export default ChecklistTextarea;
