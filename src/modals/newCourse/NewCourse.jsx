/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

import Arrow from '../Arrow.jsx';
import styles from './NewCourse.module.css';
import { defaultTags } from '../../helpers/constants/defaultTags.js';

const MAX_CHARS = {
	description: 360,
	title: 128,
	inputTags: 32,
};

const NewCourse = ({ onNext, changeData, data }) => {
	const [tag, setTag] = useState('');
	const [showDropDown, setShowDropDown] = useState(false);

	const changeInputTag = (text) => {
		let input = text.trimStart().replace('  ', ' ');

		if (/^# $/.test(input.slice(-2))) {
			changeTag(input.slice(0, -2));
			input = '';
		}
		if (input.length <= MAX_CHARS.inputTags) {
			setTag(input);
		}
	};

	const changeText = (text, method) => {
		const input = text.trimStart().replace('  ', ' ');

		if (input.length <= MAX_CHARS[method]) {
			changeData((cv) => ({ ...cv, [method]: input }));
		}
	};

	const changeTag = (tag) => {
		changeData((cv) =>
			cv.tags.find((value) => tag === value)
				? { ...cv, tags: cv.tags.filter((value) => tag !== value) }
				: { ...cv, tags: [...cv.tags, tag] }
		);
	};

	const dropDown = (
		<ul className={styles['tags-list']}>
			{defaultTags.map((tag) => (
				<li
					key={tag.id}
					className={styles['tag-element']}
					onClick={() => changeTag(tag.name)}
				>
					<p className={styles['tag-text']}>{tag.name}</p>
				</li>
			))}
		</ul>
	);

	const tagContent = (
		<div className={styles['show-tags']}>
			{data.tags.map((tag, index) => (
				<div
					key={tag}
					className={styles['view-tag']}
					onClick={() => changeTag(tag)}
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

	return (
		<>
			<div className={styles['describe-block']}>
				<div className={styles['input-box']}>
					<input
						type="text"
						name="title"
						placeholder=""
						className={styles['title-input']}
						value={data.title}
						onChange={(event) =>
							changeText(event.target.value, 'title')
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
								changeInputTag(event.target.value)
							}
							onClick={(e) => {
								setShowDropDown((cv) => !cv);
								e.stopPropagation();
							}}
						/>
					</div>
					<span
						className={
							data.tags.length || tag.length
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
						value={data.description}
						onChange={(event) =>
							changeText(event.target.value, 'description')
						}
						maxLength={MAX_CHARS.description}
					></textarea>
					<span>Описание</span>
					<div className={styles['char-counter']}>
						{data.description.length} / {MAX_CHARS.description}
					</div>
				</div>
			</div>
			<button
				className={`${styles['continue-btn']}
					${
						data.description.length &&
						data.title.length &&
						data.tags.length
							? styles['btn_success']
							: styles['btn_disabled']
					}`}
				disabled={
					!(
						data.description.length &&
						data.title.length &&
						data.tags.length
					)
				}
				onClick={onNext}
			>
				Продолжить
				<Arrow />
			</button>
		</>
	);
};

export default NewCourse;
