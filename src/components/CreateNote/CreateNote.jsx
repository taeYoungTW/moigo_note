import './CreateNote.scss';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddBtn from '../Common/AddBtn';
import CreateNoteForm from './CreateNoteForm';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import { v4 as uuid } from 'uuid';

const CreateNote = () => {
	const { isOnCreateNote } = useAppState();
	const { changeIsOnCreateNote, addBlock } = useAppAction();

	function AddTextBlock(e) {
		// e.stopPropagation();
		changeIsOnCreateNote(true);
		addBlock({ id: uuid(), type: 'text', text: '' });
	}

	function AddChecklistBlock(e) {
		changeIsOnCreateNote(true);
		addBlock({ id: uuid(), type: 'checklist', isDone: false, content: '' });
	}

	function AddImageBlock(e) {
		changeIsOnCreateNote(true);
		addBlock({ id: uuid(), type: 'image', baseURL: '' });
	}

	return (
		<section className="create_note">
			{isOnCreateNote ? (
				<CreateNoteForm />
			) : (
				<div
					className="create_note_ctnr"
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					<button className="add_text_btn" onClick={AddTextBlock}>
						노트 작성...
					</button>
					<AddBtn Icon={InsertPhotoIcon} eventHandler={AddImageBlock} />
					<AddBtn
						Icon={FormatListBulletedIcon}
						eventHandler={AddChecklistBlock}
					/>
				</div>
			)}
		</section>
	);
};

export default CreateNote;
