import CloseIcon from '@mui/icons-material/Close';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import AddBtn from '../Common/AddBtn';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import './UpdateNote.scss';
import { useCallback, useEffect, useState } from 'react';
import CreateTextBlock from '../CreateBlocks/CreateTextBlock';
import CreateChecklistBlock from '../CreateBlocks/CreateChecklistBlock';
import { v4 as uuid } from 'uuid';
import useError from '../../hooks/useError';
import {
	COMPLETE_TEXT,
	INVALID_BLOCK_TYPE_TEXT,
	MODAL_NOTE_CLOSE_ICON_COLOR,
	MODAL_NOTE_CLOSE_ICON_FONT_SIZE,
} from '../../constants/constants';
import { filterEmptyTextBlock } from '../../utils/filterEmptyTextBlock';

const UpdateNote = () => {
	// Global States, Actions ---------------------------------------
	const { _blocks, _modalNote } = useAppState();
	const { _resetModalNote, _updateNote, _addBlock, _initBlocks, _resetBlocks } =
		useAppAction();

	// Hooks ---------------------------------
	const _setUseError = useError();

	// Local States ------------------------------------------------
	const [note, setNote] = useState(_modalNote);

	// Event Handler ----------------------------------------------
	const handleUpdateNoteBtnOnClick = useCallback(() => {
		const filteredBlocks = filterEmptyTextBlock(_blocks);
		_updateNote({ ...note, blocks: [...filteredBlocks] });
	}, [_updateNote, note, _blocks]);

	const handleAddTextBtnOnClick = useCallback(() => {
		_addBlock({ id: uuid(), type: 'text', text: '' });
	}, [_addBlock]);

	const handleAddChecklistBtnOnClick = useCallback(() => {
		_addBlock({ id: uuid(), type: 'checklist', content: '', isDone: false });
	}, [_addBlock]);

	/* 	const handleAddImageBtnOnClick = useCallback(() => {
		_addBlock({ id: uuid(), type: 'image', baseURL:'' });
	}, [_addBlock]); */

	// useEffects ------------------------------------------------------
	useEffect(() => {
		if (_blocks.length === 0) {
			handleAddTextBtnOnClick();
		}
	}, [_blocks.length, handleAddTextBtnOnClick]);

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
				<div className="content">
					{_blocks?.map((block) => {
						switch (block.type) {
							case 'text':
								return (
									<CreateTextBlock
										block={block}
										key={`updateNote_${block.id}`}
									/>
								);
							case 'checklist':
								return (
									<CreateChecklistBlock
										block={block}
										key={`updateNote_${block.id}`}
										isUpdate={true}
									/>
								);
							default:
								_setUseError({
									message: INVALID_BLOCK_TYPE_TEXT,
									location: 'UpdateNote/content_el/switch',
								});
								return <></>;
						}
					})}
				</div>
				<div className="ctrl_bar">
					<div className="add_btns">
						<AddBtn Icon={InsertPhotoIcon} />
						<AddBtn
							Icon={FormatListBulletedIcon}
							eventHandler={handleAddChecklistBtnOnClick}
						/>
						<AddBtn
							Icon={TextFieldsIcon}
							eventHandler={handleAddTextBtnOnClick}
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
