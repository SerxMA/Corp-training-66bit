import ViewHeader from './viewHeader/ViewHeader';

import styles from './View.module.css';

const View = () => {
	return (
		<div className={styles['view-wrapper']}>
			<ViewHeader />
			<div className={styles['temp-content']}>
				<h1>Some content</h1>
			</div>
		</div>
	);
};

export default View;
