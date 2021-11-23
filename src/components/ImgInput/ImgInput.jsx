const ImgInput = ({ children, callback }) => {
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
	};
	return (
		<label>
			{children}
			<input
				type="file"
				accept=".jpg, .png"
				onChange={handleImgInputOnChange}
				style={{ display: 'none' }}
			/>
		</label>
	);
};

export default ImgInput;
