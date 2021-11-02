import CloseIcon from '@mui/icons-material/Close';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import AddBtn from '../Common/AddBtn';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import './UpdateNote.scss';
import { useCallback, useEffect, useState } from 'react';
import {
	COMPLETE_TEXT,
	MODAL_NOTE_CLOSE_ICON_COLOR,
	MODAL_NOTE_CLOSE_ICON_FONT_SIZE,
	TITLE_TEXT,
} from '../../constants/constants';
import { filterEmptyTextBlock } from '../../utils/filterEmptyTextBlock';
import CreateContent from '../CreateContent/CreateContent';
import useAddBlock from '../../hooks/useAddBlock';
import useAddDefaultBlock from '../../hooks/useAddDefaultBlock';

const UpdateNote = () => {
	// Global States, Actions ---------------------------------------
	const { _blocks, _modalNote } = useAppState();
	const { _resetModalNote, _updateNote, _initBlocks, _resetBlocks, _addBlock } =
		useAppAction();

	// Local States ------------------------------------------------
	const [note, setNote] = useState(_modalNote);

	// Event Handler ----------------------------------------------
	const handleUpdateNoteBtnOnClick = useCallback(() => {
		const filteredBlocks = filterEmptyTextBlock(_blocks);
		_updateNote({ ...note, blocks: [...filteredBlocks] });
	}, [_updateNote, note, _blocks]);

	const handleTitleInputOnChange = useCallback((e) => {
		const { value } = e.target;
		setNote((note) => ({ ...note, title: value }));
	}, []);

	const handleAddBlockBtnOnClick = useAddBlock(_addBlock); // hooks로 재사용 관리

	// useEffects ------------------------------------------------------
	useAddDefaultBlock(handleAddBlockBtnOnClick, _blocks.length); // hooks로 재사용 관리

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
						<CloseIcon
							sx={{
								fontSize: MODAL_NOTE_CLOSE_ICON_FONT_SIZE,
								color: MODAL_NOTE_CLOSE_ICON_COLOR,
							}}
						/>
					</button>
				</div>
				<CreateContent blocks={_blocks} isUpdateNote={true} />
				<div className="ctrl_bar">
					<div className="add_btns">
						<AddBtn Icon={InsertPhotoIcon} />
						<AddBtn
							Icon={FormatListBulletedIcon}
							eventHandler={() => {
								handleAddBlockBtnOnClick('checklist');
							}}
						/>
						<AddBtn
							Icon={TextFieldsIcon}
							eventHandler={() => {
								handleAddBlockBtnOnClick('text');
							}}
						/>
					</div>
					<button
						type="button"
						onClick={handleUpdateNoteBtnOnClick}
						className="update_submit_btn"
					>
						{COMPLETE_TEXT}
					</button>
				</div>
			</div>
		</>
	);
};

export default UpdateNote;
