import { useCallback, useRef, useState } from 'react';
import './CreateBlocks.scss';
import { useAppAction } from '../../contexts/AppStateContext';
import PropTypes from 'prop-types';
import { WRITE_NOTE_TEXT } from '../../constants/constants';
import useAutoHeightTextArea from '../../hooks/useAutoHeightTextArea';
import DeleteBtn from '../Common/DeleteBtn';
import { CTRL_BLOCK_ICON_STYLE } from '../../constants/iconStyles';

const CreateTextBlock = ({ block, children }) => {
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
				<DeleteBtn
					style={CTRL_BLOCK_ICON_STYLE}
					handleDeleteBtnOnClick={handleDeleteBtnOnClick}
				/>
				{children}
			</div>
		</div>
	);
};

// PropTypes ----------------------------------------------------------
CreateTextBlock.propTypes = {
	block: PropTypes.object,
};

export default CreateTextBlock;
