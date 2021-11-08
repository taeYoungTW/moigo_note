const ReadImgBlock = ({ block, isDetailNote }) => {
	return (
		<div className={`read_block ${isDetailNote ? 'detail' : ''}`}>
			<img
				src={block.dataUrl}
				alt="read_img_block"
				className="read_img_block"
			/>
		</div>
	);
};

export default ReadImgBlock;
