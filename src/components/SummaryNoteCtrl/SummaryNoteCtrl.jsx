import { useCallback, useState } from 'react';
import { DO_YOU_WANT_TO_DELETE_SELECTED_NOTES_TEXT } from '../../constants/constants';
import { SUMMARY_NOTE_DELETE_ICON_STYLE } from '../../constants/iconStyles';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import DeleteBtn from '../Common/DeleteBtn';
import PortalConfirm from '../PortalConfirm/PortalConfirm';
import SelectNote from '../SelectNote/SelectNote';

const SummaryNoteCtrl = ({ note }) => {
	// Global States & Actions --------------
	const { _deleteSelectedNoteId, _deleteNote } = useAppAction();
	const { _selectedNoteIds } = useAppState();
	// Local States --------------------------
	const [isConfirmOn, setIsConfirmOn] = useState(false);
	// Event Handler ----------------------------------------------
	const handleDeleteBtnOnClick = useCallback((e) => {
		e.stopPropagation();
		setIsConfirmOn(true);
	}, []);

	// Function ----------------------------
	const confirmCallback = () => {
		const id = note.id;
		_deleteNote(id);
		const isSelected = _selectedNoteIds.includes(id);
		if (isSelected) {
			_deleteSelectedNoteId(id);
		}
	};
	return (
		<div className="ctrl_area">
			<DeleteBtn
				className="del_summary_note_btn"
				handleDeleteBtnOnClick={handleDeleteBtnOnClick}
				style={SUMMARY_NOTE_DELETE_ICON_STYLE}
			/>
			<SelectNote noteId={note.id} />
			<PortalConfirm
				question={DO_YOU_WANT_TO_DELETE_SELECTED_NOTES_TEXT}
				isConfirmOn={isConfirmOn}
				setIsConfirmOn={setIsConfirmOn}
				confirmCallback={confirmCallback}
			/>
		</div>
	);
};

export default SummaryNoteCtrl;
