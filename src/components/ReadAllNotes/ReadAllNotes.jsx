import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import './ReadAllNotes.scss';
import ModalNote from '../ModalNote/ModalNote';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DnDGridNote from '../DnDGridNote/DnDGridNote';
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
			<DndProvider backend={HTML5Backend}>
				{_allNotes.map((note, i) => (
					<DnDGridNote
						key={note.id}
						id={note.id}
						index={i}
						moveNotes={moveNotes}
						Component={SummaryNote}
						note={note}
					/>
				))}
				{_modalNote?.id && <ModalNote />}
			</DndProvider>
		</section>
	);
};

export default ReadAllNotes;
