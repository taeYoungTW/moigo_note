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
} from '../../constants/constants';
import { filterEmptyTextBlock } from '../../utils/filterEmptyTextBlock';
import { v4 as uuid } from 'uuid';
import CreateContent from '../CreateContent/CreateContent';

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

	const handleAddBlockBtnOnClick = useCallback(
		(type) => {
			switch (type) {
				case 'text':
					_addBlock({ id: uuid(), type, text: '' });
					break;
				case 'checklist':
					_addBlock({
						id: uuid(),
						type,
						content: '',
						isDone: false,
					});
					break;
				default:
					break;
			}
		},
		[_addBlock]
	);

	// useEffects ------------------------------------------------------
	useEffect(() => {
		if (_blocks.length === 0) {
			handleAddBlockBtnOnClick('text');
		}
	}, [_blocks.length, handleAddBlockBtnOnClick]);

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
						onChange={(e) => {
							const { value } = e.target;
							setNote((note) => ({ ...note, title: value }));
						}}
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
