import { useCallback, useEffect, useRef } from 'react';
import { ADD_LIST_TEXT, BlockTypes } from '../../constants/constants';
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
	/* ---- Global States & Actions ------------------------------ */
	const { _indexToFocus } = useAppState();
	const { _addTypeBlock, _updateBlock, _setIndexToFocus } = useAppAction();

	/* ---- EventHandlers ---------------------------------------- */
	// onChange
	const handleChecklistContentOnChange = useCallback(
		(e) => {
			const {
				target: { value },
			} = e;
			_updateBlock({ ...block, content: value });
		},
		[_updateBlock, block]
	);

	// onKeyDown
	const handleOnKeyDown = (e) => {
		// Solved #6 issue
		if (e.nativeEvent.isComposing) {
			return;
		}

		handleBlockWithBackspaceKey(e, block.content, () => {
			_updateBlock({
				id: block.id,
				type: BlockTypes.TEXT,
				text: '',
			});
		});

		handleBlockWithEnterKey(e, () => {
			_addTypeBlock(block.type, undefined, blockIndex + 1);
		});

		handleBlockWithArrowKey(
			e,
			() => {
				_setIndexToFocus(blockIndex - 1);
			},
			() => {
				_setIndexToFocus(blockIndex + 1);
			}
		);
	};

	// onBlur
	/* Solved Issue #5
	 Clean Up (For Checking a Change in useIsPrevBlockToFocus hook or like useEffect) */
	const handleOnBlur = (e) => {
		if (_indexToFocus === -1) {
			return;
		}
		_setIndexToFocus(-1);
	};

	/* ---- Ref -------------------------------------------------- */
	const contentRef = useRef(null);

	/* ---- hooks -------------------------------------------------- */
	useAutoHeightTextarea(contentRef, block.content);
	useIsPrevBlockToFocus(blockIndex, _indexToFocus, contentRef.current);

	/* ---- useEffects -------------------------------------------------- */
	useEffect(() => {
		setCaretEnd(contentRef.current); // hook으로 만들어 버리면, DOM이 생겨나는 것을 감지하지 못함
	}, []);

	/* ---- Render -------------------------------------------------- */
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
			onBlur={handleOnBlur}
		/>
	);
};

export default ChecklistTextarea;
