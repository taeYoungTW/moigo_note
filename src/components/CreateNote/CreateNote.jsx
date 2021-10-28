import './CreateNote.scss';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddBtn from '../Common/AddBtn';
import CreateNoteForm from './CreateNoteForm';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import { v4 as uuid } from 'uuid';
import { useCallback } from 'react';

const CreateNote = () => {
	// Global States & Actions --------------------------
	const { _isOnCreateNoteForm } = useAppState();
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
		<section className="create_note">
			{_isOnCreateNoteForm ? (
				<CreateNoteForm />
			) : (
				<div
					className="create_note_ctnr"
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					<button className="add_text_btn" onClick={handleAddTextBtnOnClick}>
						노트 작성...
					</button>
					<AddBtn
						Icon={InsertPhotoIcon}
						eventHandler={handleAddImgBtnOnClick}
					/>
					<AddBtn
						Icon={FormatListBulletedIcon}
						eventHandler={handleAddChecklistBtnOnClick}
					/>
				</div>
			)}
		</section>
	);
};

export default CreateNote;
