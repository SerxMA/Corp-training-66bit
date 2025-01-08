import { useEffect, useRef, useState } from 'react';

import DropDownAddContent from '../../modals/dropDownAddContent/DropDownAddContent.jsx';
import ChooseFile from '../../modals/chooseFile/ChooseFile.jsx';
import NewText from '../../modals/newText/NewText.jsx';
import NewTask from '../../modals/newTask/NewTask.jsx';
import styles from './AddNewContent.module.css';
import NewTest from '../../modals/newTest/NewTest.jsx';

const AddNewContent = ({ position }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isPositionedTop, setIsPositionedTop] = useState(true);
	const [photo, setPhoto] = useState(false);
	const [video, setVideo] = useState(false);
	const [fileText, setFileText] = useState(false);
	const [oneOptionTest, setOneOptionTest] = useState(false);
	const [moreOptionTest, setMoreOptionTest] = useState(false);
	const [edit, setEdit] = useState(false);
	const [attach, setAttach] = useState(false);
	const buttonRef = useRef(null);

	const stateConfig = {
		photo: setPhoto,
		video: setVideo,
		fileText: setFileText,
		oneOptionTest: setOneOptionTest,
		moreOptionTest: setMoreOptionTest,
		edit: setEdit,
		attach: setAttach,
	};

	const clickHandler = (e) => {
		setIsOpen(!isOpen);
		e.stopPropagation();
	};

	useEffect(() => {
		const checkPosition = () => {
			if (buttonRef.current) {
				const buttonRect = buttonRef.current.getBoundingClientRect();
				const scrollY =
					window.scrollY || document.documentElement.scrollTop;
				const elementTop = buttonRect.top + scrollY;
				if (elementTop - scrollY > 395) {
					setIsPositionedTop(true);
				} else {
					setIsPositionedTop(false);
				}
			}
		};
		checkPosition();
		window.addEventListener('resize', checkPosition);
		window.addEventListener('scroll', checkPosition);

		return () => {
			window.removeEventListener('resize', checkPosition);
			window.removeEventListener('scroll', checkPosition);
		};
	}, []);

	useEffect(() => {
		const closePopup = () => setIsOpen(false);
		document.addEventListener('click', closePopup);

		return () => {
			document.removeEventListener('click', closePopup);
		};
	}, []);

	return (
		<div className={styles['plus-wrapper']}>
			<button
				ref={buttonRef}
				className={styles['btn-add']}
				onClick={clickHandler}
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M9.99935 4.16699V15.8337M4.16602 10.0003H15.8327"
						stroke="var(--content-secondary)"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>
			{isOpen && (
				<DropDownAddContent
					isTop={isPositionedTop}
					setOpen={setIsOpen}
					config={stateConfig}
				/>
			)}
			{photo && (
				<ChooseFile
					setOpen={setPhoto}
					type={'image'}
					position={position}
				/>
			)}
			{video && (
				<ChooseFile
					setOpen={setVideo}
					type={'video'}
					position={position}
				/>
			)}
			{fileText && <NewText setOpen={setFileText} position={position} />}
			{oneOptionTest && (
				<NewTest
					setOpen={setOneOptionTest}
					type={'one'}
					position={position}
				/>
			)}
			{moreOptionTest && (
				<NewTest
					setOpen={setMoreOptionTest}
					type={'multi'}
					position={position}
				/>
			)}
			{edit && (
				<NewTask setOpen={setEdit} type={'one'} position={position} />
			)}
			{attach && (
				<NewTask
					setOpen={setAttach}
					type={'multi'}
					position={position}
				/>
			)}
		</div>
	);
};

export default AddNewContent;
