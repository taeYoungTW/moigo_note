import { useCallback } from 'react';
import { useAppAction } from '../../contexts/AppStateContext';
import PropTypes from 'prop-types';
import CheckBoxInput from '../CheckBoxInput/CheckBoxInput';
import ChecklistTextarea from '../ChecklistTextarea/ChecklistTextarea';
import './CreateChecklistBlock.scss';

const CreateChecklistBlock = ({ block, isUpdate, blockIndex }) => {
	// Global States, Actions ------------------------------------
	const { _addTypeBlock, _updateBlock, _moveBlockToBottom } = useAppAction();

	// Event Handler --------------------------------------------
	const handleCheckBoxOnChange = useCallback(
		(e) => {
			const {
				target: { checked },
			} = e;
			if (checked) {
				_moveBlockToBottom(blockIndex);
			}
			_updateBlock({ ...block, isDone: checked });
		},
		[_updateBlock, block, _moveBlockToBottom, blockIndex]
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

	const handleOnKeyDown = (e) => {
		const { keyCode, shiftKey } = e;
		if (keyCode !== 13) {
			return;
		}
		e.preventDefault();
		if (!shiftKey) {
			_addTypeBlock('checklist');
		}
		if (shiftKey) {
			_updateBlock({ ...block, content: (block.content += '\n') });
		}
	};

	// Render ------------------------------------------
	return (
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
	);
};

// PropTypes ------------------------------------------------------
CreateChecklistBlock.propTypes = {
	block: PropTypes.object,
	isUpdate: PropTypes.bool,
};

export default CreateChecklistBlock;
