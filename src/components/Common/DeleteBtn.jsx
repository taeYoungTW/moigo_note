import DeleteIcon from '@mui/icons-material/Delete';

const DeleteBtn = ({ className, handleDeleteBtnOnClick, style }) => {
	return (
		<button
			type="button"
			className={className}
			onClickCapture={handleDeleteBtnOnClick}
		>
			<DeleteIcon sx={style} />
		</button>
	);
};

export default DeleteBtn;
