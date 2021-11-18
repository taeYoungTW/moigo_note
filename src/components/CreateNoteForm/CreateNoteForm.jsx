import './CreateNoteForm.scss';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import { COMPLETE_TEXT, TITLE_TEXT } from '../../constants/constants';
import { emptyTextBlockFilter } from '../../utils/emptyTextBlockFilter';
import CreateBlocks from '../CreateBlocks/CreateBlocks';
import CreateCtrlBar from '../CreateCtrlBar/CreateCtrlBar';

const CreateNoteForm = () => {
	// Global States & Actions --------------------------
	const { _blocks } = useAppState();
	const { _addNote, _setIsCreateNoteFormOn, _resetBlocks } = useAppAction();

	// Local State -------------------------------------
	const [note, setNote] = useState({
		title: '',
		blocks: [],
	});

	// Event Handler ----------------------------------
	const handleCreateNoteBtnOnClick = () => {
		const filteredBlocks = emptyTextBlockFilter(_blocks);
		_addNote({ ...note, id: uuid(), blocks: [...filteredBlocks] });
		_setIsCreateNoteFormOn(false);
	};

	const handleTitleInputOnChange = (e) => {
		const { value } = e.target;
		setNote({ title: value });
	};

	// useEffects ------------------------------------

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
			<CreateBlocks />
			<CreateCtrlBar
				handleSubmitBtnOnClick={handleCreateNoteBtnOnClick}
				submitBtnName={COMPLETE_TEXT}
			/>
		</section>
	);
};
export default CreateNoteForm;
