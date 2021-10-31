import './SummaryNote.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReadTextBlock from '../ReadBlocks/ReadTextBlock';
import ReadChecklistBlock from '../ReadBlocks/ReadChecklistBlock';
import PortalConfirm from '../Common/PortalConfirm';

const SummaryNote = ({ note }) => {
	// Global States & Actions --------------
	const {
		_addSelectedNoteId,
		_deleteSelectedNoteId,
		_setDetailNote,
		_deleteNote,
	} = useAppAction();
	const { _selectedNoteIds } = useAppState();

	// Local States --------------------------
	const [isSelected, setIsSelected] = useState(
		_selectedNoteIds.includes(note.id)
	); // false로 해야하나 고민
	const [isConfirmOn, setIsConfirmOn] = useState(false);

	// Event Handler ----------------------------------------------
	const handleMoveToConfirmOnClick = useCallback((e) => {
		e.stopPropagation();
		setIsConfirmOn(true);
	}, []);

	const handleDeleteConfirmBtnOnClick = () => {
		const id = note.id;
		setIsConfirmOn(false);
		_deleteNote(id);
		const isSelected = _selectedNoteIds.includes(id);
		if (isSelected) {
			_deleteSelectedNoteId(id);
		}
		// CreatePortal: modal 사용 -> 전체 rerendering X , 효율적
	};

	// Select or Unselect A SummaryNote
	/* 
	- 통합 필요 여지 O
	*/
	const handleSelectBtnOnClick = useCallback(() => {
		setIsSelected(true);
		_addSelectedNoteId(note.id);
	}, [_addSelectedNoteId, note]);

	const handleUnselectBtnOnClick = useCallback(() => {
		setIsSelected(false);
		_deleteSelectedNoteId(note.id);
	}, [_deleteSelectedNoteId, note]);

	//---- useEffect ---- For Cancel Selection (Update Note Outline)
	useEffect(() => {
		setIsSelected(_selectedNoteIds.includes(note.id));
	}, [_selectedNoteIds, note]);

	// Render -------------------------------------------
	return (
		<article
			className="summary_note"
			onClick={() => {
				_setDetailNote(note);
			}}
		>
			<div className="summary_area">
				{note.title && <h1 className="summary_title">{note.title}</h1>}
				{note.blocks &&
					note.blocks.map((block) => {
						switch (block.type) {
							case 'text':
								return (
									<ReadTextBlock
										block={block}
										key={block.id}
										isDetail={false}
									/>
								);
							case 'checklist':
								return (
									<ReadChecklistBlock
										block={block}
										key={block.id}
										noteId={note.id}
										isDetail={false}
									/>
								);
							default:
								return new Error('Error: Read Block');
						}
					})}
			</div>
			<div className="ctrl_area">
				<button
					className="del_summary_note_btn"
					onClickCapture={handleMoveToConfirmOnClick}
				>
					<DeleteIcon sx={{ fontSize: 20 }} />
				</button>

				{isSelected ? (
					<>
						{/* 식별자명 수정 필요 */}
						<button
							className="select_summary_note_off_btn"
							onClickCapture={handleUnselectBtnOnClick}
						>
							<CheckCircleIcon sx={{ fontSize: 35, color: '#81C7E4' }} />
						</button>
						<div
							className="select_outline"
							onClick={(e) => {
								e.stopPropagation();
							}}
						></div>
					</>
				) : (
					<button
						className="select_summary_note_on_btn"
						onClickCapture={handleSelectBtnOnClick}
					>
						<CheckCircleOutlineIcon sx={{ fontSize: 35, color: '#81C7E4' }} />
					</button>
				)}
			</div>
			<PortalConfirm
				question="선택한 노트를 삭제하시겠습니까?"
				isConfirmOn={isConfirmOn}
				setIsConfirmOn={setIsConfirmOn}
				confirmCallback={handleDeleteConfirmBtnOnClick}
			/>
		</article>
	);
};

SummaryNote.propTypes = {
	note: PropTypes.object,
};

export default SummaryNote;
