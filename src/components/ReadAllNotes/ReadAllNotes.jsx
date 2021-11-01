import { useAppState } from '../../contexts/AppStateContext';
import SummaryNote from '../SummaryNote/SummaryNote';
import './ReadAllNotes.scss';
import ModalNote from '../ModalNote/ModalNote';

const ReadAllNotes = () => {
	// Global States, Actions ---------------------------------------
	const { _allNotes, _modalNote } = useAppState();

	// Render -----------------------------------------------
	return (
		<section className="read_all_notes">
			{_allNotes.map((note) => (
				<SummaryNote note={note} key={note.id} />
			))}
			{_modalNote?.id && <ModalNote />}
		</section>
	);
};

export default ReadAllNotes;
