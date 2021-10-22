import AddBtn from '../Common/AddBtn';
import './CreateNoteForm.scss';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useAppAction } from '../../contexts/AppStateContext';

const CreateNoteForm = () => {
	// Request to add Note to global state
	const { addNote, changeIsOnCreateNote } = useAppAction();

	const [note, setNote] = useState({
		title: '',
	});

	function createNoteSubmit(e) {
		e.preventDefault();
		addNote({ ...note, id: uuid() });
		changeIsOnCreateNote(false);
	}

	return (
		<section
			className="create_note_form"
			onClick={(e) => {
				e.stopPropagation();
			}}
		>
			<form action="submit" onSubmit={createNoteSubmit}>
				<div className="title">
					<input
						className="title_input"
						type="text"
						placeholder="제목"
						onChange={(e) => {
							const { value } = e.target;
							setNote({ title: value });
						}}
						value={note.title}
					/>
				</div>
				<div className="content">Area for Block</div>
				<div className="ctrl_bar">
					<div className="add_btns">
						<AddBtn Icon={InsertPhotoIcon} />
						<AddBtn Icon={FormatListBulletedIcon} />
						<AddBtn Icon={TextFieldsIcon} />
					</div>
					<button type="submit" className="create_submit_btn">
						완료
					</button>
				</div>
			</form>
		</section>
	);
};
export default CreateNoteForm;
