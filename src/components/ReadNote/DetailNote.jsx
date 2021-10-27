import './DetailNote.scss';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import { useState } from 'react';
import UpdateNote from '../UpdateNote/UpdateNote';
import ReadChecklistBlock from '../ReadBlocks/ReadChecklistBlock';
import ReadTextBlock from '../ReadBlocks/ReadTextBlock';
const DetailNote = () => {
	const { detailNote } = useAppState();

	const { offDetailNote, setConfirmNoteIdtoDelete } = useAppAction();
	const [isEdit, setIsEdit] = useState(false);

	return isEdit ? (
		<UpdateNote />
	) : (
		<div className="detail_note_ctnr">
			<div className="detail_note">
				<div className="title_ctnr">
					<h1 className="title">{detailNote.title}</h1>
					<button className="close_btn" onClick={offDetailNote}>
						<CloseIcon sx={{ fontSize: 25, color: '#767676' }} />
					</button>
				</div>
				<div className="detailNote_content">
					{detailNote.blocks &&
						detailNote.blocks.map((block) => {
							switch (block.type) {
								case 'text':
									return (
										<ReadTextBlock
											block={block}
											key={block.id}
											isDetail={true}
										/>
									);
								case 'checklist':
									return (
										<ReadChecklistBlock
											block={block}
											key={`DetailNote_${block.id}`}
											noteId={detailNote.id}
											isDetail={true}
										/>
									);
								default:
									return new Error('Error: Read Block');
							}
						})}
				</div>
				<div className="ctrl_bar">
					<button
						className="delete_btn"
						onClick={() => {
							setConfirmNoteIdtoDelete(detailNote.id);
						}}
					>
						<DeleteIcon sx={{ fontSize: 23, color: '#2a394b' }} />
					</button>
					<button
						onClick={() => {
							setIsEdit(true);
						}}
						className="edit_btn"
					>
						수정
					</button>
				</div>
			</div>
		</div>
	);
};

export default DetailNote;
