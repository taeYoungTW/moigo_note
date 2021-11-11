import { useCallback } from 'react';
import './CreateBlocks.scss';
import { useAppAction } from '../../contexts/AppStateContext';
import PropTypes from 'prop-types';
import { CTRL_BLOCK_ICON_STYLE } from '../../constants/iconStyles';
import CheckBoxInput from '../Common/CheckBoxInput';
import ChecklistTextarea from '../Common/ChecklistTextarea';
import useAddBlock from '../../hooks/useAddBlock';
import DeleteBtn from '../Common/DeleteBtn';

const CreateChecklistBlock = ({ block, isUpdate, children }) => {
	// Global States, Actions ------------------------------------
	const { _addBlock, _deleteBlock, _updateBlock } = useAppAction();
	const addBlock = useAddBlock(_addBlock);

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

	const handleOnKeyDown = (e) => {
		const { keyCode, shiftKey } = e;
		if (keyCode !== 13) {
			return;
		}
		e.preventDefault();
		if (!shiftKey) {
			addBlock('checklist');
		}
		if (shiftKey) {
			_updateBlock({ ...block, content: (block.content += '\n') });
		}
	};

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
					handleOnKeyDown={handleOnKeyDown}
				/>
			</div>
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

// PropTypes ------------------------------------------------------
CreateChecklistBlock.propTypes = {
	block: PropTypes.object,
	isUpdate: PropTypes.bool,
};

export default CreateChecklistBlock;
