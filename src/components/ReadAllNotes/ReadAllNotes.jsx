import { useAppState } from '../../contexts/AppStateContext';
import SummaryNote from './SummaryNote';
import './ReadAllNotes.scss';
import DetailNote from '../ReadNote/DetailNote';

const ReadAllNotes = () => {
	const { allNotes, detailNote } = useAppState();
	return (
		<section className="summary_notes_ctnr">
			{allNotes.map((note) => (
				<SummaryNote note={note} key={note.id} />
			))}
			{detailNote?.id && <DetailNote />}
		</section>
	);
};

export default ReadAllNotes;
