import getImgDataUrlFromFileAsync from '../../utils/getImgDataUrlFromFileAsync';
import styles from './ImgInput.scss';

const ImgInput = ({ children, handleImgUrlCallback }) => {
	/* ---- EventHandlers ------------------------ */
	// onChange
	const handleImgInputOnChange = async (e) => {
		const {
			target: { files },
		} = e;
		const aFile = files[0];
		const result = await getImgDataUrlFromFileAsync(aFile);
		handleImgUrlCallback(result);

		// Solved issue #8
		e.target.value = '';
	};

	/* ---- Render ------------------------ */
	return (
		<label>
			{children}
			<input
				className={styles.imgInput}
				type="file"
				accept=".jpg, .png"
				onChange={handleImgInputOnChange}
			/>
		</label>
	);
};

export default ImgInput;
