import { useEffect, useRef, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuIcon from '@mui/icons-material/Menu';
import './CreateBlocks.scss';

const CreateTextBlock = ({ block }) => {
	// Local State
	const [textBlock, setTextBlock] = useState(block);
	const textRef = useRef(null);

	// Functions
	useEffect(() => {
		console.log(textRef);
		textRef.current.rows = Math.floor(textRef.current.scrollHeight / 20);
	}, [textBlock]);

	return (
		<div className="block">
			<textarea
				className="text_block_textarea"
				type="text"
				value={textBlock.text}
				onChange={(e) => {
					const {
						target: { value },
					} = e;
					setTextBlock((block) => ({ ...block, text: value }));
				}}
				placeholder="노트 작성..."
				ref={textRef}
			/>
			<div className="btns">
				<button type="button">
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
