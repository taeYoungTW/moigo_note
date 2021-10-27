import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useAppAction } from '../../contexts/AppStateContext';

const ReadChecklistBlock = ({ block, noteId, isDetail }) => {
	const { updateNoteChecklist, updateDetailNoteChecklist } = useAppAction();

	function onClickCheckbox(e) {
		const {
			target: { checked },
		} = e;
		updateNoteChecklist(noteId, {
			...block,
			isDone: checked,
		});
		if (isDetail) {
			updateDetailNoteChecklist({
				...block,
				isDone: checked,
			});
		}
	}

	return (
		<div className={`read_block ${isDetail ? 'detail' : ''}`}>
			<div className="read_checklist_block">
				<div
					onClick={(e) => {
						e.stopPropagation();
					}}
					className="stopPropagation_el"
				>
					<label
						htmlFor={isDetail ? `DetailNote_${block.id}` : block.id}
						className="checkbox_label"
					>
						{block.isDone ? (
							<CheckBoxIcon sx={{ fontSize: 20, color: '#29394B' }} />
						) : (
							<CheckBoxOutlineBlankIcon
								sx={{ fontSize: 20, color: '#29394B' }}
							/>
						)}
					</label>
					<input
						type="checkbox"
						id={isDetail ? `DetailNote_${block.id}` : block.id}
						className="checkbox_input"
						checked={block.isDone}
						onChange={onClickCheckbox}
					/>
				</div>
				<div
					className="content"
					style={{
						textDecoration: block.isDone && 'solid line-through #414141 1px',
					}}
				>
					{block.content}
				</div>
			</div>
		</div>
	);
};

export default ReadChecklistBlock;
