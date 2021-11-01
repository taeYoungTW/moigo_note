import './DetailNote.scss';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import { useCallback, useState } from 'react';
import ReadChecklistBlock from '../ReadBlocks/ReadChecklistBlock';
import ReadTextBlock from '../ReadBlocks/ReadTextBlock';
import PortalConfirm from '../Common/PortalConfirm';
import useError from '../../hooks/useError';
import {
	DETAIL_NOTE_DELETE_ICON_COLOR,
	DETAIL_NOTE_DELETE_ICON_FONT_SIZE,
	DO_YOU_WANT_TO_DELETE_SLECTED_NOTES_TEXT,
	INVALID_BLOCK_TYPE_TEXT,
	MODAL_NOTE_CLOSE_ICON_COLOR,
	MODAL_NOTE_CLOSE_ICON_FONT_SIZE,
} from '../../constants/constants';

const DetailNote = ({ setIsEdit }) => {
	// Global States, Actions ---------------------------------------
	const { _modalNote } = useAppState();
	const { _resetModalNote, _deleteNote } = useAppAction();

	// Hooks ---------------------------------
	const _setUseError = useError();

	// Local States ------------------------------------------------
	const [isConfirmOn, setIsConfrimOn] = useState(false);
	// Event Handler ----------------------------------------------
	const handleMoveToConfirmOnClick = useCallback(() => {
		setIsConfrimOn(true);
	}, []);

	const handleSetEditBtnOnClick = useCallback(() => {
		setIsEdit(true);
	}, [setIsEdit]);

	const handleConfirmBtnOnClick = () => {
		const id = _modalNote.id;
		_deleteNote(id);
		_resetModalNote();
		setIsConfrimOn(false);
	};

	// Render -------------------------------------------------------
	return (
		<>
			<div className="detail_note">
				<div className="title_ctnr">
					<h1 className="title">{_modalNote.title}</h1>
					<button className="close_btn" onClick={_resetModalNote}>
						<CloseIcon
							sx={{
								fontSize: MODAL_NOTE_CLOSE_ICON_FONT_SIZE,
								color: MODAL_NOTE_CLOSE_ICON_COLOR,
							}}
						/>
					</button>
				</div>
				<div className="detailNote_content">
					{_modalNote?.blocks?.map((block) => {
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
										noteId={_modalNote.id}
										isDetail={true}
									/>
								);
							default:
								_setUseError({
									message: INVALID_BLOCK_TYPE_TEXT,
									location: 'DetailNote/detailNote_content_el/switch',
								});
								return <></>;
						}
					})}
				</div>
				<div className="ctrl_bar">
					<button className="delete_btn" onClick={handleMoveToConfirmOnClick}>
						<DeleteIcon
							sx={{
								fontSize: DETAIL_NOTE_DELETE_ICON_FONT_SIZE,
								color: DETAIL_NOTE_DELETE_ICON_COLOR,
							}}
						/>
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
				question={DO_YOU_WANT_TO_DELETE_SLECTED_NOTES_TEXT}
				isConfirmOn={isConfirmOn}
				setIsConfirmOn={setIsConfrimOn}
				confirmCallback={handleConfirmBtnOnClick}
			/>
		</>
	);
};

export default DetailNote;
