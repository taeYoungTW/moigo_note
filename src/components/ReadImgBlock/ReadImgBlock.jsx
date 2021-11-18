import './ReadImgBlock.scss';
const ReadImgBlock = ({ block }) => {
	return (
		<img src={block.dataUrl} alt="read_img_block" className="read_img_block" />
	);
};

export default ReadImgBlock;
