import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import SummaryNote from './SummaryNote';
import './ReadAllNotes.scss';
import DetailNote from '../ReadNote/DetailNote';
import Confirm from '../Common/Confirm';
import { useCallback } from 'react';

const ReadAllNotes = () => {
	// Global States, Actions ---------------------------------------
	const { _allNotes, _detailNote, _confirmNoteIdToDelete, _selectedNoteIds } =
		useAppState();
	const {
		_deleteNote,
		_setConfirmNoteIdToDelete,
		_resetDetailNote,
		_deleteSelectedNoteId,
	} = useAppAction();

	// Event Handler ----------------------------------------------
	/* - hanldeDeleteConfirmBtnOn
	 * 해당 이벤트는 SummaryNote, DetailNote의 Confirm 컴포넌트의 삭제에서 공유하여 모두 사용됩니다.
	 * _setConfirmNoteIdToDelete를 통해 기존의 지울 id 메모리를 초기화 합니다.
	 * _deleteNote를 통해 해당 id의 note를 _allNotes에서 삭제합니다.
	 * 지우려는 note의 id가 _selectedNoteIds에 있는 경우에도 삭제 시킵니다.
	 * DetailNote에서 삭제 요청을 하여 _detailNote가 값을 가지는 경우에 초기화 시킵니다.
	 */
	const handleDeleteConfirmBtnOnClick = useCallback(() => {
		const id = _confirmNoteIdToDelete;
		_setConfirmNoteIdToDelete('');
		_deleteNote(id);
		const isSelected = _selectedNoteIds.includes(id);
		if (isSelected) {
			_deleteSelectedNoteId(id);
		}
		if (_detailNote.id) {
			_resetDetailNote();
		}
	}, [
		_confirmNoteIdToDelete,
		_setConfirmNoteIdToDelete,
		_deleteNote,
		_selectedNoteIds,
		_deleteSelectedNoteId,
		_resetDetailNote,
		_detailNote,
	]);

	// Render -----------------------------------------------
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
				<button type="button" onClick={handleDeleteConfirmBtnOnClick}>
					삭제
				</button>
			</Confirm>
		</section>
	);
};

export default ReadAllNotes;
