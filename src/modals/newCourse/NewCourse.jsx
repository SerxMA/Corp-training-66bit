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
	const [showTagSupport, setShowTagSupport] = useState(false);

	const changeInputTag = (text) => {
		let input = text.trimStart().replace('  ', ' ');

		if (
			input[0] === '#' &&
			input.length > 2 &&
			input.slice(-1)[0] === ' '
		) {
			changeTag(input.slice(1, -1).replace('-', ' ').replace('\\-', '-'));
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

	const tagSupportContent = (
		<div className={styles['tag-support']}>
			<p>Теги</p>
			<p>
				Чтобы создать новый тег введите "#" в начале тегаи пробел в
				конце.
				<br />
				Для пробела внутри тега используйте "-".
				<br />
				Для "-" внутри тега используйте "\-".
			</p>
		</div>
	);

	useEffect(() => {
		const outsideClick = () => {
			setShowTagSupport(false);
			setShowDropDown(false);
		};
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
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						onClick={(e) => {
							e.stopPropagation();
							setShowTagSupport((cv) => !cv);
						}}
					>
						<path
							d="M10 7H10.01M9 10H10V14H11M1 10C1 11.1819 1.23279 12.3522 1.68508 13.4442C2.13738 14.5361 2.80031 15.5282 3.63604 16.364C4.47177 17.1997 5.46392 17.8626 6.55585 18.3149C7.64778 18.7672 8.8181 19 10 19C11.1819 19 12.3522 18.7672 13.4442 18.3149C14.5361 17.8626 15.5282 17.1997 16.364 16.364C17.1997 15.5282 17.8626 14.5361 18.3149 13.4442C18.7672 12.3522 19 11.1819 19 10C19 7.61305 18.0518 5.32387 16.364 3.63604C14.6761 1.94821 12.3869 1 10 1C7.61305 1 5.32387 1.94821 3.63604 3.63604C1.94821 5.32387 1 7.61305 1 10Z"
							stroke="var(--content-secondary)"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					{showDropDown && dropDown}
					{showTagSupport && tagSupportContent}
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
