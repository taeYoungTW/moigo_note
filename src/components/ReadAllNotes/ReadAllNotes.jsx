import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import SummaryNote from './SummaryNote';
import './ReadAllNotes.scss';
import DetailNote from '../ReadNote/DetailNote';
import Confirm from '../Common/Confirm';

const ReadAllNotes = () => {
	const { allNotes, detailNote, confirmNoteIdtoDelete } = useAppState();
	const { deleteNote, setConfirmNoteIdtoDelete, offDetailNote } =
		useAppAction();

	function deleteCurrentNote() {
		setConfirmNoteIdtoDelete('');
		deleteNote(confirmNoteIdtoDelete);
		offDetailNote();
	}

	return (
		<section className="summary_notes_ctnr">
			{allNotes.map((note) => (
				<SummaryNote note={note} key={note.id} />
			))}
			{detailNote?.id && <DetailNote />}
			<Confirm
				isConfirmOn={confirmNoteIdtoDelete}
				setIsConfirmOn={setConfirmNoteIdtoDelete}
				question="선택한 노트를 삭제하시겠습니까?"
				offConfirmBtnName="취소"
			>
				<button type="button" onClick={deleteCurrentNote}>
					삭제
				</button>
			</Confirm>
		</section>
	);
};

export default ReadAllNotes;
