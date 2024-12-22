import ClearText from '../../svg/clearText/ClearText.jsx';
import Filter from '../../svg/filter/Filter.jsx';
import Search from '../../svg/search/Search.jsx';
import styles from './SearchInput.module.css';

const SearchInput = ({ placeholder, value, onChange }) => {
	const close = () => {
		onChange({ target: { value: '' } });
	};

	return (
		<div className={styles['search-box']}>
			<Search />
			<input
				type="text"
				placeholder=""
				className={styles['search-input']}
				value={value}
				onChange={onChange}
			/>
			<span>{placeholder}</span>
			{value && <ClearText onClick={close} />}
			<Filter />
		</div>
	);
};

export default SearchInput;
