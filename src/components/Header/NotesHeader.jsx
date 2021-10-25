import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './NotesHeader.scss';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import Confirm from '../Common/Confirm';
import { useState } from 'react';
const NotesHeader = () => {
	const { selectedNoteIds } = useAppState();
	const { deleteNotes, cancelSelect } = useAppAction();
	const [isConfirmOn, setIsConfirmOn] = useState('');

	function deleteSelectedNotes() {
		deleteNotes(selectedNoteIds);
		setIsConfirmOn('');
	}
	return (
		<header className="note_header">
			<div className="header_fixed">
				<div className="align_left">
					<button className="cancel_btn" onClick={cancelSelect}>
						<ArrowBackIcon sx={{ fontSize: 19, color: '#767676' }} />
					</button>
					<h2 className="selected_note_count">
						{selectedNoteIds.length}개 선택됨
					</h2>
				</div>
				<button
					className="delete_btn"
					onClick={() => {
						setIsConfirmOn('true');
					}}
				>
					<DeleteIcon sx={{ fontSize: 19, color: '#767676' }} />
				</button>
			</div>
			<Confirm
				question={'선택한 노트를 삭제하시겠습니까?'}
				offConfirmBtnName="취소"
				isConfirmOn={isConfirmOn}
				setIsConfirmOn={setIsConfirmOn}
			>
				<button type="button" onClick={deleteSelectedNotes}>
					삭제
				</button>
			</Confirm>
		</header>
	);
};

export default NotesHeader;
