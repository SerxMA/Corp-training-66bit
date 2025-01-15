import { changeText } from '../../helpers/functions/formatText.js';
import ChevronCompact from '../../UI/svg/chevronCompact/ChevronCompact.jsx';
import styles from './DropDownGroup.module.css';

const DropDownGroup = ({
	text = 'Разные группы',
	setText,
	stateSVG = false,
	setStateSVG = () => {},
}) => {
	return (
		<div
			className={styles['drop-down']}
			onClick={() => setStateSVG((cv) => !cv)}
		>
			<div className={styles['content']}>
				<input
					type="text"
					placeholder=""
					className={styles['title-input']}
					value={text}
					onChange={(e) =>
						changeText(e.target.value, 128, (text) => setText(text))
					}
				/>
				<span>Группа</span>
			</div>
			<ChevronCompact
				classNames={`${styles.svg} ${
					stateSVG ? styles['svg_rotate-90'] : styles['svg_rotate90']
				}`}
			/>
		</div>
	);
};

export default DropDownGroup;
