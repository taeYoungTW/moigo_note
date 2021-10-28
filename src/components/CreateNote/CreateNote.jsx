import './CreateNote.scss';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddBtn from '../Common/AddBtn';
import CreateNoteForm from './CreateNoteForm';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import { v4 as uuid } from 'uuid';

const CreateNote = () => {
	const { _isOnCreateNoteForm } = useAppState();
	const { _changeIsOnCreateNoteForm, _addBlock } = useAppAction();

	function addTextBlock(e) {
		_changeIsOnCreateNoteForm(true);
		_addBlock({ id: uuid(), type: 'text', text: '' });
	}

	function addChecklistBlock(e) {
		_changeIsOnCreateNoteForm(true);
		_addBlock({ id: uuid(), type: 'checklist', isDone: false, content: '' });
	}

	function addImageBlock(e) {
		_changeIsOnCreateNoteForm(true);
		// _addBlock({ id: uuid(), type: 'image', baseURL: '' });
	}

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
					<button className="add_text_btn" onClick={addTextBlock}>
						노트 작성...
					</button>
					<AddBtn Icon={InsertPhotoIcon} eventHandler={addImageBlock} />
					<AddBtn
						Icon={FormatListBulletedIcon}
						eventHandler={addChecklistBlock}
					/>
				</div>
			)}
		</section>
	);
};

export default CreateNote;
