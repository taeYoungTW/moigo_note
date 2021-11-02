import DeleteIcon from '@mui/icons-material/Delete';

const DeleteNoteBtn = ({
	className,
	handleDeleteBtnOnClick,
	fontSize,
	color,
}) => {
	return (
		<button className={className} onClickCapture={handleDeleteBtnOnClick}>
			<DeleteIcon
				sx={{
					fontSize,
					color,
				}}
			/>
		</button>
	);
};

export default DeleteNoteBtn;
