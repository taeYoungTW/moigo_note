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
import useError from '../../hooks/useError';
import {
	DO_YOU_WANT_TO_DELETE_SLECTED_NOTES_TEXT,
	SUMMARY_NOTE_CHECKCIRCLE_ICON_COLOR,
	SUMMARY_NOTE_CHECKCIRCLE_ICON_FONT_SIZE,
	SUMMARY_NOTE_DELETE_ICON_FONT_SIZE,
} from '../../constants/constants';

const SummaryNote = ({ note }) => {
	// Global States & Actions --------------
	const {
		_addSelectedNoteId,
		_deleteSelectedNoteId,
		_setModalNote,
		_deleteNote,
	} = useAppAction();
	const { _selectedNoteIds } = useAppState();

	// Hooks ---------------------------------
	const _setUseError = useError();

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
				_setModalNote(note);
			}}
		>
			<div className="summary_area">
				{note.title && <h1 className="summary_title">{note.title}</h1>}
				{note?.blocks?.map((block) => {
					switch (block.type) {
						case 'text':
							return (
								<ReadTextBlock block={block} key={block.id} isDetail={false} />
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
							_setUseError({
								message: 'Detected invalid Type of blocks!',
								location: 'SummaryNote/summary_area_el/switch',
							});
							return <></>;
					}
				})}
			</div>
			<div className="ctrl_area">
				<button
					className="del_summary_note_btn"
					onClickCapture={handleMoveToConfirmOnClick}
				>
					<DeleteIcon sx={{ fontSize: SUMMARY_NOTE_DELETE_ICON_FONT_SIZE }} />
				</button>

				{isSelected ? (
					<>
						{/* 식별자명 수정 필요 */}
						<button
							className="select_summary_note_off_btn"
							onClickCapture={handleUnselectBtnOnClick}
						>
							<CheckCircleIcon
								sx={{
									fontSize: SUMMARY_NOTE_CHECKCIRCLE_ICON_FONT_SIZE,
									color: SUMMARY_NOTE_CHECKCIRCLE_ICON_COLOR,
								}}
							/>
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
						<CheckCircleOutlineIcon
							sx={{
								fontSize: SUMMARY_NOTE_CHECKCIRCLE_ICON_FONT_SIZE,
								color: SUMMARY_NOTE_CHECKCIRCLE_ICON_COLOR,
							}}
						/>
					</button>
				)}
			</div>
			<PortalConfirm
				question={DO_YOU_WANT_TO_DELETE_SLECTED_NOTES_TEXT}
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
