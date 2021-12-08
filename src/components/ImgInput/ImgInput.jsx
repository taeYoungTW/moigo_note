import styles from './ImgInput.scss';

const ImgInput = ({ children, callback }) => {
	/* ---- EventHandlers ------------------------ */
	// onChange
	const handleImgInputOnChange = (e) => {
		const {
			target: { files },
		} = e;
		const aFile = files[0];

		if (aFile) {
			const reader = new FileReader();
			reader.onload = (finishedEvent) => {
				const {
					currentTarget: { result },
				} = finishedEvent;
				callback(result);
			};
			reader.readAsDataURL(aFile);
		}

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
