import { useAppState } from '../../contexts/AppStateContext';
import './ReadAllNotes.scss';
import SummaryNote from '../SummaryNote/SummaryNote';
import DragNoteLayer from '../DragNoteLayer/DragNoteLayer';

const ReadAllNotes = () => {
	// Global States, Actions ---------------------------------------
	const { _allNotes } = useAppState();

	// Render -----------------------------------------------
	return (
		<section className="read-all-notes">
			{_allNotes.map((note, i) => (
				<SummaryNote key={note.id} index={i} note={note} />
			))}
			<DragNoteLayer />
		</section>
	);
};

export default ReadAllNotes;
