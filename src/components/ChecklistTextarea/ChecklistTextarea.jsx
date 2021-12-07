import { useCallback, useEffect, useRef } from 'react';
import { ADD_LIST_TEXT } from '../../constants/constants';
import { CHECKLIST_CONTENT_DECORATION_VALUE } from '../../constants/iconStyles';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import useAutoHeightTextarea from '../../hooks/useAutoHeightTextarea';
import useIsPrevBlockToFocus from '../../hooks/useIsPrevBlockToFocus';
import {
	handleBlockWithArrowKey,
	handleBlockWithBackspaceKey,
	handleBlockWithEnterKey,
} from '../../utils/handleBlockOnkeyDown';
import setCaretEnd from '../../utils/setCaretEnd';
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
		// Solved #6 issue
		if (e.nativeEvent.isComposing) {
			return;
		}

		handleBlockWithBackspaceKey(e, block.text, () => {
			_setIndexToFocus(blockIndex - 1);
			_deleteBlock(block.id);
		});

		handleBlockWithEnterKey(e, () => {
			_addTypeBlock(block.type, undefined, blockIndex + 1);
		});

		handleBlockWithArrowKey(
			e,
			() => {
				_setIndexToFocus(blockIndex - 1);
				console.log('to', blockIndex - 1, 'up');
			},
			() => {
				_setIndexToFocus(blockIndex + 1);
				console.log('to', blockIndex + 1, 'down');
			}
		);
	};

	// Ref ---------------------------------------------------
	const contentRef = useRef(null);

	// hooks -----------------------------
	useAutoHeightTextarea(contentRef, block.content);
	useIsPrevBlockToFocus(blockIndex, _indexToFocus, contentRef.current);

	useEffect(() => {
		setCaretEnd(contentRef.current); // hook으로 만들어 버리면, DOM이 생겨나는 것을 감지하지 못함
	}, []);

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
			style={{
				textDecoration: block.isDone && CHECKLIST_CONTENT_DECORATION_VALUE,
			}}
		/>
	);
};

export default ChecklistTextarea;
