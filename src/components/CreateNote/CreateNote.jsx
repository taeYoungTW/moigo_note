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
	const handleAddTextBtnOnClick = useCallback(() => {
		_changeIsOnCreateNoteForm(true);
		_addBlock({ id: uuid(), type: 'text', text: '' });
	}, [_changeIsOnCreateNoteForm, _addBlock]);

	const handleAddChecklistBtnOnClick = useCallback(() => {
		_changeIsOnCreateNoteForm(true);
		_addBlock({ id: uuid(), type: 'checklist', isDone: false, content: '' });
	}, [_changeIsOnCreateNoteForm, _addBlock]);

	const handleAddImgBtnOnClick = useCallback(() => {
		_changeIsOnCreateNoteForm(true);
		// _addBlock({ id: uuid(), type: 'image', baseURL: '' });
	}, [_changeIsOnCreateNoteForm]);

	// Render -----------------------
	return (
		<div className="create_note">
			<button className="add_text_btn" onClick={handleAddTextBtnOnClick}>
				{WRITE_NOTE_TEXT}
			</button>
			<AddBtn Icon={InsertPhotoIcon} eventHandler={handleAddImgBtnOnClick} />
			<AddBtn
				Icon={FormatListBulletedIcon}
				eventHandler={handleAddChecklistBtnOnClick}
			/>
		</div>
	);
};

export default CreateNote;
