import { useAppAction } from '../../contexts/AppStateContext';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import ChecklistContent from '../ChecklistContent/ChecklistContent';
import CheckBoxInput from '../CheckBoxInput/CheckBoxInput';
import './ReadChecklistBlock.scss';

const ReadChecklistBlock = ({ block, noteId, blockIndex }) => {
	// Global States, Actions ---------------------------------------
	const { _updateChecklistOfNote, _moveBlockToBottomOfNote } = useAppAction();

	// Event Handler ----------------------------------------------

	const handleCheckBoxOnChange = useCallback(
		(e) => {
			const {
				target: { checked },
			} = e;
			if (checked) {
				_moveBlockToBottomOfNote(noteId, blockIndex);
			}
			_updateChecklistOfNote(noteId, {
				...block,
				isDone: checked,
			});
		},
		[
			_updateChecklistOfNote,
			_moveBlockToBottomOfNote,
			blockIndex,
			block,
			noteId,
		]
	);

	// Render -----------------------------------------------------
	return (
		<div className="read-checklist-block">
			<div
				onClick={(e) => {
					e.stopPropagation();
				}}
				className="stopPropagation-el"
			>
				<CheckBoxInput
					isDone={block.isDone}
					handleCheckBoxOnChange={handleCheckBoxOnChange}
				/>
			</div>
			<ChecklistContent isDone={block.isDone} content={block.content} />
		</div>
	);
};

// PropTypes --------------------------------------------------------------
ReadChecklistBlock.propTypes = {
	block: PropTypes.object,
	noteId: PropTypes.string,
};

export default ReadChecklistBlock;
