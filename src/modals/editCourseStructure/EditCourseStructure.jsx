import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Dots from '../Dots.jsx';
import CourseStructureActions from '../courseStructureActions/CourseStructureActions.jsx';
import SearchField from '../../components/searchField/SearchField.jsx';
import ChangeName from '../changeName/ChangeName.jsx';
import Modules from '../../components/modules/Modules.jsx';
import styles from './EditCourseStructure.module.css';
import MainButton from '../../UI/buttons/mainButton/MainButton.jsx';

const EditCourseStructure = ({ setOpen, course }) => {
	const [courseActions, setCourseActions] = useState(false);
	const [newModule, setNewModule] = useState(false);

	useEffect(() => {
		const closePopup = () => {
			console.log(12343234);
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
						onClick={() => setOpen(false)}
						type={'secondary'}
					>
						Назад
					</MainButton>
					<MainButton onClick={() => setOpen(false)}>
						Готово
					</MainButton>
				</div>
				{newModule && (
					<ChangeName
						setOpen={setNewModule}
						type={'module'}
						id={course.id}
						// position={}
					/>
				)}
			</div>
		</div>,
		document.body
	);
};

export default EditCourseStructure;
