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
import useError from '../../hooks/useError';
import {
	COMPLETE_TEXT,
	INVALID_BLOCK_TYPE_TEXT,
	TITLE_TEXT,
} from '../../constants/constants';
import { filterEmptyTextBlock } from '../../utils/filterEmptyTextBlock';

const CreateNoteForm = () => {
	const _setUseError = useError();
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
	const handleCreateNoteBtnOnClick = () => {
		const filteredBlocks = filterEmptyTextBlock(_blocks);
		_addNote({ ...note, id: uuid(), blocks: [...filteredBlocks] });
		_changeIsOnCreateNoteForm(false);
	};

	const handleTitleInputOnChange = (e) => {
		const { value } = e.target;
		setNote({ title: value });
	};

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
		<section className="create_note_form">
			<div className="title">
				<input
					className="title_input"
					type="text"
					placeholder={TITLE_TEXT}
					onChange={handleTitleInputOnChange}
					value={note.title}
				/>
			</div>
			<div className="content">
				{_blocks?.map((block) => {
					switch (block.type) {
						case 'text':
							return <CreateTextBlock block={block} key={block.id} />;
						case 'checklist':
							return (
								<CreateChecklistBlock
									block={block}
									key={block.id}
									isUpdate={false}
								/>
							);
						default:
							_setUseError({
								message: INVALID_BLOCK_TYPE_TEXT,
								location: 'CreateNoteForm/content_el/switch',
							});
							return <></>;
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
					{COMPLETE_TEXT}
				</button>
			</div>
		</section>
	);
};
export default CreateNoteForm;
