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
		const result =
			checkTitleSummaryNote(searchValue) || checkBlocksSummaryNote(searchValue);
		if (isDisplay !== result) {
			setIsDisplay(result);
		}
	}, [searchValue, checkTitleSummaryNote, checkBlocksSummaryNote, isDisplay]);
	// dependency에 isDisplay 넣을지 고민입니다, isDisplay 넣으면 더 많이 useEffect가 실행 됩니다. missing dependency warning lint가 신경쓰입니다.

	return isDisplay;
};

export default useSearch;
