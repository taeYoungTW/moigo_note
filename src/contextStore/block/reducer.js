import { v4 as uuid } from 'uuid';
import { BlockTypes } from '../../constants/constants';
import {
	ADD_BLOCK,
	DELETE_BLOCK,
	MOVE_BLOCK_TO_END,
	RESET_BLOCKS,
	SYNC_BLOCKS,
	UPDATE_BLOCK,
} from './types';

// Initial State
const initialState = { _blocks: [], _indexToFocus: -1 };

// Reducer
const reducer = (state = initialState, { type = '', payload = '' } = {}) => {
	switch (type) {
		case RESET_BLOCKS:
			return { ...state, _blocks: [] };
		case SYNC_BLOCKS:
			return { ...state, _blocks: [...payload] };
		case ADD_BLOCK:
			const { indexToAdd, type, dataUrl } = payload;
			if (indexToAdd) {
				const newBlocks = [...state._blocks];
				newBlocks.splice(indexToAdd, 0, blockObjectRouter(type, dataUrl));
				return { ...state, _blocks: newBlocks };
			}
			return {
				...state,
				_blocks: [...state._blocks, blockObjectRouter(type, dataUrl)],
			};
		case DELETE_BLOCK:
			const removed = state._blocks.filter((block) => block.id !== payload);
			return { ...state, _blocks: removed };
		case UPDATE_BLOCK:
			if (state._blocks.find((block) => block.id === payload.id)) {
				const newBlocks = state._blocks.map((block) => {
					if (block.id === payload.id) {
						return payload;
					} else {
						return block;
					}
				});
				return { ...state, _blocks: newBlocks };
			} else {
				return state;
			}
		case MOVE_BLOCK_TO_END:
			const newBlocks = [...state._blocks];
			const [movedItem] = newBlocks.splice(payload, 1);
			newBlocks.push(movedItem);
			return { ...state, _blocks: newBlocks };
		default:
			return state;
	}
};

function blockObjectRouter(type, dataUrl) {
	switch (type) {
		case BlockTypes.TEXT:
			return { id: uuid(), type, text: '' };
		case BlockTypes.CHECKLIST:
			return {
				id: uuid(),
				type,
				content: '',
				isDone: false,
			};
		case BlockTypes.IMAGE:
			return { id: uuid(), type, dataUrl };
		default:
			console.error(`${type} is invalid block type`);
			return undefined;
	}
}

export default reducer;
