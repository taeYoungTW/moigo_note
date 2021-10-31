import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './NotesHeader.scss';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import { useCallback, useState } from 'react';
import PortalConfirm from '../Common/PortalConfirm';

const NotesHeader = () => {
	// Global States, Actions ---------------------------------------
	const { _selectedNoteIds } = useAppState();
	const { _deleteNotes, _resetSelectedNoteIds } = useAppAction();

	// Local States ------------------------------------------------
	const [isConfirmOn, setIsConfirmOn] = useState(false);

	// Event Handler ----------------------------------------------
	const handleDeleteConfirmBtnOnClick = useCallback(() => {
		_deleteNotes(_selectedNoteIds);
		_resetSelectedNoteIds();
		setIsConfirmOn(false);
	}, [_selectedNoteIds, _deleteNotes, _resetSelectedNoteIds]);

	const handleMoveToConfirmOnClick = useCallback(() => {
		setIsConfirmOn(true);
	}, []);

	// Render ------------------------------------------------------
	return (
		<header className="note_header">
			<div className="header_fixed">
				<div className="align_left">
					<button className="cancel_btn" onClick={_resetSelectedNoteIds}>
						<ArrowBackIcon sx={{ fontSize: 19, color: '#767676' }} />
					</button>
					<h2 className="selected_note_count">
						{_selectedNoteIds.length}개 선택됨
					</h2>
				</div>
				<button className="delete_btn" onClick={handleMoveToConfirmOnClick}>
					<DeleteIcon sx={{ fontSize: 19, color: '#767676' }} />
				</button>
			</div>
			<PortalConfirm
				question={'선택한 노트를 삭제하시겠습니까?'}
				isConfirmOn={isConfirmOn}
				setIsConfirmOn={setIsConfirmOn}
				confirmCallback={handleDeleteConfirmBtnOnClick}
			/>
		</header>
	);
};

export default NotesHeader;
