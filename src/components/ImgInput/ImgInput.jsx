const ImgInput = ({ children, isUpdate, callback }) => {
	const handleImgInputOnChange = (e) => {
		const {
			target: { files },
		} = e;
		const aFile = files[0];

		if (aFile) {
			const reader = new FileReader();
			reader.onload = (fihishedEvent) => {
				const {
					currentTarget: { result },
				} = fihishedEvent;
				callback(result);
			};
			reader.readAsDataURL(aFile);
		}
	};
	return (
		<div className="img_input">
			<label htmlFor={`${isUpdate ? 'update' : 'create'}-img-input`}>
				{children}
			</label>
			<input
				type="file"
				accept=".jpg, .png"
				onChange={handleImgInputOnChange}
				style={{ display: 'none' }}
				id={`${isUpdate ? 'update' : 'create'}-img-input`}
			/>
		</div>
	);
};

export default ImgInput;
