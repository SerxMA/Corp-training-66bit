import ViewHeader from './viewHeader/ViewHeader';
import styles from './View.module.css';

const View = () => {

	return (
		<div className={styles['view-wrapper']}>
			<ViewHeader />
			<div className={styles['courses-wrapper']}>
			</div>
		</div>
	);
};

export default View;
