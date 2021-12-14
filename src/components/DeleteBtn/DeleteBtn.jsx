import DeleteIcon from '@mui/icons-material/Delete';

const DeleteBtn = ({ className, onClick, style }) => {
	return (
		<button type="button" className={className} onClickCapture={onClick}>
			<DeleteIcon sx={style} />
		</button>
	);
};

export default DeleteBtn;
