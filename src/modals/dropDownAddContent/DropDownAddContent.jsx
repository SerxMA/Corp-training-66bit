import Photo from './icons/photo/Photo.jsx';
import Video from './icons/video/Video.jsx';
import FileText from './icons/fileText/FileText.jsx';
import OneOptionTest from './icons/oneOptionTest/OneOptionTest.jsx';
import MoreOptionTest from './icons/moreOptionTest/MoreOptionTest.jsx';
import Edit from './icons/edit/Edit.jsx';
import Attach from './icons/attach/Attach.jsx';
import styles from './DropDownAddContent.module.css';

const DropDownAddContent = () => {
	return (
		<div className={styles['drop-down']}>
			<div className={styles.content}>
				<span>Материалы</span>
				<button>
					<Photo />
					Фото
				</button>
				<button>
					<Video />
					Видео
				</button>
				<button>
					<FileText />
					Текст
				</button>
			</div>
			<div className={styles.tasks}>
				<span>Задания</span>
				<button>
					<OneOptionTest />
					Одиночный ответ
				</button>
				<button>
					<MoreOptionTest />
					Множественный ответ
				</button>
				<button>
					<Edit />
					Краткий ответ
				</button>
				<button>
					<Attach />
					Развернутый ответ
				</button>
			</div>
		</div>
	);
};

export default DropDownAddContent;
