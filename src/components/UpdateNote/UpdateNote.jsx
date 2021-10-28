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
	const { _blocks, _detailNote } = useAppState();
	const {
		_resetDetailNote,
		_updateNote,
		_addBlock,
		_initBlocks,
		_resetBlocks,
	} = useAppAction();
	const [note, setNote] = useState(_detailNote);

	function updateNoteSubmit(e) {
		e.preventDefault();
		_updateNote({ ...note, blocks: [..._blocks] });
	}

	function addTextBlock(e) {
		_addBlock({ id: uuid(), type: 'text', text: '' });
	}

	function addChecklistBlock(e) {
		_addBlock({ id: uuid(), type: 'checklist', isDone: false, content: '' });
	}

	/* 	function addImageBlock(e) {
		_addBlock({ id: uuid(), type: 'image', baseURL: '' });
	} */

	useEffect(() => {
		if (_blocks.length === 0) {
			addTextBlock();
		}
	}, [_blocks.length]);

	useEffect(() => {
		_initBlocks([..._detailNote.blocks]);

		return () => {
			_resetBlocks();
		};
	}, [_detailNote, _initBlocks, _resetBlocks]);

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
					<button className="close_btn" onClick={_resetDetailNote}>
						<CloseIcon sx={{ fontSize: 25, color: '#767676' }} />
					</button>
				</div>
				<div className="content">
					{_blocks.map((block) => {
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
