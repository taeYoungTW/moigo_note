import { useCallback, useRef, useState } from 'react';
import './CreateBlocks.scss';
import { useAppAction } from '../../contexts/AppStateContext';
import PropTypes from 'prop-types';
import { WRITE_NOTE_TEXT } from '../../constants/constants';
import useAutoHeightTextarea from '../../hooks/useAutoHeightTextarea';

const CreateTextBlock = ({ block, children }) => {
	// Global States, Actions ---------------------------------------
	const { _updateBlock } = useAppAction();

	// Local States ------------------------------------------------
	const [textBlock, setTextBlock] = useState(block);
	const textRef = useRef(null);

	// Event Handler ----------------------------------------------
	const handleTextOnChange = useCallback(
		(e) => {
			const {
				target: { value },
			} = e;
			_updateBlock({ ...textBlock, text: value });
			setTextBlock((block) => {
				return { ...block, text: value };
			});
		},
		[_updateBlock, setTextBlock, textBlock]
	);

	// hook : textarea auto height -----------------------------
	useAutoHeightTextarea(textRef, textBlock.text);

	// Render -------------------------------------------------------
	return (
		<textarea
			className="text_block_textarea"
			type="text"
			value={textBlock.text}
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
