import { useAppState } from '../../contexts/AppStateContext';
import './ReadAllNotes.scss';
import DnDGridNoteHOC from '../DnDGridNoteHOC/DnDGridNoteHOC';
import SummaryNote from '../SummaryNote/SummaryNote';

const ReadAllNotes = () => {
	// Global States, Actions ---------------------------------------
	const { _allNotes } = useAppState();

	// Render -----------------------------------------------
	return (
		<section className="read-all-notes">
			{_allNotes.map((note, i) => (
				<DnDGridNoteHOC
					key={note.id}
					id={note.id}
					index={i}
					Component={SummaryNote}
					note={note}
				/>
			))}
		</section>
	);
};

export default ReadAllNotes;
