import { useSelector } from 'react-redux';

import Module from './module/Module.jsx';
import styles from './Modules.module.css';

const Modules = ({ type }) => {
	const { modules } = useSelector((state) => state.modules);

	return (
		<ul className={styles.modules}>
			{modules.length ? (
				modules.map((module, index) => (
					<Module key={index} type={type} module={module} />
				))
			) : (
				<h2 className={styles['modules-placeholder']}>Модулей нет</h2>
			)}
		</ul>
	);
};

export default Modules;
