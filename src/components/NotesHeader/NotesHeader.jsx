import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './NotesHeader.scss';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import { useCallback, useState } from 'react';
import {
	COUNT_OF_SELECTED_NOTE_TEXT,
	DO_YOU_WANT_TO_DELETE_SLECTED_NOTES_TEXT,
} from '../../constants/constants';
import DeleteBtn from '../Common/DeleteBtn';
import {
	HEADER_ARROWBACK_ICON_STYLE,
	HEADER_DELETE_ICON_STYLE,
} from '../../constants/iconStyles';
import PortalConfirm from '../PortalConfirm/PortalConfirm';

const NotesHeader = () => {
	// Global States, Actions ---------------------------------------
	const { _selectedNoteIds } = useAppState();
	const { _deleteNotes, _resetSelectedNoteIds } = useAppAction();

	// Local States ------------------------------------------------
	const [isConfirmOn, setIsConfirmOn] = useState(false);

	// Event Handler ----------------------------------------------
	const handleDeleteBtnOnClick = useCallback(() => {
		setIsConfirmOn(true);
	}, []);

	const confirmCallback = useCallback(() => {
		_deleteNotes(_selectedNoteIds);
		_resetSelectedNoteIds();
	}, [_selectedNoteIds, _deleteNotes, _resetSelectedNoteIds]);

	// Render ------------------------------------------------------
	return (
		<>
			<div className="align_left">
				<button className="cancel_btn" onClick={_resetSelectedNoteIds}>
					<ArrowBackIcon sx={HEADER_ARROWBACK_ICON_STYLE} />
				</button>
				<h2 className="selected_note_count">
					{_selectedNoteIds.length}
					{COUNT_OF_SELECTED_NOTE_TEXT}
				</h2>
			</div>
			<DeleteBtn
				className="delete_btn"
				handleDeleteBtnOnClick={handleDeleteBtnOnClick}
				style={HEADER_DELETE_ICON_STYLE}
			/>
			<PortalConfirm
				question={DO_YOU_WANT_TO_DELETE_SLECTED_NOTES_TEXT}
				isConfirmOn={isConfirmOn}
				setIsConfirmOn={setIsConfirmOn}
				confirmCallback={confirmCallback}
			/>
		</>
	);
};

export default NotesHeader;
