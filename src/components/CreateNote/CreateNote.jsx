import './CreateNote.scss';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddBlockBtn from '../Common/AddBlockBtn';
import { useAppAction } from '../../contexts/AppStateContext';
import { WRITE_NOTE_TEXT } from '../../constants/constants';
import ImgInput from '../Common/ImgInput';

const CreateNote = () => {
	// Global States & Actions --------------------------
	const { _setIsCreateNoteFormOn, _addTypeBlock } = useAppAction();

	// Event Handler --------------------------

	const handleAddBlockBtnOnClick = (type, dataUrl) => {
		_addTypeBlock(type, dataUrl);
		_setIsCreateNoteFormOn(true);
	};

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
			<ImgInput
				callback={(dataUrl) => {
					handleAddBlockBtnOnClick('image', dataUrl);
				}}
			>
				<AddBlockBtn Icon={InsertPhotoIcon} />
			</ImgInput>
			<AddBlockBtn
				Icon={FormatListBulletedIcon}
				eventHandler={() => {
					handleAddBlockBtnOnClick('checklist');
				}}
			/>
		</div>
	);
};

export default CreateNote;
