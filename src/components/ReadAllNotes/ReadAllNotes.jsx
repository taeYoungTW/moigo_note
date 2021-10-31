import { useAppState } from '../../contexts/AppStateContext';
import SummaryNote from './SummaryNote';
import './ReadAllNotes.scss';
import DetailNote from '../ReadNote/DetailNote';

const ReadAllNotes = () => {
	// Global States, Actions ---------------------------------------
	const { _allNotes, _detailNote } = useAppState();

	// Render -----------------------------------------------
	return (
		<section className="summary_notes_ctnr">
			{_allNotes.map((note) => (
				<SummaryNote note={note} key={note.id} />
			))}
			{_detailNote?.id && <DetailNote />}
		</section>
	);
};

export default ReadAllNotes;
