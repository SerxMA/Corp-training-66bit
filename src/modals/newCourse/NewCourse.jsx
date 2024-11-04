import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Arrow from '../Arrow.jsx';
import Cross from '../Cross.jsx';
import styles from './NewCourse.module.css';
import { defaultTags } from '../../helpers/constants/defaultTags.js';

const MAX_CHARS = {
	description: 360,
	title: 128,
	tag: 50,
};

const NewCourse = ({ onNext }) => {
	const [description, setDescription] = useState('');
	const [title, setTitle] = useState('');
	const [tag, setTag] = useState('');
	const [showDropDown, setShowDropDown] = useState(false);
	const [allTags, setAllTags] = useState([]);

	const handleNext = () => {
		onNext({ title, description }); // наверное добавить тег
	};

	const handleDescriptionChange = (event, maxChars, method) => {
		let input = event.target.value.trimStart().replace('  ', ' ');
		if (maxChars === MAX_CHARS.tag) {
			const isMatch = /^# $/.test(input.slice(-2));
			if (isMatch) {
				selectTag(input.slice(0, -2));
				input = '';
			}
		}

		if (input.length <= maxChars) {
			method(input);
		}
	};

	const selectTag = (tag) => {
		setAllTags((cv) =>
			cv.find((value) => tag === value) ? [...cv] : [...cv, tag]
		);
	};

	const dropDown = (
		<ul className={styles['tags-list']}>
			{defaultTags.map((tag) => (
				<li
					key={tag.id}
					className={styles['tag-element']}
					onClick={() => selectTag(tag.name)}
				>
					<p className={styles['tag-text']}>{tag.name}</p>
				</li>
			))}
		</ul>
	);

	const tagContent = (
		<div className={styles['show-tags']}>
			{allTags.map((tag, index) => (
				<div
					key={tag}
					className={styles['view-tag']}
					onClick={() =>
						setAllTags((cv) => cv.filter((value) => tag !== value))
					}
				>
					<p>
						{tag.replace(/ /g, '\u00A0').replace(/-/g, '\u2011')}
						&nbsp;#{index + 1}
					</p>
				</div>
			))}
		</div>
	);

	useEffect(() => {
		const outsideClick = () => setShowDropDown(false);
		document.addEventListener('click', outsideClick);

		return () => document.removeEventListener('click', outsideClick);
	}, []);

	return ReactDOM.createPortal(
		<div className={styles['modal-wrapper']}>
			<div className={styles['popup']}>
				<div className={styles['top-block']}>
					<h2 className={styles['title']}>Новый курс</h2>
					<button className={styles['cross']}>
						<Cross />
					</button>
				</div>
				<div className={styles['describe-block']}>
					<div className={styles['input-box']}>
						<input
							type="text"
							name="title"
							placeholder=""
							className={styles['title-input']}
							value={title}
							onChange={(event) =>
								handleDescriptionChange(
									event,
									MAX_CHARS.title,
									setTitle
								)
							}
							maxLength={MAX_CHARS.title}
						/>
						<span>Название</span>
					</div>
					<div className={styles['tag-box']}>
						<div className={styles['wrapper-oveflow']}>
							{tagContent}
							<input
								type="text"
								name="tag"
								placeholder=""
								className={styles['tag-input']}
								value={tag}
								maxLength={MAX_CHARS.tag}
								onChange={(event) =>
									handleDescriptionChange(
										event,
										MAX_CHARS.tag,
										setTag
									)
								}
								onClick={(e) => {
									setShowDropDown((cv) => !cv);
									e.stopPropagation();
								}}
							/>
						</div>
						<span
							className={
								allTags.length || tag.length
									? styles['up-span']
									: ''
							}
						>
							Придумайте тег или выберите существующий
						</span>
						{showDropDown && dropDown}
					</div>
					<div className={styles['description-box']}>
						<textarea
							placeholder=""
							className={styles['description-area']}
							value={description}
							onChange={(event) =>
								handleDescriptionChange(
									event,
									MAX_CHARS.description,
									setDescription
								)
							}
							maxLength={MAX_CHARS.description}
						></textarea>
						<span>Описание</span>
						<div className={styles['char-counter']}>
							{description.length} / {MAX_CHARS.description}
						</div>
					</div>
				</div>
				<button
					className={`${styles['continue-btn']}
					${
						description.length && title.length
							? styles['btn_success']
							: styles['btn_disabled']
					}`}
					disabled={!(description.length && title.length)}
					onClick={handleNext}
				>
					Продолжить
					<Arrow />
				</button>
			</div>
		</div>,
		document.body
	);
};

export default NewCourse;
