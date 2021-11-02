import { useCallback } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
import './CreateBlocks.scss';
import { useAppAction } from '../../contexts/AppStateContext';
import PropTypes from 'prop-types';
import { CTRL_BLOCK_ICON_FONT_SIZE } from '../../constants/constants';
import CheckBoxInput from '../Common/CheckBoxInput';
import ChecklistTextarea from '../Common/ChecklistTextarea';

const CreateChecklistBlock = ({ block, isUpdate }) => {
	// Global States, Actions ------------------------------------
	const { _deleteBlock, _updateBlock } = useAppAction();

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

	// Render ------------------------------------------
	return (
		<div className="create_block">
			<div className="checklist">
				<CheckBoxInput
					blockId={block.id}
					isDone={block.isDone}
					location={isUpdate ? 'updateNote' : 'createNoteForm'}
					handleCheckBoxOnChange={handleCheckBoxOnChange}
				/>
				<ChecklistTextarea
					content={block.content}
					isDone={block.isDone}
					handleChecklistContentOnChange={handleChecklistContentOnChange}
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
