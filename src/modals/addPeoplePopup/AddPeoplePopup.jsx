import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { api } from '../../api/index.js';
import SetDeadlinesPopup from '../setDeadlinesPopup/SetDeadlinesPopup.jsx';
import {
	putGroupUsers,
	putGroupUsersFromUsersPage,
} from '../../store/actions/groups.js';
import MainButton from '../../UI/buttons/mainButton/MainButton.jsx';
import SearchInput from '../../UI/inputs/searchInput/SearchInput.jsx';
import { changeText } from '../../helpers/functions/formatText.js';
import ProfileInfoCard from '../../components/profileInfoCard/ProfileInfoCard.jsx';
import Checkbox from '../../UI/inputs/checkbox/Checkbox.jsx';
import ClosePopup from '../../UI/svg/closePopup/ClosePopup.jsx';
import styles from './AddPeoplePopup.module.css';

const AddPeoplePopup = ({ setOpen, allPopups, type, data }) => {
	const { course } = useSelector((state) => state.course);
	const { isError: isErrorGroups, isLoading: isLoadingGroups } = useSelector(
		(state) => state.groups
	);
	const { isError: isErrorMembers, isLoading: isLoadingMembers } =
		useSelector((state) => state.members);
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
			params: {
				courseId: course.id,
				[data ? 'groupId' : 'default']: data ? data.id : true,
			},
			data: people
				.filter((people) => people.state)
				.map((people) => people.username),
		};
		data
			? dispatch(putGroupUsers(config, course.id))
			: dispatch(putGroupUsersFromUsersPage(config, course.id));
		setClickCompleted(true);
	};

	const tableContent = (
		<ul className={styles['people-list']}>
			{people.length ? (
				people.map((obj) => (
					<li key={obj.username} className={styles['people-elem']}>
						<Checkbox
							state={obj.state}
							onClick={() => toggleStatePeople(obj.username)}
						/>
						<ProfileInfoCard
							avatar={obj.avatarUrl}
							username={obj.username}
							email={obj.email}
							onClick={() => toggleStatePeople(obj.username)}
						/>
					</li>
				))
			) : (
				<p className={styles['no-users']}> Пользователей нет</p>
			)}
		</ul>
	);

	useEffect(() => {
		if (
			clickCompleted &&
			(!isErrorGroups || !isErrorMembers) &&
			(!isLoadingGroups || !isLoadingMembers)
		)
			setOpen(false);

		(!isLoadingGroups || !!isLoadingMembers) && setClickCompleted(false);
	}, [
		clickCompleted,
		isErrorGroups,
		isLoadingGroups,
		isErrorMembers,
		isLoadingMembers,
	]);

	useEffect(() => {
		data
			? data.title
				? api.members
						.getMembersForNewGroup({
							params: { courseId: course.id },
						})
						.then((res) =>
							setPeople(
								res.data.content.map((obj) => ({
									...obj,
									state: false,
								}))
							)
						)
				: api.members
						.getMembersCurrent({
							params: { courseId: course.id, groupId: data.id },
						})
						.then((res) =>
							setPeople(
								res.data.content.map((obj) => ({
									...obj.user,
									state: obj.inGroup,
								}))
							)
						)
			: api.members
					.getMembersExclude({
						params: { courseId: course.id },
					})
					.then((res) =>
						setPeople(
							res.data.content.map((obj) => ({
								...obj,
								state: false,
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
					<ClosePopup onClick={() => setOpen(false)} />
				</div>
				<div className={styles['describe-block']}>
					<SearchInput
						value={search}
						onChange={(e) =>
							changeText(e.target.value, 512, (text) =>
								setSearch(text)
							)
						}
						placeholder={'Поиск'}
					/>
					<div className={styles['table-box']}>
						<p className={styles['table-title']}>
							{type === 'staff' ? 'Сотрудник' : 'Участник'}
						</p>
						{tableContent}
					</div>
				</div>
				<div className={styles['btn-wrapper']}>
					<MainButton
						className={styles['half-parent']}
						onClick={() => setOpen(false)}
						type={'secondary'}
					>
						{data?.title ? 'Назад' : 'Отмена'}
					</MainButton>
					<MainButton
						className={styles['half-parent']}
						onClick={
							data?.title ? () => setNext(true) : handleSubmit
						}
						sequel={data?.title}
					>
						{data?.title ? 'Продолжить' : 'Готово'}
					</MainButton>
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
