export const filterEmptyTextBlock = (oldBlocks) => {
	const newBlocks = oldBlocks.filter((block) => {
		if (block.text === '') {
			return false;
		}
		return true;
	});
	return newBlocks;
};
