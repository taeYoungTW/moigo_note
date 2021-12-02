import styles from './CreateImgBlock.scss';

const CreateImgBlock = ({ block }) => {
	return <img src={block.dataUrl} alt="img_block" className={styles.img} />;
};

export default CreateImgBlock;
