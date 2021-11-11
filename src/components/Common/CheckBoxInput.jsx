import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { CHECKBOX_ICON_STYLE } from '../../constants/iconStyles';

const CheckBoxInput = ({
	blockId,
	isDone,
	location,
	handleCheckBoxOnChange,
}) => {
	return (
		<>
			<label htmlFor={`${location}_${blockId}`} className="checkbox_label">
				{isDone ? (
					<CheckBoxIcon sx={CHECKBOX_ICON_STYLE} />
				) : (
					<CheckBoxOutlineBlankIcon sx={CHECKBOX_ICON_STYLE} />
				)}
			</label>
			<input
				type="checkbox"
				id={`${location}_${blockId}`}
				className="checkbox_input"
				checked={isDone}
				onChange={handleCheckBoxOnChange}
			/>
		</>
	);
};

export default CheckBoxInput;
