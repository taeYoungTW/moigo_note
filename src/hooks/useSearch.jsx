import { useCallback, useEffect, useState } from 'react';

/* 
setState 값 비교 -> 최적화
*/

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
					if (curBlock.type === 'image') {
						continue;
					}
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
