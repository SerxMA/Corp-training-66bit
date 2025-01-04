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
import SearchInput from '../../UI/inputs/searchInput/SearchInput.jsx';

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

	console.log(modules);

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
					<SearchInput
						value={search}
						onChange={(e) =>
							setSearch(
								e.target.value.trimStart().replace('  ', ' ')
							)
						}
						placeholder={'Модуль'}
					/>
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
