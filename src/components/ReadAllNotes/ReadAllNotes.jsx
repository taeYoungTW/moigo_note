import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import './ReadAllNotes.scss';
import DnDGridNoteHOC from '../DnDGridNoteHOC/DnDGridNoteHOC';
import { useCallback } from 'react';
import SummaryNote from '../SummaryNote/SummaryNote';

const ReadAllNotes = () => {
	// Global States, Actions ---------------------------------------
	const { _allNotes } = useAppState();
	const { _setNotes } = useAppAction();

	const moveNotes = useCallback(
		(dragIndex, hoverIndex) => {
			const newNotes = [..._allNotes];
			const [draggedNote] = newNotes.splice(dragIndex, 1);
			newNotes.splice(hoverIndex, 0, draggedNote);
			_setNotes(newNotes);
		},
		[_allNotes, _setNotes]
	);
	// Render -----------------------------------------------
	return (
		<section className="read_all_notes">
			{_allNotes.map((note, i) => (
				<DnDGridNoteHOC
					key={note.id}
					id={note.id}
					index={i}
					moveNotes={moveNotes}
					Component={SummaryNote}
					note={note}
				/>
			))}
		</section>
	);
};

export default ReadAllNotes;
