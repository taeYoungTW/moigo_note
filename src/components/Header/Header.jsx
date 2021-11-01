import './Header.scss';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import {
	MOIGO_TEXT,
	NOTE_TEXT,
	SEARCH_ICON_COLOR,
	SEARCH_ICON_FONT_SIZE,
	SEARCH_ICON_MARGIN_RIGHT,
	SEARCH_TEXT,
} from '../../constants/constants';
import CtrlWindowBtn from './CtrlWindowBtn';

const Header = () => {
	// Global States, Actions ---------------------------------------

	// Render -------------------------------------------------------
	return (
		<>
			<div className="align_left">
				<div className="title_ctnr">
					<h1 className="logo">{MOIGO_TEXT}</h1>
					<h2 className="title">{NOTE_TEXT}</h2>
				</div>
				<div className="search_ctnr">
					<SearchIcon
						sx={{
							fontSize: SEARCH_ICON_FONT_SIZE,
							marginRight: SEARCH_ICON_MARGIN_RIGHT,
							color: SEARCH_ICON_COLOR,
						}}
					/>
					<input
						className="search_input"
						type="text"
						placeholder={SEARCH_TEXT}
					/>
				</div>
			</div>
			<div className="window_ctrl">
				<CtrlWindowBtn Icon={MinimizeIcon} />
				<CtrlWindowBtn Icon={CropSquareIcon} />
				<CtrlWindowBtn Icon={CloseIcon} />
			</div>
		</>
	);
};

export default Header;
