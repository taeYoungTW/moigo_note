import { useState } from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useAppAction } from '../../contexts/AppStateContext';
const ReadChecklistBlock = ({ block, noteId }) => {
	const [checklistBlock, setChecklistBlock] = useState(block);
	const { updateNoteChecklist } = useAppAction();

	return (
		<div className="read_block">
			<div className="read_checklist_block">
				<div
					onClick={(e) => {
						e.stopPropagation();
					}}
					className="stopPropagation_el"
				>
					<label htmlFor={block.id} className="checkbox_label">
						{checklistBlock.isDone ? (
							<CheckBoxIcon sx={{ fontSize: 20, color: '#29394B' }} />
						) : (
							<CheckBoxOutlineBlankIcon
								sx={{ fontSize: 20, color: '#29394B' }}
							/>
						)}
					</label>
					<input
						type="checkbox"
						id={block.id}
						className="checkbox_input"
						onClick={(e) => {
							const {
								target: { checked },
							} = e;
							// updateBlock({ ...checklistBlock, isDone: checked });
							updateNoteChecklist(noteId, {
								...checklistBlock,
								isDone: checked,
							});
							setChecklistBlock((block) => ({ ...block, isDone: checked }));
						}}
					/>
				</div>
				<div
					className="content"
					style={{
						textDecoration:
							checklistBlock.isDone && 'solid line-through #414141 1px',
					}}
				>
					{block.content}
				</div>
			</div>
		</div>
	);
};

export default ReadChecklistBlock;
