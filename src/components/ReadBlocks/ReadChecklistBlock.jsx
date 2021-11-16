import { useAppAction } from '../../contexts/AppStateContext';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import ChecklistContent from '../Common/ChecklistContent';
import CheckBoxInput from '../CheckBoxInput/CheckBoxInput';

const ReadChecklistBlock = ({ block, noteId, isDetailNote }) => {
	// Global States, Actions ---------------------------------------
	const { _updateChecklistOfNote, _updateChecklistOfModalNote } =
		useAppAction();

	// Event Handler ----------------------------------------------
	/* - handleCheckBoxOnChange
	 * ReadChecklistBlock의 경우 DetailNote와 SummaryNote에서 공유되어 사용됩니다.
	 * 기본적으로 "_allNotes"의 특정 note의 특정 checklistblock을 update합니다.
	 * isDetail 값을 통해서 DetailNote에서 수정되는 경우 추가적으로 _modalNote의 특정 checklistblock을 update 합니다.
	 */
	const handleCheckBoxOnChange = useCallback(
		(e) => {
			const {
				target: { checked },
			} = e;
			_updateChecklistOfNote(noteId, {
				...block,
				isDone: checked,
			});
			if (isDetailNote) {
				_updateChecklistOfModalNote({
					...block,
					isDone: checked,
				});
			}
		},
		[
			_updateChecklistOfNote,
			_updateChecklistOfModalNote,
			block,
			noteId,
			isDetailNote,
		]
	);

	// Render -----------------------------------------------------
	return (
		<div className={`read_block ${isDetailNote ? 'detail' : ''}`}>
			<div className="read_checklist_block">
				<div
					onClick={(e) => {
						e.stopPropagation();
					}}
					className="stopPropagation_el"
				>
					<CheckBoxInput
						blockId={block.id}
						isDone={block.isDone}
						handleCheckBoxOnChange={handleCheckBoxOnChange}
						location={isDetailNote ? 'detailNote' : 'summaryNote'}
					/>
				</div>
				<ChecklistContent isDone={block.isDone} content={block.content} />
			</div>
		</div>
	);
};

// PropTypes --------------------------------------------------------------
ReadChecklistBlock.propTypes = {
	block: PropTypes.object,
	noteId: PropTypes.string,
	isDetail: PropTypes.bool,
};

export default ReadChecklistBlock;
