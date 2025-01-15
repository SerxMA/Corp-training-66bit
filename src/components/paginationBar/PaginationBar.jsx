import ChevronCompact from '../../UI/svg/chevronCompact/ChevronCompact.jsx';
import styles from './PaginationBar.module.css';

const PaginationBar = ({ minPage = 1, maxPage, currentPage, onPageChange }) => {
	return (
		<div className={styles.pagination}>
			<button
				className={`${styles.btn} ${
					minPage === currentPage ? styles['btn_disabled'] : ''
				}`}
				onClick={() => onPageChange((cv) => cv - 1)}
				disabled={currentPage === minPage}
			>
				<ChevronCompact classNames={styles.svg_rotate180} />
				Назад
			</button>
			<ul className={styles.pages}>
				{+maxPage > 5 && +currentPage - 3 > 0 && (
					<>
						<li
							className={styles.page}
							onClick={() => onPageChange(1)}
						>
							1
						</li>
						<li className={styles.dots}>...</li>
					</>
				)}
				{Array.from({ length: +maxPage > 5 ? 5 : +maxPage }, (_, i) => {
					const start = Math.max(
						1,
						Math.min(currentPage - 2, +maxPage - 4)
					);
					return start + i;
				}).map((val) => (
					<li
						key={val}
						className={`${styles.page} ${
							currentPage === val ? styles.page_current : ''
						}`}
						onClick={() => onPageChange(val)}
					>
						{val}
					</li>
				))}
				{+maxPage > 5 && +maxPage - +currentPage - 2 > 0 && (
					<>
						<li className={styles.dots}>...</li>
						<li
							className={styles.page}
							onClick={() => onPageChange(maxPage)}
						>
							{maxPage}
						</li>
					</>
				)}
			</ul>
			<button
				className={`${styles.btn} ${
					maxPage === currentPage ? styles['btn_disabled'] : ''
				}`}
				onClick={() => onPageChange((cv) => cv + 1)}
				disabled={maxPage === currentPage}
			>
				Вперед
				<ChevronCompact />
			</button>
		</div>
	);
};

export default PaginationBar;
