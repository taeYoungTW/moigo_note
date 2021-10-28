import AddBtn from '../Common/AddBtn';
import './CreateNoteForm.scss';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { useEffect, useState, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import CreateTextBlock from '../CreateBlocks/CreateTextBlock';
import CreateChecklistBlock from '../CreateBlocks/CreateChecklistBlock';

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
	const handleCreateNoteBtnOnClick = useCallback(() => {
		_addNote({ ...note, id: uuid(), blocks: [..._blocks] });
		_changeIsOnCreateNoteForm(false);
	}, [_addNote, _changeIsOnCreateNoteForm, _blocks, note]);

	const handleAddTextBtnOnClick = useCallback(() => {
		_addBlock({ id: uuid(), type: 'text', text: '' });
	}, [_addBlock]);

	const handleAddChecklistBtnOnClick = useCallback(() => {
		_addBlock({ id: uuid(), type: 'checklist', content: '', isDone: false });
	}, [_addBlock]);

	// useEffects ------------------------------------
	useEffect(() => {
		if (_blocks.length === 0) {
			handleAddTextBtnOnClick();
		}
	}, [_blocks.length, handleAddTextBtnOnClick]);

	useEffect(() => {
		return () => {
			_resetBlocks();
		};
	}, [_resetBlocks]);

	// Render ----------------------------------------
	return (
		<section
			className="create_note_form"
			onClick={(e) => {
				e.stopPropagation();
			}}
		>
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
			<div className="content">
				{_blocks.map((block) => {
					switch (block.type) {
						case 'text':
							return <CreateTextBlock block={block} key={block.id} />;
						case 'checklist':
							return <CreateChecklistBlock block={block} key={block.id} />;
						default:
							return <CreateTextBlock block={block} key={block.id} />;
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
					onClick={handleCreateNoteBtnOnClick}
					className="create_submit_btn"
				>
					완료
				</button>
			</div>
		</section>
	);
};
export default CreateNoteForm;
