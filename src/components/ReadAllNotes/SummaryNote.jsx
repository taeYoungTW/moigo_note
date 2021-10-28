import './SummaryNote.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReadTextBlock from '../ReadBlocks/ReadTextBlock';
import ReadChecklistBlock from '../ReadBlocks/ReadChecklistBlock';

const SummaryNote = ({ note }) => {
	// ---- Global States ----
	const {
		addSelectedNoteId,
		deleteSelectedNoteId,
		onDetailNote,
		setConfirmNoteIdtoDelete,
	} = useAppAction();
	const { selectedNoteIds } = useAppState();

	// ---- Local States ----
	const [isSelected, setIsSelected] = useState(
		selectedNoteIds.includes(note.id)
	); // false로 해야하나 고민

	// ---- Functions ----
	// On Delete-Note-Confirm
	function onDelNoteConfirm(e) {
		e.stopPropagation();
		setConfirmNoteIdtoDelete(note.id);
	}
	// Select A Note
	function selectOnCurrentNoteId() {
		setIsSelected(true);
		addSelectedNoteId(note.id);
	}

	function selectOffCurrentNoteId() {
		setIsSelected(false);
		deleteSelectedNoteId(note.id);
	}

	//---- useEffect ---- For Cancel Selection (Update Note Outline)
	useEffect(() => {
		setIsSelected(selectedNoteIds.includes(note.id));
	}, [selectedNoteIds, note]);

	return (
		<article
			className="summary_note"
			onClick={() => {
				onDetailNote(note);
			}}
		>
			<div className="summary_area">
				{note.title && <h1 className="summary_title">{note.title}</h1>}
				{note.blocks &&
					note.blocks.map((block) => {
						switch (block.type) {
							case 'text':
								return <ReadTextBlock block={block} key={block.id} />;
							case 'checklist':
								return (
									<ReadChecklistBlock
										block={block}
										key={block.id}
										noteId={note.id}
										isDetail={false}
									/>
								);
							default:
								return new Error('Error: Read Block');
						}
					})}
			</div>
			<div className="ctrl_area">
				<button
					className="del_summary_note_btn"
					onClickCapture={onDelNoteConfirm}
				>
					<DeleteIcon sx={{ fontSize: 20 }} />
				</button>

				{isSelected ? (
					<>
						<button
							className="select_summary_note_off_btn"
							onClickCapture={selectOffCurrentNoteId}
						>
							<CheckCircleIcon sx={{ fontSize: 35, color: '#81C7E4' }} />
						</button>
						<div
							className="select_outline"
							onClick={(e) => {
								e.stopPropagation();
							}}
						></div>
					</>
				) : (
					<button
						className="select_summary_note_on_btn"
						onClickCapture={selectOnCurrentNoteId}
					>
						<CheckCircleOutlineIcon sx={{ fontSize: 35, color: '#81C7E4' }} />
					</button>
				)}
			</div>
		</article>
	);
};

SummaryNote.propTypes = {
	note: PropTypes.object,
};

export default SummaryNote;
