import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import DropDownGroup from '../../components/dropDownGroup/DropDownGroup.jsx';
import { getGroups, putGroupMoveUsers } from '../../store/actions/groups.js';
import RadioButton from '../../UI/radioButton/RadioButton.jsx';
import MainButton from '../../UI/buttons/mainButton/MainButton.jsx';
import styles from './RelocateMember.module.css';

const RelocateMember = ({ setOpen, group, users, courseId }) => {
	const dispatch = useDispatch();
	const { groups } = useSelector((state) => state.groups);
	const { isError, isLoading, error } = useSelector((state) => state.members);
	const [currGroups, setCurrGroups] = useState([]);
	const [showGroups, setShowGroups] = useState(false);
	const [clickCompleted, setClickCompleted] = useState(false);

	const toggleStateGroup = (id) => {
		setCurrGroups((cv) =>
			cv.map((obj) =>
				obj.id === id
					? { ...obj, state: !obj.state }
					: { ...obj, state: false }
			)
		);
	};

	const handleSubmit = () => {
		const config = {
			params: {
				targetId: currGroups.find((obj) => obj.state).id,
			},
			data: users,
		};
		dispatch(putGroupMoveUsers(config, courseId));
		setClickCompleted(true);
	};

	useEffect(() => {
		if (clickCompleted && !isError && !isLoading) setOpen(false);

		isError && !isLoading && setClickCompleted(false);
	}, [clickCompleted, isError, isLoading, error]);

	useEffect(() => {
		setCurrGroups(
			groups
				.filter((obj) => obj.id !== group?.id)
				.map((obj) => ({ ...obj, state: false }))
		);
	}, [groups]);

	useEffect(() => {
		dispatch(getGroups({ params: { courseId } }));
	}, []);

	return ReactDOM.createPortal(
		<div
			className={styles['modal-wrapper']}
			onClick={(e) => e.stopPropagation()}
		>
			<div className={styles['popup']}>
				<div className={styles['top-block']}>
					<h2 className={styles['title']}>Переместить участников</h2>
				</div>
				<div className={styles.body}>
					<DropDownGroup
						text={group?.name}
						stateSVG={showGroups}
						setStateSVG={setShowGroups}
					/>
					{showGroups && (
						<ul className={styles['group-menu']}>
							{currGroups.map((group) => (
								<li
									key={group.id}
									className={styles.group}
									onClick={() => toggleStateGroup(group.id)}
								>
									<RadioButton state={group.state} />
									{group.name}
								</li>
							))}
						</ul>
					)}
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
						onClick={handleSubmit}
						type={
							currGroups.some((group) => group.state)
								? 'primary'
								: 'disabled'
						}
						disabled={!currGroups.some((group) => group.state)}
					>
						Готово
					</MainButton>
				</div>
			</div>
		</div>,
		document.body
	);
};

export default RelocateMember;
