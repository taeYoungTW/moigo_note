import { useCallback, useRef } from 'react';
import { ADD_LIST_TEXT, BlockTypes } from '../../constants/constants';
import { CHECKLIST_CONTENT_DECORATION_VALUE } from '../../constants/iconStyles';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import useAutoHeightTextarea from '../../hooks/useAutoHeightTextarea';
import useFocusPrevBlock from '../../hooks/useFocusPrevBlock';
import {
	handleBlockWithBackspaceKey,
	handleBlockWithEnterKey,
} from '../../utils/handleBlockOnkeyDown';
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
		handleBlockWithBackspaceKey(e, block.content, () => {
			_deleteBlock(block.id);
			_setIndexToFocus(blockIndex - 1);
		});

		handleBlockWithEnterKey(
			e,
			() => _updateBlock({ ...block, content: (block.content += '\n') }),
			() => _addTypeBlock(BlockTypes.CHECKLIST, undefined, blockIndex + 1)
		);
	};

	// Ref ---------------------------------------------------
	const contentRef = useRef(null);

	// hook : textarea auto height -----------------------------
	useAutoHeightTextarea(contentRef, block.content);
	useFocusPrevBlock(blockIndex, _indexToFocus, contentRef.current);

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
