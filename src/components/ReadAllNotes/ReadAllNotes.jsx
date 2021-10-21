import { useAppState } from '../../contexts/AppStateContext';
import SummaryNote from './SummaryNote';
import './ReadAllNotes.scss';

const ReadAllNotes = () => {
	const { allNotes } = useAppState();
	return (
		<section className="summary_notes_ctnr">
			{allNotes.map((note) => (
				<SummaryNote note={note} key={note.id} />
			))}
		</section>
	);
};

export default ReadAllNotes;
