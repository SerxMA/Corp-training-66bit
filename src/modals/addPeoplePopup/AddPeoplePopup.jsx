import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { api } from '../../api/index.js';
import SetDeadlinesPopup from '../setDeadlinesPopup/SetDeadlinesPopup.jsx';
import Cross from '../Cross.jsx';
import ContinueArrow from '../../UI/continueArrow/ContinueArrow.jsx';
import avatar from '../../assets/images/Avatar.jpg';
import styles from './AddPeoplePopup.module.css';
import { putGroupUsers } from '../../store/actions/groups.js';

const AddPeoplePopup = ({ setOpen, allPopups, type, data }) => {
	const { course } = useSelector((state) => state.course);
	const { isError, isLoading, error } = useSelector((state) => state.groups);
	const dispatch = useDispatch();
	const [search, setSearch] = useState('');
	const [next, setNext] = useState(false);
	const [people, setPeople] = useState([]);
	const [clickCompleted, setClickCompleted] = useState(false);

	const toggleStatePeople = (username) => {
		setPeople((cv) =>
			cv.map((obj) =>
				obj.username === username ? { ...obj, state: !obj.state } : obj
			)
		);
	};

	const handleSubmit = () => {
		const config = {
			params: { courseId: course.id, groupId: data.id },
			data: people
				.filter((people) => people.state)
				.map((people) => people.username),
		};
		dispatch(putGroupUsers(config, course.id));
		setClickCompleted(true);
	};

	const tableContent = (
		<ul className={styles['people-list']}>
			{people.length
				? people.map((obj) => (
						<li
							key={obj.username}
							className={styles['people-elem']}
						>
							<div
								className={`${styles.state} ${
									obj.state ? styles.state_on : ''
								}`}
								onClick={() => toggleStatePeople(obj.username)}
							></div>
							<div className={styles['people-card']}>
								<img
									src={obj.avatarUrl}
									alt="Профиль"
									onClick={() =>
										toggleStatePeople(obj.username)
									}
									onError={(e) => {
										e.currentTarget.src = avatar;
									}}
								/>
								<div className={styles['people-info']}>
									<p>{obj.username}</p>
									<p>{obj.email}</p>
								</div>
							</div>
						</li>
				  ))
				: 'Пользователей нет'}
		</ul>
	);

	useEffect(() => {
		if (clickCompleted && !isError && !isLoading) setOpen(false);

		!isLoading && setClickCompleted(false);
	}, [clickCompleted, isError, isLoading, error]);

	useEffect(() => {
		data.title
			? api.members
					.getMembersForNewGroup({
						params: { courseId: course.id },
					})
					.then((res) =>
						setPeople(
							res.data.map((obj) => ({ ...obj, state: false }))
						)
					)
			: api.members
					.getMembersExclude({
						params: { courseId: course.id, groupId: data.id },
					})
					.then((res) =>
						setPeople(
							res.data.map((obj) => ({
								...obj.user,
								state: obj.inGroup,
							}))
						)
					);
	}, []);

	return ReactDOM.createPortal(
		<div className={styles['modal-wrapper']}>
			<div
				className={styles['popup']}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={styles['top-block']}>
					<h2 className={styles['title']}>
						{type === 'staff'
							? 'Добавьте сотрудников'
							: 'Добавьте участников'}
					</h2>
					<button
						className={styles['cross']}
						onClick={() => setOpen(false)}
					>
						<Cross />
					</button>
				</div>
				<div className={styles['describe-block']}>
					<div className={styles['search-box']}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
						>
							<path
								d="M19 19L13 13M1 8C1 8.91925 1.18106 9.82951 1.53284 10.6788C1.88463 11.5281 2.40024 12.2997 3.05025 12.9497C3.70026 13.5998 4.47194 14.1154 5.32122 14.4672C6.1705 14.8189 7.08075 15 8 15C8.91925 15 9.82951 14.8189 10.6788 14.4672C11.5281 14.1154 12.2997 13.5998 12.9497 12.9497C13.5998 12.2997 14.1154 11.5281 14.4672 10.6788C14.8189 9.82951 15 8.91925 15 8C15 7.08075 14.8189 6.1705 14.4672 5.32122C14.1154 4.47194 13.5998 3.70026 12.9497 3.05025C12.2997 2.40024 11.5281 1.88463 10.6788 1.53284C9.82951 1.18106 8.91925 1 8 1C7.08075 1 6.1705 1.18106 5.32122 1.53284C4.47194 1.88463 3.70026 2.40024 3.05025 3.05025C2.40024 3.70026 1.88463 4.47194 1.53284 5.32122C1.18106 6.1705 1 7.08075 1 8Z"
								stroke="var(--content-secondary)"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<input
							type="text"
							placeholder=""
							className={styles['search-input']}
							value={search}
							onChange={(e) =>
								setSearch(
									e.target.value
										.trimStart()
										.replace('  ', ' ')
								)
							}
						/>
						<span>
							{type === 'staff' ? 'Сотрудник' : 'Участник'}
						</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M4 4H20V6.172C19.9999 6.70239 19.7891 7.21101 19.414 7.586L15 12V19L9 21V12.5L4.52 7.572C4.18545 7.20393 4.00005 6.7244 4 6.227V4Z"
								stroke="var(--content-secondary)"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
					<div className={styles['table-box']}>
						<p className={styles['table-title']}>
							{type === 'staff' ? 'Сотрудник' : 'Участник'}
						</p>
						{tableContent}
					</div>
				</div>
				<div className={styles['btn-wrapper']}>
					<button
						className={`${styles.btn} ${styles.btn_cancel}`}
						onClick={() => setOpen(false)}
					>
						{data?.title ? 'Назад' : 'Отмена'}
					</button>
					<button
						className={`${styles['btn']} ${styles['btn_success']}`}
						onClick={
							data?.title ? () => setNext(true) : handleSubmit
						}
					>
						{data?.title ? (
							<>
								Продолжить
								<ContinueArrow />
							</>
						) : (
							'Готово'
						)}
					</button>
				</div>
			</div>
			{next && (
				<SetDeadlinesPopup
					setOpen={setNext}
					allPopups={[...allPopups, setNext]}
					data={{
						...data,
						people: people
							.filter((people) => people.state)
							.map((people) => people.username),
					}}
				/>
			)}
		</div>,
		document.body
	);
};

export default AddPeoplePopup;
