import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import './CheckBoxInput.scss';
import { CHECKBOX_ICON_STYLE } from '../../constants/iconStyles';

const CheckBoxInput = ({ isDone, handleCheckBoxOnChange }) => {
	return (
		<>
			<label className="checkbox_label">
				{isDone ? (
					<CheckBoxIcon sx={CHECKBOX_ICON_STYLE} />
				) : (
					<CheckBoxOutlineBlankIcon sx={CHECKBOX_ICON_STYLE} />
				)}
				<input
					type="checkbox"
					className="checkbox_input"
					checked={isDone}
					onChange={handleCheckBoxOnChange}
				/>
			</label>
		</>
	);
};

export default CheckBoxInput;
