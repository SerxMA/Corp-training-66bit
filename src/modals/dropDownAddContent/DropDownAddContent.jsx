import Photo from './icons/photo/Photo.jsx';
import Video from './icons/video/Video.jsx';
import FileText from './icons/fileText/FileText.jsx';
import OneOptionTest from './icons/oneOptionTest/OneOptionTest.jsx';
import MoreOptionTest from './icons/moreOptionTest/MoreOptionTest.jsx';
import Edit from './icons/edit/Edit.jsx';
import Attach from './icons/attach/Attach.jsx';
import styles from './DropDownAddContent.module.css';

const DropDownAddContent = ({ isTop, setOpen, config }) => {
	const handleClick = (e, key) => {
		setOpen(false);
		config[key](true);
		e.stopPropagation();
	};

	return (
		<div
			className={`${styles['drop-down']} ${
				isTop ? '' : styles['position-bottom']
			}`}
			onClick={(e) => e.stopPropagation()}
		>
			<div className={styles.content}>
				<span>Материалы</span>
				<button onClick={(e) => handleClick(e, 'photo')}>
					<Photo />
					Фото
				</button>
				<button onClick={(e) => handleClick(e, 'video')}>
					<Video />
					Видео
				</button>
				<button onClick={(e) => handleClick(e, 'fileText')}>
					<FileText />
					Текст
				</button>
			</div>
			<div className={styles.tasks}>
				<span>Задания</span>
				<button onClick={(e) => handleClick(e, 'oneOptionTest')}>
					<OneOptionTest />
					Одиночный ответ
				</button>
				<button onClick={(e) => handleClick(e, 'moreOptionTest')}>
					<MoreOptionTest />
					Множественный ответ
				</button>
				<button onClick={(e) => handleClick(e, 'edit')}>
					<Edit />
					Краткий ответ
				</button>
				<button onClick={(e) => handleClick(e, 'attach')}>
					<Attach />
					Свободная форма
				</button>
			</div>
		</div>
	);
};

export default DropDownAddContent;
