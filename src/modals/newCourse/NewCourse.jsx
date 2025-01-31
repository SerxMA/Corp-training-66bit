/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

import { changeText } from '../../helpers/functions/formatText.js';
import { defaultTags } from '../../helpers/constants/defaultTags.js';
import styles from './NewCourse.module.css';
import MainButton from '../../UI/buttons/mainButton/MainButton.jsx';

const MAX_CHARS = {
	description: 360,
	title: 128,
	inputTags: 24,
};

const NewCourse = ({
	onNext,
	changeData,
	data,
	type,
	showDropDown,
	setShowDropDown,
}) => {
	const [tag, setTag] = useState('');
	const [showTagSupport, setShowTagSupport] = useState(false);

	const changeInputTag = (text) => {
		let input = text
			.trimStart()
			.replace('  ', ' ')
			.replace(/#/g, (_, offset) =>
				offset === text.indexOf('#') ? '#' : ''
			)
			.replace(/[^\w\sА-Яа-яёЁ_#.,()-]/g, '');
		if (
			input[0] === '#' &&
			input.length > 2 &&
			input.slice(-1)[0] === ' '
		) {
			const id =
				Math.max(
					...defaultTags.map((obj) => obj.id),
					...(data.tags.length > 0
						? data.tags.map((obj) => obj.id)
						: [])
				) + 1;
			const obj = {
				id: id,
				name: input.slice(1, -1).replaceAll('_', ' '),
				color: 'var(--green-background)',
				textColor: 'var(--green-main)',
			};
			changeTag(obj);
			input = '';
		}

		if (input.length <= MAX_CHARS.inputTags) {
			setTag(input);
		}
	};

	const change = (text, method) => {
		changeText(text, MAX_CHARS[method], (input) =>
			changeData((cv) => ({ ...cv, [method]: input }))
		);
	};

	const changeTag = (tag) => {
		changeData((cv) =>
			cv.tags.length < 1
				? cv.tags.find((obj) => tag.id === obj.id)
					? {
							...cv,
							tags: cv.tags.filter((obj) => tag.id !== obj.id),
					  }
					: { ...cv, tags: [...cv.tags, tag] }
				: cv.tags.find((obj) => tag.id === obj.id)
				? {
						...cv,
						tags: cv.tags.filter((obj) => tag.id !== obj.id),
				  }
				: { ...cv }
		);
	};

	const dropDown = (
		<ul className={styles['tags-list']}>
			{defaultTags.map((tag) => (
				<li
					key={tag.id}
					className={styles['tag-element']}
					onClick={() => changeTag(tag)}
				>
					<p
						className={styles['tag-text']}
						style={{
							color: tag.textColor,
							backgroundColor: tag.color,
						}}
					>
						{tag.name}
					</p>
				</li>
			))}
		</ul>
	);

	const tagContent = (
		<div className={styles['show-tags']}>
			{data.tags.map((tag, index) => (
				<div
					key={index}
					className={styles['view-tag']}
					onClick={() => changeTag(tag)}
					style={{ color: tag.textColor, backgroundColor: tag.color }}
				>
					<p>
						{tag.name
							.replace(/ /g, '\u00A0')
							.replace(/-/g, '\u2011')}
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
				Чтобы создать новый тег введите &laquo;#&raquo; в&nbsp;начале
				тега и&nbsp;пробел в&nbsp;конце.
				<br />
				Для пробела внутри тега используйте &laquo;_&raquo;.
				<br />
				Максимальное кол.-во тегов &laquo;1&raquo;.
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
							change(event.target.value, 'title')
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
							autoComplete="off"
							placeholder=""
							className={styles['tag-input']}
							value={tag}
							maxLength={MAX_CHARS.tag}
							onChange={(event) =>
								changeInputTag(event.target.value)
							}
							onClick={(e) => {
								setShowDropDown((cv) => !cv);
								setShowTagSupport(false);
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
						width="40"
						height="40"
						viewBox="0 0 20 20"
						fill="none"
						onMouseEnter={() => setShowTagSupport(true)}
						onMouseLeave={() => setShowTagSupport(false)}
						onClick={(e) => {
							setShowDropDown(false);
							e.stopPropagation();
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
							change(event.target.value, 'description')
						}
						maxLength={MAX_CHARS.description}
					></textarea>
					<span>Описание</span>
					<div className={styles['char-counter']}>
						{data.description.length} / {MAX_CHARS.description}
					</div>
				</div>
			</div>
			<MainButton
				type={
					data.description.length &&
					data.title.length &&
					data.tags.length
						? 'primary'
						: 'disabled'
				}
				onClick={onNext}
				disabled={
					!(
						data.description.length &&
						data.title.length &&
						data.tags.length
					)
				}
				sequel={!type}
			>
				{type ? 'Готово' : 'Продолжить'}
			</MainButton>
		</>
	);
};

export default NewCourse;
