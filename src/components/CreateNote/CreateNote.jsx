import './CreateNote.scss';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddBtn from '../Common/AddBtn';
import { useAppAction } from '../../contexts/AppStateContext';
import { v4 as uuid } from 'uuid';
import { useCallback } from 'react';
import { WRITE_NOTE_TEXT } from '../../constants/constants';

const CreateNote = () => {
	// Global States & Actions --------------------------
	const { _changeIsOnCreateNoteForm, _addBlock } = useAppAction();

	// Event Handler --------------------------
	const handleAddBlockBtnOnClick = useCallback(
		(type) => {
			_changeIsOnCreateNoteForm(true);
			switch (type) {
				case 'text':
					_addBlock({ id: uuid(), type, text: '' });
					break;
				case 'checklist':
					_addBlock({ id: uuid(), type, isDone: false, content: '' });
					break;
				default:
					break;
			}
		},
		[_changeIsOnCreateNoteForm, _addBlock]
	);

	// Render -----------------------
	return (
		<div className="create_note">
			<button
				className="add_text_btn"
				onClick={() => {
					handleAddBlockBtnOnClick('text');
				}}
			>
				{WRITE_NOTE_TEXT}
			</button>
			<AddBtn
				Icon={InsertPhotoIcon}
				eventHandler={() => {
					handleAddBlockBtnOnClick('image');
				}}
			/>
			<AddBtn
				Icon={FormatListBulletedIcon}
				eventHandler={() => {
					handleAddBlockBtnOnClick('checklist');
				}}
			/>
		</div>
	);
};

export default CreateNote;
