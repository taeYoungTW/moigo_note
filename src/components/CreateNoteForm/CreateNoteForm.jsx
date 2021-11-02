import AddBtn from '../Common/AddBtn';
import './CreateNoteForm.scss';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import { COMPLETE_TEXT, TITLE_TEXT } from '../../constants/constants';
import { filterEmptyTextBlock } from '../../utils/filterEmptyTextBlock';
import CreateContent from '../CreateContent/CreateContent';
import useAddBlock from '../../hooks/useAddBlock';
import useAddDefaultBlock from '../../hooks/useAddDefaultBlock';

const CreateNoteForm = () => {
	// Global States & Actions --------------------------
	const { _blocks } = useAppState();
	const { _addNote, _changeIsOnCreateNoteForm, _addBlock, _resetBlocks } =
		useAppAction();

	// Local State -------------------------------------
	const [note, setNote] = useState({
		title: '',
		blocks: [],
	});

	// Event Handler ----------------------------------
	const handleCreateNoteBtnOnClick = () => {
		const filteredBlocks = filterEmptyTextBlock(_blocks);
		_addNote({ ...note, id: uuid(), blocks: [...filteredBlocks] });
		_changeIsOnCreateNoteForm(false);
	};

	const handleTitleInputOnChange = (e) => {
		const { value } = e.target;
		setNote({ title: value });
	};

	const handleAddBlockBtnOnClick = useAddBlock(_addBlock); // hooks로 재사용 관리

	// useEffects ------------------------------------
	useAddDefaultBlock(handleAddBlockBtnOnClick, _blocks.length); // hooks로 재사용 관리

	useEffect(() => {
		return () => {
			_resetBlocks();
		};
	}, [_resetBlocks]);

	// Render ----------------------------------------
	return (
		<section className="create_note_form">
			<div className="title">
				<input
					className="title_input"
					type="text"
					placeholder={TITLE_TEXT}
					onChange={handleTitleInputOnChange}
					value={note.title}
				/>
			</div>
			<CreateContent blocks={_blocks} isUpdateNote={false} />
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
					onClick={handleCreateNoteBtnOnClick}
					className="create_submit_btn"
				>
					{COMPLETE_TEXT}
				</button>
			</div>
		</section>
	);
};
export default CreateNoteForm;
