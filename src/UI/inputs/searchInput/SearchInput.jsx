import Tooltip from '../../other/tooltip/Tooltip.jsx';
import ClearText from '../../svg/clearText/ClearText.jsx';
import Filter from '../../svg/filter/Filter.jsx';
import Search from '../../svg/search/Search.jsx';
import styles from './SearchInput.module.css';

const SearchInput = ({
	placeholder = 'placeholder',
	value,
	onChange,
	size = 'big',
}) => {
	const close = () => {
		onChange({ target: { value: '' } });
	};

	return (
		<div className={`${styles['search-box']} ${styles[size]}`}>
			<Search size={size} />
			<input
				type="text"
				placeholder=""
				className={styles['search-input']}
				value={value}
				onChange={onChange}
			/>
			<span>{placeholder}</span>
			{value && <ClearText onClick={close} />}
			{size === 'big' && <Filter />}
			<Tooltip />
		</div>
	);
};

export default SearchInput;
