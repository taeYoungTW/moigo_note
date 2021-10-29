/*
 * - useValidation
 * Validtaion을 위한 Hooks를 모아 관리하여 필요한 경우 재사용하려고 합니다.
 * React 규정상 컴포넌트의 useCallback 내부에서는 Custom hooks를 사용할 수 없습니다.
 * 그렇기에, useValidation 파일에는 hooks를 사용하지 않은 함수도 존재합니다.
 * React의 경우 use라는 prefix를 붙여 식별자를 사용하면, 해당 함수를 hooks로 판단하여 경고를 보냅니다.
 * 그래서 일반 함수의 경우 use를 생략하고, hooks를 사용한 것은 use를 붙일 예정입니다.
 */

export const filterEmptyTextBlock = (oldBlocks) => {
	const newBlocks = oldBlocks.filter((block) => {
		if (block.text === '') {
			return false;
		}
		return true;
	});
	return newBlocks;
};
