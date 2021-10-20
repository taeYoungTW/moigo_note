import './Header.scss';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import MinimizeIcon from '@mui/icons-material/Minimize';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import CtrlBtn from './CtrlBtn';

const Header = () => (
	<header>
		<div className="align_left">
			<div className="title_ctnr">
				<h1 className="logo">MoiGo</h1>
				<h2 className="title">노트</h2>
			</div>
			<div className="search_ctnr">
				<SearchIcon
					sx={{ fontSize: 18, marginRight: '10px', color: '#767676' }}
				/>
				<input className="search_input" type="text" placeholder="검색" />
			</div>
		</div>
		<div className="window_ctrl">
			<CtrlBtn Icon={MinimizeIcon} />
			<CtrlBtn Icon={CropSquareIcon} />
			<CtrlBtn Icon={CloseIcon} />
		</div>
	</header>
);

export default Header;
