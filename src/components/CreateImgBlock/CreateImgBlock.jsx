import { useEffect, useRef } from 'react';
import { BlockTypes } from '../../constants/constants';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import {
	handleBlockWithArrowKey,
	handleBlockWithBackspaceKey,
	handleBlockWithEnterKey,
} from '../../utils/handleBlockOnkeyDown';
import styles from './CreateImgBlock.scss';

const CreateImgBlock = ({ block, blockIndex }) => {
	/* ---- Global States & Actions ------------------------------ */
	const { _indexToFocus } = useAppState();
	const { _deleteBlock, _setIndexToFocus, _addTypeBlock } = useAppAction();

	/* ---- Ref -------------------------------------------------- */
	const imgRef = useRef(null);

	/* ---- EventHandlers ---------------------------------------- */
	// onKeyDown
	const handleOnKeyDown = (e) => {
		handleBlockWithEnterKey(e, () => {
			_addTypeBlock(BlockTypes.TEXT, undefined, blockIndex + 1);
		});

		handleBlockWithBackspaceKey(e, '', () => {
			_setIndexToFocus(blockIndex - 1);
			_deleteBlock(block.id);
		});

		handleBlockWithArrowKey(
			e,
			() => _setIndexToFocus(blockIndex - 1),
			() => _setIndexToFocus(blockIndex + 1),
			true
		);
	};

	// onBlur
	// Clean Up (For Checking a Change in useIsPrevBlockToFocus hook or like useEffect)
	const handleOnBlur = () => {
		if (_indexToFocus === -1) {
			return;
		}
		_setIndexToFocus(-1);
	};

	/* ---- useEffects ---------------------------------------- */
	// For focusing with ArrowKey
	useEffect(() => {
		if (blockIndex === _indexToFocus) {
			imgRef.current.focus();
		}
	}, [blockIndex, _indexToFocus]);

	// For focusing when it was mounted at first
	useEffect(() => {
		imgRef.current.focus();
	}, []);

	/* ---- Render ---------------------------------------- */
	return (
		<img
			tabIndex={0}
			ref={imgRef}
			src={block.dataUrl}
			alt="img_block"
			className={styles.img}
			onKeyDown={handleOnKeyDown}
			onBlur={handleOnBlur}
		/>
	);
};

export default CreateImgBlock;
