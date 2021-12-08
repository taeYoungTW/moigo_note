import { useCallback, useEffect, useRef } from 'react';
import styles from './CreateTextBlock.scss';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import PropTypes from 'prop-types';
import { BlockTypes, WRITE_NOTE_TEXT } from '../../constants/constants';
import useAutoHeightTextarea from '../../hooks/useAutoHeightTextarea';
import {
	handleBlockWithArrowKey,
	handleBlockWithBackspaceKey,
	handleBlockWithBrackets,
	handleBlockWithEnterKey,
} from '../../utils/handleBlockOnkeyDown';
import useIsPrevBlockToFocus from '../../hooks/useIsPrevBlockToFocus';
import setCaretEnd from '../../utils/setCaretEnd';

const CreateTextBlock = ({ block, blockIndex }) => {
	/* ---- Global States & Actions ------------------------------ */
	const { _updateBlock, _deleteBlock, _setIndexToFocus, _addTypeBlock } =
		useAppAction();
	const { _indexToFocus } = useAppState();

	// Ref --------------------------------------------------------
	const textRef = useRef(null);

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
		handleBlockWithBrackets(e, () => {
			_updateBlock({
				id: block.id,
				type: BlockTypes.CHECKLIST,
				isDone: false,
				content: '',
			});
		});

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

	/* ---- hooks ---------------------------------------- */
	useAutoHeightTextarea(textRef, block.text);
	useIsPrevBlockToFocus(blockIndex, _indexToFocus, textRef.current);

	/* ---- useEffects ---------------------------------------- */
	useEffect(() => {
		setCaretEnd(textRef.current); // hook으로 만들어 버리면, DOM이 생겨나는 것을 감지하지 못함
	}, []);

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
