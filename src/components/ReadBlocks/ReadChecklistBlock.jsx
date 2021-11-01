import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useAppAction } from '../../contexts/AppStateContext';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
	CHECKBOX_ICON_COLOR,
	CHECKBOX_ICON_FONT_SIZE,
	TEXT_DECORATION_VALUE,
} from '../../constants/constants';

const ReadChecklistBlock = ({ block, noteId, isDetail }) => {
	// Global States, Actions ---------------------------------------
	const { _updateChecklistOfNote, _updateChecklistOfDetailNote } =
		useAppAction();

	// Event Handler ----------------------------------------------
	/* - handleCheckBoxOnChange
	 * ReadChecklistBlock의 경우 DetailNote와 SummaryNote에서 공유되어 사용됩니다.
	 * 기본적으로 "_allNotes"의 특정 note의 특정 checklistblock을 update합니다.
	 * isDetail 값을 통해서 DetailNote에서 수정되는 경우 추가적으로 _detailNote의 특정 checklistblock을 update 합니다.
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
			if (isDetail) {
				_updateChecklistOfDetailNote({
					...block,
					isDone: checked,
				});
			}
		},
		[
			_updateChecklistOfNote,
			_updateChecklistOfDetailNote,
			block,
			noteId,
			isDetail,
		]
	);

	// Render -----------------------------------------------------
	return (
		<div className={`read_block ${isDetail ? 'detail' : ''}`}>
			<div className="read_checklist_block">
				<div
					onClick={(e) => {
						e.stopPropagation();
					}}
					className="stopPropagation_el"
				>
					<label
						htmlFor={isDetail ? `DetailNote_${block.id}` : block.id}
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
						id={isDetail ? `DetailNote_${block.id}` : block.id}
						className="checkbox_input"
						checked={block.isDone}
						onChange={handleCheckBoxOnChange}
					/>
				</div>
				<div
					className="content"
					style={{
						textDecoration: block.isDone && TEXT_DECORATION_VALUE,
					}}
				>
					{block.content}
				</div>
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
