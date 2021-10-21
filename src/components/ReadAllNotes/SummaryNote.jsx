import './SummaryNote.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import { useState } from 'react';

const SummaryNote = ({ note }) => {
	const { deleteNote, selectNoteId, deleteNoteId } = useAppAction();
	const { selectedNoteIds } = useAppState();

	const [isSelected, setIsSelected] = useState(false);

	// Delete Current Note
	function delCurrentNote() {
		deleteNote(note.id);

		const isSelected = selectedNoteIds.includes(note.id);
		if (isSelected) {
			deleteNoteId(note.id);
		}
	}

	// Selection
	function selectOnCurrentNoteId() {
		setIsSelected(true);
		selectNoteId(note.id);
	}

	function selectOffCurrentNoteId() {
		setIsSelected(false);
		deleteNoteId(note.id);
	}

	return (
		<article className="summary_note">
			<div className="summary_area">
				{note.title && <h1 className="summary_title">{note.title}</h1>}
			</div>
			<div className="ctrl_area">
				<button className="del_summary_note_btn" onClick={delCurrentNote}>
					<DeleteIcon sx={{ fontSize: 20 }} />
				</button>
				{isSelected ? (
					<>
						<button
							className="select_summary_note_off_btn"
							onClick={selectOffCurrentNoteId}
						>
							<CheckCircleIcon sx={{ fontSize: 35, color: '#81C7E4' }} />
						</button>
						<div className="select_outline"></div>
					</>
				) : (
					<button
						className="select_summary_note_on_btn"
						onClick={selectOnCurrentNoteId}
					>
						<CheckCircleOutlineIcon sx={{ fontSize: 35, color: '#81C7E4' }} />
					</button>
				)}
			</div>
		</article>
	);
};

export default SummaryNote;
