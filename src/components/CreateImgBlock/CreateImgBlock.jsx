import { useEffect, useRef } from 'react';
import { BlockTypes } from '../../constants/constants';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import useIsPrevBlockToFocus from '../../hooks/useIsPrevBlockToFocus';
import useShortcuts from '../../hooks/useShortcuts';
import styles from './CreateImgBlock.scss';

const CreateImgBlock = ({ block, blockIndex }) => {
	/* ---- Global States & Actions ------------------------------ */
	const { _indexToFocus } = useAppState();
	const { _deleteBlock, _setIndexToFocus, _addTypeBlock } = useAppAction();

	/* ---- Ref -------------------------------------------------- */
	const imgRef = useRef(null);

	/* ---- Hooks -------------------------------------------------- */
	const { handleArrowKey, handleEnterKey, handleBackspaceKey } = useShortcuts();
	const { initIndexToFocus: handleOnBlur } = useIsPrevBlockToFocus(
		blockIndex,
		[_indexToFocus, _setIndexToFocus],
		imgRef
	);

	/* ---- EventHandlers ---------------------------------------- */
	// onKeyDown
	const handleOnKeyDown = (e) => {
		handleEnterKey(e, () => {
			_addTypeBlock(BlockTypes.TEXT, undefined, blockIndex + 1);
		});

		handleBackspaceKey(e, '', () => {
			_setIndexToFocus(blockIndex - 1);
			_deleteBlock(block.id);
		});

		handleArrowKey(
			e,
			() => _setIndexToFocus(blockIndex - 1),
			() => _setIndexToFocus(blockIndex + 1),
			true
		);
	};

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
