import AddBtn from '../Common/AddBtn';
import './CreateNoteForm.scss';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TextFieldsIcon from '@mui/icons-material/TextFields';

const CreateNoteForm = () => {
	return (
		<section className="create_note_form">
			<div className="title">
				<input className="title_input" type="text" placeholder="제목" />
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
		</section>
	);
};
export default CreateNoteForm;
