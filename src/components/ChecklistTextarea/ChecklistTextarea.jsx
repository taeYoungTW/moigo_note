import { useCallback, useRef } from 'react';
import { ADD_LIST_TEXT, BlockTypes } from '../../constants/constants';
import { CHECKLIST_CONTENT_DECORATION_VALUE } from '../../constants/iconStyles';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import useAutoHeightTextarea from '../../hooks/useAutoHeightTextarea';
import useIsPrevBlockToFocus from '../../hooks/useIsPrevBlockToFocus';
import useSetCaretEnd from '../../hooks/useSetCaretEnd';
import useShortcuts from '../../hooks/useShortcuts';
import styles from './ChecklistTextarea.scss';

const ChecklistTextarea = ({ block, blockIndex }) => {
	/* ---- Global States & Actions ------------------------------ */
	const { _indexToFocus } = useAppState();
	const { _addTypeBlock, _updateBlock, _setIndexToFocus } = useAppAction();

	/* ---- Ref -------------------------------------------------- */
	const contentRef = useRef(null);

	/* ---- hooks -------------------------------------------------- */
	useAutoHeightTextarea(contentRef, block.content);
	const { initIndexToFocus: handleOnBlur } = useIsPrevBlockToFocus(
		blockIndex,
		[_indexToFocus, _setIndexToFocus],
		contentRef
	);
	useSetCaretEnd(contentRef); // For #4 issue
	const { handleEnterKey, handleBackspaceKey, handleArrowKey } = useShortcuts();

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

		handleEnterKey(e, () => {
			_addTypeBlock(block.type, undefined, blockIndex + 1);
		});

		handleBackspaceKey(e, block.content, () => {
			_updateBlock({
				id: block.id,
				type: BlockTypes.TEXT,
				text: '',
			});
		});

		handleArrowKey(
			e,
			() => {
				_setIndexToFocus(blockIndex - 1);
			},
			() => {
				_setIndexToFocus(blockIndex + 1);
			}
		);
	};

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
