import styles from './PaginationBar.module.css';

const PaginationBar = ({ minPage = 1, maxPage, currentPage, onPageChange }) => {
	return (
		<div className={styles.pagination}>
			<button
				className={
					currentPage === minPage ? styles['btn_disabled'] : ''
				}
				onClick={() => onPageChange((cv) => cv - 1)}
				disabled={currentPage === minPage}
			>
				-
			</button>
			<ul className={styles.pages}>
				{Array.from({ length: +maxPage }, (_, i) => i + 1).map(
					(val) => (
						<li key={val} onClick={() => onPageChange(val)}>
							{val}
						</li>
					)
				)}
			</ul>
			<button
				className={
					maxPage === currentPage ? styles['btn_disabled'] : ''
				}
				onClick={() => onPageChange((cv) => cv + 1)}
				disabled={maxPage === currentPage}
			>
				+
			</button>
		</div>
	);
};

export default PaginationBar;
