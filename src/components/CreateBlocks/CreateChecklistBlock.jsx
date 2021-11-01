import { useCallback, useEffect, useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
import './CreateBlocks.scss';
import { useAppAction } from '../../contexts/AppStateContext';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PropTypes from 'prop-types';
import {
	ADD_LIST_TEXT,
	CHECKBOX_ICON_COLOR,
	CHECKBOX_ICON_FONT_SIZE,
	CTRL_BLOCK_ICON_FONT_SIZE,
	TEXT_DECORATION_VALUE,
} from '../../constants/constants';

const CreateChecklistBlock = ({ block, isUpdate }) => {
	// Global States, Actions ------------------------------------
	const { _deleteBlock, _updateBlock } = useAppAction();

	// Local State ----------------------------------------------
	const contentRef = useRef(null);

	// Event Handler --------------------------------------------
	const handleCheckBoxOnChange = useCallback(
		(e) => {
			const {
				target: { checked },
			} = e;
			_updateBlock({ ...block, isDone: checked });
		},
		[_updateBlock, block]
	);

	const handleChecklistContentOnChange = useCallback(
		(e) => {
			const {
				target: { value },
			} = e;
			_updateBlock({ ...block, content: value });
		},
		[_updateBlock, block]
	);

	const handleDeleteBtnOnClick = useCallback(() => {
		_deleteBlock(block.id);
	}, [_deleteBlock, block]);

	// useEffect : textarea auto height -----------------------------
	useEffect(() => {
		contentRef.current.style.height = '';
		contentRef.current.style.height = contentRef.current.scrollHeight + 'px';
	}, [block]);

	// Render ------------------------------------------
	return (
		<div className="create_block">
			<div className="checklist">
				<label
					htmlFor={isUpdate ? `updateNote_${block.id}` : block.id}
					className="checkbox_label"
				>
					{block.isDone ? (
						<CheckBoxIcon
							sx={{
								fontSize: CHECKBOX_ICON_FONT_SIZE,
								color: CHECKBOX_ICON_COLOR,
							}}
						/>
					) : (
						<CheckBoxOutlineBlankIcon
							sx={{
								fontSize: CHECKBOX_ICON_FONT_SIZE,
								color: CHECKBOX_ICON_COLOR,
							}}
						/>
					)}
				</label>
				<input
					type="checkbox"
					id={isUpdate ? `updateNote_${block.id}` : block.id}
					className="checkbox"
					checked={block.isDone}
					onChange={handleCheckBoxOnChange}
				/>
				<textarea
					className="checklist_block_textarea"
					type="text"
					value={block.content}
					onChange={handleChecklistContentOnChange}
					placeholder={ADD_LIST_TEXT}
					rows={1}
					ref={contentRef}
					spellCheck={false}
					autoFocus={true}
					style={{
						textDecoration: block.isDone && TEXT_DECORATION_VALUE,
					}}
				/>
			</div>
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

// PropTypes ------------------------------------------------------
CreateChecklistBlock.propTypes = {
	block: PropTypes.object,
	isUpdate: PropTypes.bool,
};

export default CreateChecklistBlock;
