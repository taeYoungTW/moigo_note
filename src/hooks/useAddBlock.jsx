import { useCallback } from 'react';
import { v4 as uuid } from 'uuid';

const useAddBlock = (_addBlockAction, callback = () => '') => {
	const handleAddBlockBtnOnClick = useCallback(
		(type) => {
			callback();
			switch (type) {
				case 'text':
					_addBlockAction({ id: uuid(), type, text: '' });
					break;
				case 'checklist':
					_addBlockAction({
						id: uuid(),
						type,
						content: '',
						isDone: false,
					});
					break;
				default:
					break;
			}
		},
		[_addBlockAction, callback]
	);

	return handleAddBlockBtnOnClick;
};
export default useAddBlock;
