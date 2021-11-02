import { useCallback, useRef, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
import './CreateBlocks.scss';
import { useAppAction } from '../../contexts/AppStateContext';
import PropTypes from 'prop-types';
import {
	CTRL_BLOCK_ICON_FONT_SIZE,
	WRITE_NOTE_TEXT,
} from '../../constants/constants';
import useAutoHeightTextArea from '../../hooks/useAutoHeightTextArea';

const CreateTextBlock = ({ block }) => {
	// Global States, Actions ---------------------------------------
	const { _deleteBlock, _updateBlock } = useAppAction();

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

	const handleDeleteBtnOnClick = useCallback(() => {
		_deleteBlock(block.id);
	}, [_deleteBlock, block]);

	// hook : textarea auto height -----------------------------
	useAutoHeightTextArea(textRef, textBlock.text);

	// Render -------------------------------------------------------
	return (
		<div className="create_block">
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
			<div className="btns">
				<button type="button" onClick={handleDeleteBtnOnClick}>
					<DeleteIcon sx={{ fontSize: CTRL_BLOCK_ICON_FONT_SIZE }} />
				</button>
				<button type="button">
					<MenuIcon sx={{ fontSize: CTRL_BLOCK_ICON_FONT_SIZE }} />
				</button>
			</div>
		</div>
	);
};

// PropTypes ----------------------------------------------------------
CreateTextBlock.propTypes = {
	block: PropTypes.object,
};

export default CreateTextBlock;
