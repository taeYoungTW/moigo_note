import AddBtn from '../Common/AddBtn';
import './CreateNoteForm.scss';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import CreateTextBlock from '../CreateBlocks/CreateTextBlock';
import CreateChecklistBlock from '../CreateBlocks/CreateChecklistBlock';

const CreateNoteForm = () => {
	// Request to add Note to global state
	const { blocks } = useAppState();
	const { addNote, changeIsOnCreateNoteForm, addBlock, resetBlocks } =
		useAppAction();

	const [note, setNote] = useState({
		title: '',
		blocks: [],
	});

	// Functions
	function createNoteSubmit(e) {
		e.preventDefault();
		addNote({ ...note, id: uuid(), blocks: [...blocks] });
		changeIsOnCreateNoteForm(false);
	}

	function addTextBlock() {
		addBlock({ id: uuid(), type: 'text', text: '' });
	}

	function addChecklistBlock() {
		addBlock({ id: uuid(), type: 'checklist', content: '', isDone: false });
	}

	// useEffect
	useEffect(() => {
		if (blocks.length === 0) {
			addTextBlock();
		}
	}, [blocks.length]);

	useEffect(() => {
		return () => {
			resetBlocks();
		};
	}, []);

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
				<div className="content">
					{blocks.map((block) => {
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
							eventHandler={addChecklistBlock}
						/>
						<AddBtn Icon={TextFieldsIcon} eventHandler={addTextBlock} />
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
