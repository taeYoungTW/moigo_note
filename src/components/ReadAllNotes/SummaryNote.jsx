import './SummaryNote.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReadTextBlock from '../ReadBlocks/ReadTextBlock';
import ReadChecklistBlock from '../ReadBlocks/ReadChecklistBlock';

const SummaryNote = ({ note }) => {
	// Global States & Actions --------------
	const {
		_addSelectedNoteId,
		_deleteSelectedNoteId,
		_setDetailNote,
		_setConfirmNoteIdToDelete,
	} = useAppAction();
	const { _selectedNoteIds } = useAppState();

	// Local States --------------------------
	const [isSelected, setIsSelected] = useState(
		_selectedNoteIds.includes(note.id)
	); // false로 해야하나 고민

	// Event Handler ----------------------------------------------
	const handleMoveToConfirmOnClick = useCallback(
		(e) => {
			e.stopPropagation();
			_setConfirmNoteIdToDelete(note.id);
		},
		[_setConfirmNoteIdToDelete, note]
	);

	// Select or Unselect A SummaryNote
	const handleSelectBtnOnClick = useCallback(() => {
		setIsSelected(true);
		_addSelectedNoteId(note.id);
	}, [_addSelectedNoteId, note]);

	const handleUnselectBtnOnClick = useCallback(() => {
		setIsSelected(false);
		_deleteSelectedNoteId(note.id);
	}, [_deleteSelectedNoteId, note]);

	//---- useEffect ---- For Cancel Selection (Update Note Outline)
	useEffect(() => {
		setIsSelected(_selectedNoteIds.includes(note.id));
	}, [_selectedNoteIds, note]);

	// Render -------------------------------------------
	return (
		<article
			className="summary_note"
			onClick={() => {
				_setDetailNote(note);
			}}
		>
			<div className="summary_area">
				{note.title && <h1 className="summary_title">{note.title}</h1>}
				{note.blocks &&
					note.blocks.map((block) => {
						switch (block.type) {
							case 'text':
								return (
									<ReadTextBlock
										block={block}
										key={block.id}
										isDetail={false}
									/>
								);
							case 'checklist':
								return (
									<ReadChecklistBlock
										block={block}
										key={block.id}
										noteId={note.id}
										isDetail={false}
									/>
								);
							default:
								return new Error('Error: Read Block');
						}
					})}
			</div>
			<div className="ctrl_area">
				<button
					className="del_summary_note_btn"
					onClickCapture={handleMoveToConfirmOnClick}
				>
					<DeleteIcon sx={{ fontSize: 20 }} />
				</button>

				{isSelected ? (
					<>
						<button
							className="select_summary_note_off_btn"
							onClickCapture={handleUnselectBtnOnClick}
						>
							<CheckCircleIcon sx={{ fontSize: 35, color: '#81C7E4' }} />
						</button>
						<div
							className="select_outline"
							onClick={(e) => {
								e.stopPropagation();
							}}
						></div>
					</>
				) : (
					<button
						className="select_summary_note_on_btn"
						onClickCapture={handleSelectBtnOnClick}
					>
						<CheckCircleOutlineIcon sx={{ fontSize: 35, color: '#81C7E4' }} />
					</button>
				)}
			</div>
		</article>
	);
};

SummaryNote.propTypes = {
	note: PropTypes.object,
};

export default SummaryNote;
