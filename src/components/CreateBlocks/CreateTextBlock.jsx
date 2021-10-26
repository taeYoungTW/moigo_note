import { useEffect, useRef, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
import './CreateBlocks.scss';
import { useAppAction } from '../../contexts/AppStateContext';

const CreateTextBlock = ({ block }) => {
	// Global State, Actions
	const { deleteBlock, updateBlock } = useAppAction();

	// Local State
	const [textBlock, setTextBlock] = useState(block);
	const textRef = useRef(null);

	// Functions

	// useEffect : textarea auto height
	useEffect(() => {
		textRef.current.style.height = '';
		textRef.current.style.height = textRef.current.scrollHeight + 'px';
	}, [textBlock]);

	return (
		<div className="create_block">
			<textarea
				className="text_block_textarea"
				type="text"
				value={textBlock.text}
				onChange={(e) => {
					const {
						target: { value },
					} = e;
					updateBlock({ ...textBlock, text: value });
					setTextBlock((block) => {
						return { ...block, text: value };
					});
				}}
				placeholder="노트 작성..."
				rows={1}
				ref={textRef}
				spellCheck={false}
				autoFocus={true}
			/>
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

export default CreateTextBlock;
