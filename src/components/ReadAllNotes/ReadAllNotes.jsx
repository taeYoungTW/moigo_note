import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import SummaryNote from './SummaryNote';
import './ReadAllNotes.scss';
import DetailNote from '../ReadNote/DetailNote';
import Confirm from '../Common/Confirm';

const ReadAllNotes = () => {
	const { _allNotes, _detailNote, _confirmNoteIdToDelete, _selectedNoteIds } =
		useAppState();
	const {
		_deleteNote,
		_setConfirmNoteIdToDelete,
		_resetDetailNote,
		_deleteSelectedNoteId,
	} = useAppAction();

	function deleteCurrentNote() {
		const id = _confirmNoteIdToDelete;
		_setConfirmNoteIdToDelete('');
		_deleteNote(id);
		const isSelected = _selectedNoteIds.includes(id);
		if (isSelected) {
			_deleteSelectedNoteId(id);
		}
		_resetDetailNote();
	}

	return (
		<section className="summary_notes_ctnr">
			{_allNotes.map((note) => (
				<SummaryNote note={note} key={note.id} />
			))}
			{_detailNote?.id && <DetailNote />}
			<Confirm
				isConfirmOn={_confirmNoteIdToDelete}
				setIsConfirmOn={_setConfirmNoteIdToDelete}
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
