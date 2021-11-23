import './ReadImgBlock.scss';
const ReadImgBlock = ({ block }) => {
	return (
		<img src={block.dataUrl} alt="read_img_block" className="read-img-block" />
	);
};

export default ReadImgBlock;
