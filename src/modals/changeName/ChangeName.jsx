import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { postEntity, putEntity } from '../../store/actions/modules.js';
import { changeText } from '../../helpers/functions/formatText.js';
import Cross from '../Cross.jsx';
import styles from './ChangeName.module.css';
import MainButton from '../../UI/buttons/mainButton/MainButton.jsx';
import ClosePopup from '../../UI/svg/closePopup/ClosePopup.jsx';

const MAX_CHARS = {
	title: 128,
};

const ChangeName = ({ setOpen, type, id, content, position }) => {
	const dispatch = useDispatch();
	const { isError, isLoading, error } = useSelector((state) => state.modules);

	const [title, setTitle] = useState(content ? content : '');
	const [clickCompleted, setClickCompleted] = useState(false); // пока будет так

	const titleContent = {
		lesson: `${content ? 'Редактировать' : 'Новый'} урок`,
		module: `${content ? 'Редактировать' : 'Новый'} модуль`,
	};

	const createEntity = async () => {
		const config = {
			data: { title: title, position: position },
		};
		const courseId = window.location.pathname.match(/\/course\/(\d+)/)[1];
		if (!content) {
			config.params =
				type === 'lesson' ? { moduleId: id } : { courseId: id };

			dispatch(postEntity(type, courseId, config));
			setClickCompleted(true);
		} else {
			config.url = `/${id}`;
			dispatch(putEntity(type, courseId, config));
			setClickCompleted(true);
		}
	};

	useEffect(() => {
		if (clickCompleted && !isError && !isLoading) {
			setOpen(false);
		}
		!isLoading && setClickCompleted(false);
	}, [clickCompleted, isError, isLoading, error, setOpen]);

	return ReactDOM.createPortal(
		<div className={styles['modal-wrapper']}>
			<div className={styles['popup']}>
				<div className={styles['top-block']}>
					<h2 className={styles['title']}>
						{titleContent[type] || 'Неизвестный тип'}
					</h2>
					<ClosePopup onClick={() => setOpen(false)} />
				</div>
				<div className={styles['describe-block']}>
					<div className={styles['input-box']}>
						<input
							type="text"
							placeholder=" "
							required
							value={title}
							onChange={(e) =>
								changeText(
									e.target.value,
									MAX_CHARS['title'],
									(input) => setTitle(input)
								)
							}
						/>
						<span>Название</span>
					</div>
				</div>
				<div className={styles['btn-wrapper']}>
					<MainButton
						className={styles['half-parent']}
						onClick={() => setOpen(false)}
						type={'secondary'}
					>
						Отмена
					</MainButton>
					<MainButton
						className={styles['half-parent']}
						onClick={createEntity}
						type={title.length ? 'primary' : 'disabled'}
						disabled={!title.length}
					>
						Готово
					</MainButton>
				</div>
			</div>
		</div>,
		document.body
	);
};

export default ChangeName;
