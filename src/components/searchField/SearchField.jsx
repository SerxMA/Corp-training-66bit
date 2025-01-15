import { useState } from 'react';

import Loupe from './loupe/Loupe.jsx';
import styles from './SearchField.module.css';
import Tooltip from '../../UI/other/tooltip/Tooltip.jsx';

const SearchField = () => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [term, setTerm] = useState('');

	const handleChange = (event) => {
		setTerm(event.target.value);
	};

	const handleButtonClick = () => {
		setIsExpanded(!isExpanded);
	};

	const inputHasValue = term.trim().length > 0;

	return (
		<div
			className={`${styles['search-container']} ${
				isExpanded ? styles['expanded'] : ''
			} ${inputHasValue ? styles['input-filled'] : ''}`}
		>
			<div className={styles['loupe']} onClick={handleButtonClick}>
				<Loupe />
			</div>
			{isExpanded && (
				<input
					type="text"
					className={styles['search-input']}
					placeholder="Найти курс"
					value={term}
					onChange={handleChange}
				/>
			)}
			<Tooltip />
		</div>
	);
};

export default SearchField;
