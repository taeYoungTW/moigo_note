import { useCallback, useEffect, useRef } from 'react';
import { ADD_LIST_TEXT, BlockTypes } from '../../constants/constants';
import { CHECKLIST_CONTENT_DECORATION_VALUE } from '../../constants/iconStyles';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import useAutoHeightTextarea from '../../hooks/useAutoHeightTextarea';
import styles from './ChecklistTextarea.scss';
const ChecklistTextarea = ({ block, blockIndex }) => {
	// Global Actions ------------------------------------
	const { _indexToFocus } = useAppState();
	const { _addTypeBlock, _updateBlock, _deleteBlock, _setIndexToFocus } =
		useAppAction();

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
		// Delete Block & Focus a before block
		if (!block.content && keyCode === 8) {
			_deleteBlock(block.id);
			_setIndexToFocus(blockIndex - 1);
			return;
		}

		// About Enter key
		if (keyCode === 13) {
			e.preventDefault(); // Prevent make newline when you press Enter key
			if (!shiftKey) {
				_addTypeBlock(BlockTypes.CHECKLIST);
				return;
			}
			if (shiftKey) {
				_updateBlock({ ...block, content: (block.content += '\n') });
				return;
			}
			return;
		}
	};

	useEffect(() => {
		if (_indexToFocus === blockIndex) {
			contentRef.current.focus();
		}
	}, [_indexToFocus, blockIndex]);

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
			autoFocus
			style={{
				textDecoration: block.isDone && CHECKLIST_CONTENT_DECORATION_VALUE,
			}}
		/>
	);
};

export default ChecklistTextarea;
