const getImgDataUrlFromFileAsync = (file) => {
	if (!file || !/^image\/(jpeg)$|(png)$/.test(file.type)) {
		return;
	}

	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (progressEvent) => {
			const {
				currentTarget: { result },
			} = progressEvent;
			resolve(result);
		};
		reader.onerror = (err) => reject(err);
		reader.readAsDataURL(file);
	});
};

export default getImgDataUrlFromFileAsync;
