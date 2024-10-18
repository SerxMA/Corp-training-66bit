import ViewHeader from './viewHeader/ViewHeader';

import styles from './View.module.css';
import CourseCard from './courseCard/CourseCard';

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
