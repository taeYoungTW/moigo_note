import { useCallback, useRef } from 'react';
import styles from './CreateTextBlock.scss';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import PropTypes from 'prop-types';
import { BlockTypes, WRITE_NOTE_TEXT } from '../../constants/constants';
import useAutoHeightTextarea from '../../hooks/useAutoHeightTextarea';
import useIsPrevBlockToFocus from '../../hooks/useIsPrevBlockToFocus';
import useShortcuts from '../../hooks/useShortcuts';
import useSetCaretEnd from '../../hooks/useSetCaretEnd';

const CreateTextBlock = ({ block, blockIndex }) => {
	/* ---- Global States & Actions ------------------------------ */
	const { _updateBlock, _deleteBlock, _setIndexToFocus, _addTypeBlock } =
		useAppAction();
	const { _indexToFocus } = useAppState();

	/* ---- Ref -------------------------------------------------------- */
	const textRef = useRef(null);

	/* ---- hooks ---------------------------------------- */
	useAutoHeightTextarea(textRef, block.text);
	const { initIndexToFocus: handleOnBlur } = useIsPrevBlockToFocus(
		blockIndex,
		[_indexToFocus, _setIndexToFocus],
		textRef
	);
	useSetCaretEnd(textRef); // For #4 issue
	const {
		handleEnterKey,
		handleBackspaceKey,
		handleBracketsKey,
		handleArrowKey,
	} = useShortcuts();

	/* ---- EventHandlers ---------------------------------------- */
	// onChange
	const handleTextOnChange = useCallback(
		(e) => {
			const {
				target: { value },
			} = e;
			_updateBlock({ ...block, text: value });
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

		handleBracketsKey(e, () => {
			_updateBlock({
				id: block.id,
				type: BlockTypes.CHECKLIST,
				isDone: false,
				content: '',
			});
		});

		handleBackspaceKey(e, block.text, () => {
			_setIndexToFocus(blockIndex - 1);
			_deleteBlock(block.id);
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

	/* ---- Render ---------------------------------------- */
	return (
		<textarea
			className={styles.textBlockTextarea}
			type="text"
			value={block.text}
			onKeyDown={handleOnKeyDown}
			onChange={handleTextOnChange}
			placeholder={WRITE_NOTE_TEXT}
			rows={1}
			ref={textRef}
			spellCheck={false}
			onBlur={handleOnBlur}
		/>
	);
};

// PropTypes ----------------------------------------------------------
CreateTextBlock.propTypes = {
	block: PropTypes.object,
};

export default CreateTextBlock;
