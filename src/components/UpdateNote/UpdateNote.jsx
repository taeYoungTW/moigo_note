import CloseIcon from '@mui/icons-material/Close';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import AddBtn from '../Common/AddBtn';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import './UpdateNote.scss';
import { useEffect, useState } from 'react';
import CreateTextBlock from '../CreateBlocks/CreateTextBlock';
import CreateChecklistBlock from '../CreateBlocks/CreateChecklistBlock';
import { v4 as uuid } from 'uuid';

const UpdateNote = () => {
	const { blocks, detailNote } = useAppState();
	const { offDetailNote, updateNote, addBlock, initBlocks, resetBlocks } =
		useAppAction();
	const [note, setNote] = useState(detailNote);

	function updateNoteSubmit(e) {
		e.preventDefault();
		updateNote({ ...note, blocks: [...blocks] });
	}

	function addTextBlock(e) {
		addBlock({ id: uuid(), type: 'text', text: '' });
	}

	function addChecklistBlock(e) {
		addBlock({ id: uuid(), type: 'checklist', isDone: false, content: '' });
	}

	/* 	function addImageBlock(e) {
		addBlock({ id: uuid(), type: 'image', baseURL: '' });
	} */

	useEffect(() => {
		if (blocks.length === 0) {
			addTextBlock();
		}
	}, [blocks.length]);

	useEffect(() => {
		initBlocks([...detailNote.blocks]);

		return () => {
			resetBlocks();
		};
	}, [detailNote, initBlocks, resetBlocks]);

	return (
		<div className="update_note_ctnr">
			<div className="update_note">
				<div className="title">
					<input
						type="text"
						className="title_input"
						value={note.title}
						onChange={(e) => {
							const { value } = e.target;
							setNote((note) => ({ ...note, title: value }));
						}}
					/>
					<button className="close_btn" onClick={offDetailNote}>
						<CloseIcon sx={{ fontSize: 25, color: '#767676' }} />
					</button>
				</div>
				<div className="content">
					{blocks.map((block) => {
						switch (block.type) {
							case 'text':
								return (
									<CreateTextBlock
										block={block}
										key={`updateNote_${block.id}`}
									/>
								);
							case 'checklist':
								return (
									<CreateChecklistBlock
										block={block}
										key={`updateNote_${block.id}`}
										isUpdate={true}
									/>
								);
							default:
								return '';
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
					<button
						type="button"
						onClick={updateNoteSubmit}
						className="update_submit_btn"
					>
						완료
					</button>
				</div>
			</div>
		</div>
	);
};

export default UpdateNote;
