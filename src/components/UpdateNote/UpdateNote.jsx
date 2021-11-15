import CloseIcon from '@mui/icons-material/Close';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import './UpdateNote.scss';
import { useCallback, useEffect, useState } from 'react';
import { COMPLETE_TEXT, TITLE_TEXT } from '../../constants/constants';
import { emptyTextBlockFilter } from '../../utils/emptyTextBlockFilter';
import CreateContent from '../CreateContent/CreateContent';
import { MODAL_NOTE_CLOSE_ICON_STYLE } from '../../constants/iconStyles';
import CreateCtrlBar from '../CreateCtrlBar/CreateCtrlBar';

const UpdateNote = () => {
	// Global States, Actions ---------------------------------------
	const { _blocks, _modalNote } = useAppState();
	const { _resetModalNote, _updateNote, _initBlocks, _resetBlocks } =
		useAppAction();

	// Local States ------------------------------------------------
	const [note, setNote] = useState(_modalNote);

	// Event Handler ----------------------------------------------
	const handleUpdateNoteBtnOnClick = useCallback(() => {
		const filteredBlocks = emptyTextBlockFilter(_blocks);
		_updateNote({ ...note, blocks: [...filteredBlocks] });
	}, [_updateNote, note, _blocks]);

	const handleTitleInputOnChange = useCallback((e) => {
		const { value } = e.target;
		setNote((note) => ({ ...note, title: value }));
	}, []);

	// useEffects ------------------------------------------------------

	useEffect(() => {
		_initBlocks([..._modalNote.blocks]);

		return () => {
			_resetBlocks();
		};
	}, [_modalNote, _initBlocks, _resetBlocks]);

	return (
		<>
			<div className="update_note">
				<div className="title">
					<input
						type="text"
						className="title_input"
						value={note.title}
						placeholder={TITLE_TEXT}
						onChange={handleTitleInputOnChange}
					/>
					<button className="close_btn" onClick={_resetModalNote}>
						<CloseIcon sx={MODAL_NOTE_CLOSE_ICON_STYLE} />
					</button>
				</div>
				<CreateContent blocks={_blocks} isUpdateNote={true} />
				<CreateCtrlBar
					handleSubmitBtnOnClick={handleUpdateNoteBtnOnClick}
					submitBtnName={COMPLETE_TEXT}
					isUpdate
				/>
			</div>
		</>
	);
};

export default UpdateNote;
