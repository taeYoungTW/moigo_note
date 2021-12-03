import { useCallback, useRef } from 'react';
import styles from './CreateTextBlock.scss';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import PropTypes from 'prop-types';
import { WRITE_NOTE_TEXT } from '../../constants/constants';
import useAutoHeightTextarea from '../../hooks/useAutoHeightTextarea';
import {
	handleBlockWithBackspaceKey,
	handleBlockWithEnterKey,
} from '../../utils/handleBlockOnkeyDown';
import useFocusPrevBlock from '../../hooks/useFocusPrevBlock';

const CreateTextBlock = ({ block, blockIndex }) => {
	// Global States, Actions ---------------------------------------
	const { _updateBlock, _deleteBlock, _setIndexToFocus, _addTypeBlock } =
		useAppAction();
	const { _indexToFocus } = useAppState();

	// Event Handler ----------------------------------------------
	const handleTextOnChange = useCallback(
		(e) => {
			const {
				target: { value },
			} = e;
			_updateBlock({ ...block, text: value });
		},
		[_updateBlock, block]
	);

	const handleOnKeyDown = (e) => {
		handleBlockWithBackspaceKey(e, block.text, () => {
			_setIndexToFocus(blockIndex - 1);
			_deleteBlock(block.id);
		});

		handleBlockWithEnterKey(
			e,
			() => _updateBlock({ ...block, text: (block.text += '\n') }),
			() => _addTypeBlock(block.type, undefined, blockIndex + 1)
		);
	};

	// Ref --------------------------------------------------------
	const textRef = useRef(null);

	// hook : textarea auto height -----------------------------
	useAutoHeightTextarea(textRef, block.text);
	useFocusPrevBlock(blockIndex, _indexToFocus, textRef.current);

	// Render -------------------------------------------------------
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
			autoFocus={true}
		/>
	);
};

// PropTypes ----------------------------------------------------------
CreateTextBlock.propTypes = {
	block: PropTypes.object,
};

export default CreateTextBlock;
