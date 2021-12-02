import styles from './ReadImgBlock.scss';
const ReadImgBlock = ({ block }) => {
	return (
		<img
			src={block.dataUrl}
			alt="read_img_block"
			className={styles.readImgBlock}
		/>
	);
};

export default ReadImgBlock;
