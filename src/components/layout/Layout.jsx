import UserMain from '../../pages/userMain/UserMain';
import Header from '../header/Header';

import styles from './Layout.module.css';

const Layout = () => {
	return (
		<>
			<Header />
			<div className={styles.body}>
				<UserMain />
			</div>
		</>
	);
};

export default Layout;
