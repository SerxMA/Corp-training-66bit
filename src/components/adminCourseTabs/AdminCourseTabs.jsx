import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { changeText } from '../../helpers/functions/formatText.js';
import NewGroup from '../../modals/newGroup/NewGroup.jsx';
import AddPeoplePopup from '../../modals/addPeoplePopup/AddPeoplePopup.jsx';
import styles from './AdminCourseTabs.module.css';
import SearchInputSmall from '../../UI/inputs/searchInputSmall/SearchInputSmall.jsx';
import Tooltip from '../../UI/other/tooltip/Tooltip.jsx';

const AdminCourseTabs = () => {
	const location = useLocation();
	const [addParticipants, setAddParticipants] = useState(false);
	const [newGroup, setNewGroup] = useState(false);
	const [search, setSearch] = useState('');

	const isGroups = location.pathname.includes('groups');
	const isPartic = location.pathname.includes('participants');

	return (
		<div className={styles['admin-tabs']}>
			<div className={styles.tabs}>
				<NavLink
					to=""
					className={({ isActive }) =>
						`${styles.link} ${isActive ? styles.link_current : ''}`
					}
					end
				>
					Конструктор
				</NavLink>
				<NavLink
					to="participants"
					className={({ isActive }) =>
						`${styles.link} ${isActive ? styles.link_current : ''}`
					}
				>
					Участники
				</NavLink>
				<NavLink
					to="groups"
					className={({ isActive }) =>
						`${styles.link} ${isActive ? styles.link_current : ''}`
					}
				>
					Группы
				</NavLink>
			</div>
			<div className={styles.buttons}>
				<div className={styles['btn-secondary']}>
					{(isGroups || isPartic) && (
						<SearchInputSmall
							value={search}
							onChange={(e) =>
								changeText(e.target.value, 512, (text) =>
									setSearch(text)
								)
							}
						/>
					)}
					{(isGroups || isPartic) && (
						<div className={styles['img-container']}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
							>
								<path
									d="M3.33398 3.33301H16.6673V5.14301C16.6672 5.585 16.4916 6.00885 16.179 6.32134L12.5007 9.99967V15.833L7.50065 17.4997V10.4163L3.76732 6.30967C3.48852 6.00295 3.33403 5.60334 3.33398 5.18884V3.33301Z"
									stroke="#8D8F91"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<Tooltip />
						</div>
					)}
				</div>
				{(isGroups || isPartic) && (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="2"
						height="22"
						viewBox="0 0 2 22"
						fill="none"
					>
						<path
							d="M1 21L1 1"
							stroke="#E5E5E6"
							strokeLinecap="round"
						/>
					</svg>
				)}
				{(isGroups || isPartic) && (
					<button
						className={styles['btn-new-group']}
						onClick={(e) => {
							e.stopPropagation();
							isGroups
								? setNewGroup(true)
								: setAddParticipants(true);
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
						>
							<path
								d="M2.5 17.5V15.8333C2.5 14.9493 2.85119 14.1014 3.47631 13.4763C4.10143 12.8512 4.94928 12.5 5.83333 12.5H9.16667C9.96667 12.5 10.7 12.7817 11.275 13.2508M13.3333 2.60833C14.0503 2.79192 14.6859 3.20892 15.1397 3.79359C15.5935 4.37827 15.8399 5.09736 15.8399 5.8375C15.8399 6.57764 15.5935 7.29673 15.1397 7.88141C14.6859 8.46608 14.0503 8.88308 13.3333 9.06667M13.3333 15.8333H18.3333M15.8333 13.3333V18.3333M4.16667 5.83333C4.16667 6.71739 4.51786 7.56524 5.14298 8.19036C5.7681 8.81548 6.61595 9.16667 7.5 9.16667C8.38406 9.16667 9.2319 8.81548 9.85702 8.19036C10.4821 7.56524 10.8333 6.71739 10.8333 5.83333C10.8333 4.94928 10.4821 4.10143 9.85702 3.47631C9.2319 2.85119 8.38406 2.5 7.5 2.5C6.61595 2.5 5.7681 2.85119 5.14298 3.47631C4.51786 4.10143 4.16667 4.94928 4.16667 5.83333Z"
								stroke="white"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						{isGroups ? 'Новая группа' : 'Добавить участников'}
					</button>
				)}
			</div>
			{newGroup && <NewGroup setOpen={setNewGroup} />}
			{addParticipants && <AddPeoplePopup setOpen={setAddParticipants} />}
		</div>
	);
};

export default AdminCourseTabs;
