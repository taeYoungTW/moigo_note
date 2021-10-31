import './DetailNote.scss';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import { useCallback, useState } from 'react';
import UpdateNote from '../UpdateNote/UpdateNote';
import ReadChecklistBlock from '../ReadBlocks/ReadChecklistBlock';
import ReadTextBlock from '../ReadBlocks/ReadTextBlock';
import PortalConfirm from '../Common/PortalConfirm';

const DetailNote = () => {
	// Global States, Actions ---------------------------------------
	const { _detailNote } = useAppState();
	const { _resetDetailNote, _deleteNote } = useAppAction();

	// Local States ------------------------------------------------
	const [isEdit, setIsEdit] = useState(false);
	const [isConfirmOn, setIsConfrimOn] = useState(false);
	// Event Handler ----------------------------------------------
	const handleMoveToConfirmOnClick = useCallback(() => {
		setIsConfrimOn(true);
	}, []);

	const handleSetEditBtnOnClick = useCallback(() => {
		setIsEdit(true);
	}, []);

	const handleConfirmBtnOnClick = () => {
		const id = _detailNote.id;
		_deleteNote(id);
		_resetDetailNote();
		setIsConfrimOn(false);
	};

	// Render -------------------------------------------------------
	return isEdit ? (
		<UpdateNote />
	) : (
		<div className="detail_note_ctnr">
			<div className="detail_note">
				<div className="title_ctnr">
					<h1 className="title">{_detailNote.title}</h1>
					<button className="close_btn" onClick={_resetDetailNote}>
						<CloseIcon sx={{ fontSize: 25, color: '#767676' }} />
					</button>
				</div>
				<div className="detailNote_content">
					{_detailNote?.blocks?.map((block) => {
						switch (block.type) {
							case 'text':
								return (
									<ReadTextBlock block={block} key={block.id} isDetail={true} />
								);
							case 'checklist':
								return (
									<ReadChecklistBlock
										block={block}
										key={`DetailNote_${block.id}`}
										noteId={_detailNote.id}
										isDetail={true}
									/>
								);
							default:
								return <></>; // new Error('Error: Read Block') 에러 컴포넌트 필요!
						}
					})}
				</div>
				<div className="ctrl_bar">
					<button className="delete_btn" onClick={handleMoveToConfirmOnClick}>
						<DeleteIcon sx={{ fontSize: 23, color: '#2a394b' }} />
					</button>
					<button
						type="button"
						onClick={handleSetEditBtnOnClick}
						className="edit_btn"
					>
						수정
					</button>
				</div>
			</div>
			<PortalConfirm
				question="선택한 노트를 삭제하시겠습니까?"
				isConfirmOn={isConfirmOn}
				setIsConfirmOn={setIsConfrimOn}
				confirmCallback={handleConfirmBtnOnClick}
			/>
		</div>
	);
};

export default DetailNote;
