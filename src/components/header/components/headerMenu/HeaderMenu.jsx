import Actions from './components/actions/Actions';
import Avatar from './components/avatar/Avatar';

import styles from './HeaderMenu.module.css';

const HeaderMenu = () => {
	return (
		<div className={styles['header-actions']}>
			<Avatar />
			<Actions />
		</div>
	);
};

export default HeaderMenu;
