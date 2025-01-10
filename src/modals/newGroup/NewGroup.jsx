import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import styles from './NewGroup.module.css';
import AddPeoplePopup from '../addPeoplePopup/AddPeoplePopup.jsx';
import MainButton from '../../UI/buttons/mainButton/MainButton.jsx';
import ClosePopup from '../../UI/svg/closePopup/ClosePopup.jsx';

const MAX_CHARS = {
	group: 50,
};

const NewGroup = ({ setOpen }) => {
	const { groups } = useSelector((state) => state.groups);
	const [group, setGroup] = useState('');
	const [next, setNext] = useState(false);

	useEffect(() => {
		const outsideClick = () => {
			setOpen(false);
		};
		document.addEventListener('click', outsideClick);

		return () => document.removeEventListener('click', outsideClick);
	}, []);

	return ReactDOM.createPortal(
		<div className={styles['modal-wrapper']}>
			<div
				className={styles['popup']}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={styles['top-block']}>
					<h2 className={styles['title']}>Новая группа</h2>
					<ClosePopup onClick={() => setOpen(false)} />
				</div>
				<div className={styles['describe-block']}>
					<div className={styles['group-box']}>
						<input
							type="text"
							placeholder=""
							className={styles['group-input']}
							value={group}
							onChange={(e) =>
								e.target.value.length <= MAX_CHARS.group &&
								setGroup(
									e.target.value
										.trimStart()
										.replace('  ', ' ')
								)
							}
							maxLength={MAX_CHARS.group}
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
						onClick={() => {
							if (
								groups.length &&
								groups.some(
									(obj) => obj.name === group.trimEnd()
								)
							) {
								toast.error(
									'Группа с таким названием существует'
								);
								setOpen(false);
							} else setNext(true);
						}}
						type={group ? 'primary' : 'disabled'}
						disabled={!group}
						sequel
					>
						Продолжить
					</MainButton>
				</div>
			</div>
			{next && (
				<AddPeoplePopup
					setOpen={setNext}
					allPopups={[setOpen, setNext]}
					type={'user'}
					data={{ title: group }}
				/>
			)}
		</div>,
		document.body
	);
};

export default NewGroup;
