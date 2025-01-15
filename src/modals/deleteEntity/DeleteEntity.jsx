import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { deleteCourse } from '../../store/actions/course';
import { deleteEntity } from '../../store/actions/modules';
import { deleteContents } from '../../store/actions/contents';
import { deleteGroup, putGroupExcludeUsers } from '../../store/actions/groups';
import MainButton from '../../UI/buttons/mainButton/MainButton.jsx';
import DangerButton from '../../UI/buttons/dangerButton/DangerButton.jsx';
import ico from '../../assets/images/danger.png';
import styles from './DeleteEntity.module.css';

const identificationType = {
	course: { sec: 10, string: 'курс' },
	module: { sec: 5, string: 'модуль' },
	lesson: { sec: -1, string: 'урок' },
	task: { sec: -1, string: 'задание' },
	group: { sec: -1, string: 'группу' },
	groupExclude: { sec: 5, string: 'группу' },
	member: { sec: -1, string: 'участника' },
	members: { sec: -1, string: 'участников' },
};

const DeleteEntity = ({ setOpen, type, content, id, data }) => {
	const dispatch = useDispatch();
	const { isError: isErrorModules, isLoading: isLoadingModules } =
		useSelector((state) => state.modules);
	const { isError: isErrorMembers, isLoading: isLoadingMembers } =
		useSelector((state) => state.members);
	const navigate = useNavigate();

	const [second, setSecond] = useState(identificationType[type]?.sec || -1);
	const [clickCompleted, setClickCompleted] = useState(false); // пока будет так

	const timer = () => {
		const intervalId = setInterval(() => {
			setSecond((cv) => {
				if (cv <= 0) {
					clearInterval(intervalId);
					return -1;
				}
				return cv - 1;
			});
		}, 1000);
	};

	const handleSubmit = () => {
		const courseId = window.location.pathname.match(/\/course\/(\d+)/)[1];
		switch (type) {
			case 'course':
				dispatch(deleteCourse(courseId)).then(() =>
					setClickCompleted(true)
				);
				break;
			case 'task':
				dispatch(
					deleteContents(
						window.location.pathname.match(
							/\/course\/\d+\/(\d+)/
						)[1],
						{ url: id }
					)
				).then(() => setClickCompleted(true));
				break;
			case 'group':
				dispatch(
					deleteGroup(
						{
							url: id,
							params: { courseId: courseId, exclude: false },
						},
						courseId
					)
				).then(() => setClickCompleted(true));
				break;
			case 'groupExclude':
				dispatch(
					deleteGroup(
						{
							url: id,
							params: { courseId: courseId, exclude: true },
						},
						courseId
					)
				).then(() => setClickCompleted(true));
				break;
			case 'member':
				dispatch(
					putGroupExcludeUsers(
						{ params: { courseId }, data },
						courseId
					)
				);
				setClickCompleted(true);
				break;
			case 'members':
				dispatch(
					putGroupExcludeUsers(
						{ params: { courseId }, data },
						courseId
					)
				);
				setClickCompleted(true);
				break;

			default:
				dispatch(deleteEntity(type, id, courseId)).then(() =>
					setClickCompleted(true)
				);
				break;
		}
	};

	useEffect(() => {
		timer();
	}, []);

	useEffect(() => {
		if (
			clickCompleted &&
			(!isErrorModules || !isErrorMembers) &&
			(!isLoadingModules || !isLoadingMembers)
		) {
			type === 'course' ? navigate('/courses') : setOpen(false);
		}
		(!isErrorModules || !isErrorMembers) && setClickCompleted(false);
	}, [
		clickCompleted,
		isErrorModules,
		isLoadingModules,
		isErrorMembers,
		isLoadingMembers,
	]);

	return ReactDOM.createPortal(
		<div
			className={styles['modal-wrapper']}
			onClick={(e) => e.stopPropagation()}
		>
			<div className={styles['popup']}>
				<div className={styles['top-block']}>
					<img src={ico} alt="Знак опасно" />
				</div>
				<div className={styles.body}>
					<p className={styles.question}>
						Вы уверены, что хотите удалить{' '}
						{identificationType[type]?.string || 'неизвестный тип'}
						{content ? (
							<>
								<br />
								<span>{content}?</span>
							</>
						) : (
							'?'
						)}
					</p>
					<p className={styles.desciption}>
						Это действие не может быть отменено.
						<br />
						Удалив{' '}
						{identificationType[type]?.string ||
							'неизвестный тип'},{' '}
						{type === 'member' || type === 'member'
							? 'вы не сможете восстановить весь набранный прогресс.'
							: type === 'groupExclude'
							? 'вы потеряете все внесенные данные и не сможете восстановить весь набранный прогресс.'
							: 'вы потеряете все внесенные данные.'}
					</p>
				</div>
				<div className={styles['btn-wrapper']}>
					<MainButton
						className={styles['half-parent']}
						onClick={() => setOpen(false)}
						type={'secondary'}
					>
						Отмена
					</MainButton>
					<DangerButton
						className={styles['half-parent']}
						onClick={handleSubmit}
						type={second < 0 ? 'secondary' : 'disabled'}
						disabled={second >= 0}
					>
						{second >= 0 ? `Удалить (${second} c.)` : 'Удалить'}
					</DangerButton>
				</div>
			</div>
		</div>,
		document.body
	);
};

export default DeleteEntity;
