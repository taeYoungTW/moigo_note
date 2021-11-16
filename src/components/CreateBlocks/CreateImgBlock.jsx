const CreateImgBlock = ({ block, children }) => {
	return <img src={block.dataUrl} alt="img_block" className="img" />;
};

export default CreateImgBlock;
