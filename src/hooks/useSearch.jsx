import { useCallback, useEffect, useState } from 'react';

const useSearch = (searchValue, targetNote) => {
	const [isDisplay, setIsDisplay] = useState(true);
	const { title, blocks } = targetNote;
	const checkTitleSummaryNote = useCallback(
		(value) => {
			if (value) {
				return title.includes(value);
			} else {
				return true;
			}
		},
		[title]
	);

	const checkBlocksSummaryNote = useCallback(
		(value) => {
			if (value) {
				for (let i = 0; i < blocks.length; i++) {
					const curBlock = blocks[i];
					const curBlockText = curBlock?.text || curBlock?.content;
					if (curBlockText.includes(value)) {
						return true;
					}
				}
				return false;
			} else {
				return true;
			}
		},
		[blocks]
	);

	useEffect(() => {
		setIsDisplay(
			checkTitleSummaryNote(searchValue) || checkBlocksSummaryNote(searchValue)
		);
	}, [searchValue, checkTitleSummaryNote, checkBlocksSummaryNote]);
	return isDisplay;
};

export default useSearch;
