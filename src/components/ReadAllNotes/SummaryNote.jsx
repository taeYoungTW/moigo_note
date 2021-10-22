import './SummaryNote.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import { useEffect, useState } from 'react';

const SummaryNote = ({ note }) => {
	// Global States
	const { deleteNote, selectNoteId, deleteNoteId, onDetailNote } =
		useAppAction();
	const { selectedNoteIds } = useAppState();

	// Local States
	const [isSelected, setIsSelected] = useState(
		selectedNoteIds.includes(note.id)
	); // false로 해야하나 고민

	// Functions
	// Delete Current Note
	function delCurrentNote() {
		deleteNote(note.id);

		const isSelected = selectedNoteIds.includes(note.id);
		if (isSelected) {
			deleteNoteId(note.id);
		}
	}

	// Select A Note
	function selectOnCurrentNoteId() {
		setIsSelected(true);
		selectNoteId(note.id);
	}

	function selectOffCurrentNoteId() {
		setIsSelected(false);
		deleteNoteId(note.id);
	}

	// For Cancel Selection (Update Note Outline)
	useEffect(() => {
		setIsSelected(selectedNoteIds.includes(note.id));
	}, [selectedNoteIds, note]);

	return (
		<article
			className="summary_note"
			onClick={() => {
				onDetailNote(note);
			}}
		>
			<div className="summary_area">
				{note.title && <h1 className="summary_title">{note.title}</h1>}
			</div>
			<div className="ctrl_area">
				<button
					className="del_summary_note_btn"
					onClickCapture={delCurrentNote}
				>
					<DeleteIcon sx={{ fontSize: 20 }} />
				</button>
				{isSelected ? (
					<>
						<button
							className="select_summary_note_off_btn"
							onClickCapture={selectOffCurrentNoteId}
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
						onClickCapture={selectOnCurrentNoteId}
					>
						<CheckCircleOutlineIcon sx={{ fontSize: 35, color: '#81C7E4' }} />
					</button>
				)}
			</div>
		</article>
	);
};

export default SummaryNote;
