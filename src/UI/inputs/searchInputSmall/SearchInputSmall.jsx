import { useRef } from 'react';

import ClearText from '../../svg/clearText/ClearText.jsx';
import Search from '../../svg/search/Search.jsx';
import styles from './SearchInputSmall.module.css';

const SearchInputSmall = ({ value, onChange }) => {
	const inputRef = useRef(null);

	const close = (e) => {
		onChange({ target: { value: '' } });
		e.stopPropagation();
	};
	const handleFocus = () => {
		inputRef.current?.focus();
	};

	return (
		<div className={`${styles['search-box']}`} onClick={handleFocus}>
			<Search size={'small'} />
			<input
				ref={inputRef}
				type="text"
				placeholder=""
				className={styles['search-input']}
				value={value}
				onChange={onChange}
			/>
			{!!value.length && <ClearText onClick={close} />}
		</div>
	);
};

export default SearchInputSmall;
