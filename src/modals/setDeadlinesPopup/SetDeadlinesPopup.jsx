import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { api } from '../../api/index.js';
import { postGroup, putGroupDeadlines } from '../../store/actions/groups.js';
import { convertArrayToDate } from '../../helpers/functions/convertArrayToDate.js';
import { toISOStringWithOffset } from '../../helpers/functions/toISOStringWithOffset.js';
import DeadlinesСalendar from '../deadlinesСalendar/DeadlinesСalendar.jsx';
import styles from './SetDeadlinesPopup.module.css';
import MainButton from '../../UI/buttons/mainButton/MainButton.jsx';

const SetDeadlinesPopup = ({ setOpen, allPopups, data }) => {
	const dispatch = useDispatch();
	const { modules } = useSelector((state) => state.modules);
	const { course } = useSelector((state) => state.course);
	const { isError, isLoading, error } = useSelector((state) => state.groups);
	const [deadlines, setDeadlines] = useState(false);
	const [currModules, setCurrModules] = useState(
		modules.map((module) => ({
			...module,
			deadlines: {
				moduleId: module.id,
				startTime: new Date(),
				endTime: new Date(0),
			},
		}))
	);
	const [selectModule, setSelectModule] = useState({});
	const [search, setSearch] = useState('');
	const [clickCompleted, setClickCompleted] = useState(false);

	console.log(currModules);

	const handleSubmitPost = () => {
		const config = {
			params: { courseId: course.id },
			data: {
				name: data.title,
				usernames: data.people,
				deadlines: currModules.map((module) => ({
					...module.deadlines,
					startTime: toISOStringWithOffset(
						module.deadlines.startTime
					),
					endTime: toISOStringWithOffset(module.deadlines.endTime),
				})),
			},
		};
		dispatch(postGroup(config, course.id));
		setClickCompleted(true);
	};

	const handleSubmitPut = () => {
		console.log(
			currModules.map((module) => ({
				...module.deadlines,
				startTime: toISOStringWithOffset(module.deadlines.startTime),
				endTime: toISOStringWithOffset(module.deadlines.endTime),
			})),
			'Отправка'
		);
		const config = {
			url: `/${data.id}/deadlines`,
			data: currModules.map((module) => ({
				...module.deadlines,
				startTime: toISOStringWithOffset(module.deadlines.startTime),
				endTime: toISOStringWithOffset(module.deadlines.endTime),
			})),
		};
		dispatch(putGroupDeadlines(config, course.id));
		setClickCompleted(true);
	};

	useEffect(() => {
		if (clickCompleted && !isError && !isLoading) {
			allPopups && allPopups.map((func) => func());
			setOpen(false);
		}

		!isLoading && setClickCompleted(false);
	}, [clickCompleted, isError, isLoading, error]);

	useEffect(() => {
		data.id &&
			api.groups
				.getGroupDedlines({ url: `/${data.id}/deadlines` })
				.then((res) => {
					res.data.deadlines.map((deadline) =>
						setCurrModules((cv) =>
							cv.map((obj) =>
								obj.deadlines.moduleId === deadline.module.id
									? {
											...obj,
											deadlines: {
												...obj.deadlines,
												startTime: convertArrayToDate(
													deadline.startTime
												),
												endTime: convertArrayToDate(
													deadline.endTime
												),
											},
									  }
									: obj
							)
						)
					);
				})
				.catch((error) => console.log(error));
	}, []);

	return ReactDOM.createPortal(
		<div className={styles['modal-wrapper']}>
			<div
				className={styles['popup']}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={styles['top-block']}>
					<h2 className={styles['title']}>Установите дедлайны</h2>
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
						<span>Модуль</span>
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
					<div className={styles['table-module']}>
						<div className={styles['column-name']}>
							<span>Модуль</span>
							<span>Дедлайн</span>
						</div>
						{currModules.map((module) => (
							<div key={module.id} className={styles.module}>
								<span>{module.title}</span>
								<span
									onClick={() => {
										setSelectModule(module);
										setDeadlines(true);
									}}
								>
									{module.deadlines.endTime.getTime() !==
									new Date(0).getTime()
										? module.deadlines.endTime.toLocaleString()
										: 'Установить'}
								</span>
							</div>
						))}
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
							data?.title ? handleSubmitPost : handleSubmitPut
						}
						type={
							currModules.some(
								(module) =>
									module.deadlines.endTime.getTime() ==
									new Date(0).getTime()
							)
								? 'sub-primary'
								: 'primary'
						}
						disabled={currModules.some(
							(module) =>
								module.deadlines.endTime.getTime() ==
								new Date(0).getTime()
						)}
					>
						Готово
					</MainButton>
				</div>
			</div>
			{deadlines && (
				<DeadlinesСalendar
					setOpen={setDeadlines}
					id={selectModule.id}
					title={selectModule.title}
					chengeDeadline={setCurrModules}
					data={
						selectModule.deadlines.endTime.getTime() !==
						new Date(0).getTime()
							? { date: selectModule.deadlines.endTime }
							: {}
					}
				/>
			)}
		</div>,
		document.body
	);
};

export default SetDeadlinesPopup;
