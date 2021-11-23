import './CreateImgBlock.scss';

const CreateImgBlock = ({ block }) => {
	return <img src={block.dataUrl} alt="img_block" className="img" />;
};

export default CreateImgBlock;
