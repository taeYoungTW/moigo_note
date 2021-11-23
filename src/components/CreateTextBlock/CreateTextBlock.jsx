import { useCallback, useRef } from 'react';
import './CreateTextBlock.scss';
import { useAppAction } from '../../contexts/AppStateContext';
import PropTypes from 'prop-types';
import { WRITE_NOTE_TEXT } from '../../constants/constants';
import useAutoHeightTextarea from '../../hooks/useAutoHeightTextarea';

const CreateTextBlock = ({ block }) => {
	// Global States, Actions ---------------------------------------
	const { _updateBlock } = useAppAction();

	// Local States ------------------------------------------------
	// const [textBlock, setTextBlock] = useState(block);

	// Event Handler ----------------------------------------------
	const handleTextOnChange = useCallback(
		(e) => {
			const {
				target: { value },
			} = e;
			_updateBlock({ ...block, text: value });
			// setTextBlock((block) => {
			// 	return { ...block, text: value };
			// });
		},
		[_updateBlock, block]
	);

	// Ref --------------------------------------------------------
	const textRef = useRef(null);

	// hook : textarea auto height -----------------------------
	useAutoHeightTextarea(textRef, block.text);

	// Render -------------------------------------------------------
	return (
		<textarea
			className="text-block-textarea"
			type="text"
			value={block.text}
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
