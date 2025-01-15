import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { api } from '../../api/index.js';
import { getCourseSuccess } from '../../store/actionCreators/course.js';
import Dots from '../Dots.jsx';
import CourseStructureActions from '../courseStructureActions/CourseStructureActions.jsx';
import SearchField from '../../components/searchField/SearchField.jsx';
import ChangeName from '../changeName/ChangeName.jsx';
import Modules from '../../components/modules/Modules.jsx';
import MainButton from '../../UI/buttons/mainButton/MainButton.jsx';
import styles from './EditCourseStructure.module.css';

const EditCourseStructure = ({ setOpen, course }) => {
	const dispatch = useDispatch();
	const { modules } = useSelector((state) => state.modules);
	const { id } = useParams();
	const [courseActions, setCourseActions] = useState(false);
	const [newModule, setNewModule] = useState(false);

	const toastTimeoutRef = useRef(null);

	const publish = () => {
		toast.dismiss();
		api.courses
			.putCoursePublish({
				params: { publish: !course?.published },
				url: `/${id}/publish`,
			})
			.then((res) => {
				dispatch(getCourseSuccess(res.data));
				if (toastTimeoutRef.current) {
					clearTimeout(toastTimeoutRef.current);
				}

				toastTimeoutRef.current = setTimeout(() => {
					if (res.data.published) {
						toast.success('Курс опубликован', {
							toastId: 'published',
						});
					} else {
						toast.success('Курс снят с публикации', {
							toastId: 'unPublished',
						});
					}
				}, 250);
			});
	};

	useEffect(() => {
		const closePopup = () => {
			setOpen(false);
		};

		document.body.style.overflowY = 'hidden';
		document.addEventListener('click', closePopup);

		return () => {
			document.body.style.overflowY = 'unset';
			document.removeEventListener('click', closePopup);
		};
	}, []);

	return ReactDOM.createPortal(
		<div className={styles['modal-wrapper']}>
			<div
				className={styles['popup']}
				onClick={(e) => {
					e.stopPropagation();
					setCourseActions(false);
				}}
			>
				<div className={styles['top-block']}>
					<h2 className={styles['title']}>Структура курса</h2>
					<button
						className={styles['dots']}
						onClick={(e) => {
							e.stopPropagation();
							setCourseActions((cv) => !cv);
						}}
					>
						<Dots />
					</button>
					{courseActions && (
						<CourseStructureActions course={course} />
					)}
				</div>
				<div className={styles['describe-block']}>
					<div className={styles['manage-block']}>
						<SearchField />
						<button onClick={() => setNewModule(true)}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
							>
								<path
									d="M9.99935 4.16699V15.8337M4.16602 10.0003H15.8327"
									stroke="var(--accent-primary)"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							Добавить модуль
						</button>
					</div>
					<div className={styles['table-box']}>
						<Modules type={'edit'} />
					</div>
				</div>
				<div className={styles['btn-wrapper']}>
					<MainButton
						className={styles.btn}
						onClick={() => setOpen(false)}
						type={'secondary'}
					>
						Назад
					</MainButton>
					<MainButton className={styles.btn} onClick={publish}>
						{course?.published
							? 'Снять с публикации'
							: 'Опубликовать курс'}
					</MainButton>
				</div>
				{newModule && (
					<ChangeName
						setOpen={setNewModule}
						type={'module'}
						id={course.id}
						position={
							modules.length
								? +modules[modules.length - 1].position + 1
								: 0
						}
					/>
				)}
			</div>
		</div>,
		document.body
	);
};

export default EditCourseStructure;
