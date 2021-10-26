import { useEffect, useRef, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
import './CreateBlocks.scss';
import { useAppAction } from '../../contexts/AppStateContext';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const CreateChecklistBlock = ({ block }) => {
	// Global State, Actions
	const { deleteBlock, updateBlock } = useAppAction();

	// Local State
	const [checklistBlock, setChecklistBlock] = useState(block);
	const contentRef = useRef(null);

	// Functions

	// useEffect : textarea auto height
	useEffect(() => {
		contentRef.current.style.height = '';
		contentRef.current.style.height = contentRef.current.scrollHeight + 'px';
	}, [checklistBlock]);

	return (
		<div className="create_block">
			<div className="checklist">
				<label htmlFor={block.id} className="checkbox_label">
					{checklistBlock.isDone ? (
						<CheckBoxIcon sx={{ fontSize: 20 }} />
					) : (
						<CheckBoxOutlineBlankIcon sx={{ fontSize: 20 }} />
					)}
				</label>
				<input
					type="checkbox"
					id={block.id}
					className="checkbox"
					onClick={(e) => {
						const {
							target: { checked },
						} = e;
						updateBlock({ ...checklistBlock, isDone: checked });
						setChecklistBlock((block) => ({ ...block, isDone: checked }));
					}}
				/>
				<textarea
					className="checklist_block_textarea"
					type="text"
					value={checklistBlock.content}
					onChange={(e) => {
						const {
							target: { value },
						} = e;
						updateBlock({ ...checklistBlock, content: value });
						setChecklistBlock((block) => ({ ...block, content: value }));
					}}
					placeholder="항목 추가"
					rows={1}
					ref={contentRef}
					spellCheck={false}
					autoFocus={true}
					style={{
						textDecoration:
							checklistBlock.isDone && 'solid line-through #767676 1px',
					}}
				/>
			</div>
			<div className="btns">
				<button
					type="button"
					onClick={() => {
						deleteBlock(block.id);
					}}
				>
					<DeleteIcon sx={{ fontSize: 18 }} />
				</button>
				<button type="button">
					<MenuIcon sx={{ fontSize: 18 }} />
				</button>
			</div>
		</div>
	);
};

export default CreateChecklistBlock;
