import './Header.scss';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import { MOIGO_TEXT, NOTE_TEXT, SEARCH_TEXT } from '../../constants/constants';
import { useAppAction } from '../../contexts/AppStateContext';
import { useCallback } from 'react';
import { HEADER_SEARCH_ICON_STYLE } from '../../constants/iconStyles';
import CtrlWindowBtn from '../CtrlWindowBtn/CtrlWindowBtn';

const Header = () => {
	// Global States, Actions ---------------------------------------
	const { _setSearchInput } = useAppAction();
	// Render -------------------------------------------------------
	const handleSearchInputOnChange = useCallback(
		(e) => {
			const {
				target: { value },
			} = e;
			_setSearchInput(value);
		},
		[_setSearchInput]
	);
	return (
		<>
			<div className="align-left">
				<div className="title-container">
					<h1 className="logo">{MOIGO_TEXT}</h1>
					<h2 className="title">{NOTE_TEXT}</h2>
				</div>
				<div className="search-container">
					<SearchIcon sx={HEADER_SEARCH_ICON_STYLE} />
					<input
						className="search-input"
						type="text"
						placeholder={SEARCH_TEXT}
						onChange={handleSearchInputOnChange}
					/>
				</div>
			</div>
			<div className="window-ctrl">
				<CtrlWindowBtn Icon={MinimizeIcon} />
				<CtrlWindowBtn Icon={CropSquareIcon} />
				<CtrlWindowBtn Icon={CloseIcon} />
			</div>
		</>
	);
};

export default Header;
