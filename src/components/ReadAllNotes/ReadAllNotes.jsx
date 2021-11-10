import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import './ReadAllNotes.scss';
import ModalNote from '../ModalNote/ModalNote';
import DnDGridNoteHOC from '../DnDGridNoteHOC/DnDGridNoteHOC';
import { useCallback } from 'react';
import SummaryNote from '../SummaryNote/SummaryNote';

const ReadAllNotes = () => {
	// Global States, Actions ---------------------------------------
	const { _allNotes, _modalNote } = useAppState();
	const { _setNotes } = useAppAction();
	const moveNotes = useCallback(
		(dragIndex, hoverIndex) => {
			const newNotes = [..._allNotes];
			const [dragedNote] = newNotes.splice(dragIndex, 1);
			newNotes.splice(hoverIndex, 0, dragedNote);
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
			{_modalNote?.id && <ModalNote />}
		</section>
	);
};

export default ReadAllNotes;
