import { useEffect, useRef } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
import './CreateBlocks.scss';
import { useAppAction } from '../../contexts/AppStateContext';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const CreateChecklistBlock = ({ block, isUpdate }) => {
	// Global State, Actions
	const { deleteBlock, updateBlock } = useAppAction();

	// Local State
	const contentRef = useRef(null);

	// Functions
	// useEffect : textarea auto height
	useEffect(() => {
		contentRef.current.style.height = '';
		contentRef.current.style.height = contentRef.current.scrollHeight + 'px';
	}, [block]);

	return (
		<div className="create_block">
			<div className="checklist">
				<label
					htmlFor={isUpdate ? `updateNote_${block.id}` : block.id}
					className="checkbox_label"
				>
					{block.isDone ? (
						<CheckBoxIcon sx={{ fontSize: 20, color: '#29394B' }} />
					) : (
						<CheckBoxOutlineBlankIcon sx={{ fontSize: 20, color: '#29394B' }} />
					)}
				</label>
				<input
					type="checkbox"
					id={isUpdate ? `updateNote_${block.id}` : block.id}
					className="checkbox"
					checked={block.isDone}
					onChange={(e) => {
						const {
							target: { checked },
						} = e;
						updateBlock({ ...block, isDone: checked });
					}}
				/>
				<textarea
					className="checklist_block_textarea"
					type="text"
					value={block.content}
					onChange={(e) => {
						const {
							target: { value },
						} = e;
						updateBlock({ ...block, content: value });
					}}
					placeholder="항목 추가"
					rows={1}
					ref={contentRef}
					spellCheck={false}
					autoFocus={true}
					style={{
						textDecoration: block.isDone && 'solid line-through #767676 1px',
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
