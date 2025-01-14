import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { postContents, putContents } from '../../store/actions/contents.js';
import { findAnswersDuplicates } from '../../helpers/functions/findAnswersDuplicates.js';
import AddCross from '../AddCross.jsx';
import DeleteCross from '../deleteCross.jsx';
import styles from './NewTest.module.css';
import MainButton from '../../UI/buttons/mainButton/MainButton.jsx';
import ClosePopup from '../../UI/svg/closePopup/ClosePopup.jsx';
import RadioButton from '../../UI/inputs/radioButton/RadioButton.jsx';
import Checkbox from '../../UI/inputs/checkbox/Checkbox.jsx';

const MAX_CHARS = {
	question: 50,
	answer: 50,
};

const NewTest = ({ setOpen, type, position, data }) => {
	const dispatch = useDispatch();
	const { isError, isLoading } = useSelector((state) => state.contents);
	const [answersType, setAnswersType] = useState(type ? type : 'one');
	const [question, setQuestion] = useState(data ? data.description : '');
	const [answers, setAnswers] = useState(
		data
			? data.answers.map((obj) => ({ ...obj, isTrue: obj.right }))
			: [{ id: 1, isTrue: false, answer: '' }]
	);
	const [pointCorrect, setPointCorrect] = useState(data ? data.score : 0);
	const [attemptsTest, setAttemptsTest] = useState(
		data ? data.countAttempts : 1
	);
	const [clickCompleted, setClickCompleted] = useState(false); // пока будет так

	const addAnswer = () => {
		if (answers.find((obj) => obj.answer === ''))
			toast.error('Присутствует пустой вариант ответа');
		setAnswers((cv) =>
			cv.find((obj) => obj.answer === '')
				? [...cv]
				: [
						...cv,
						{
							id: cv.length > 0 ? cv.slice(-1)[0].id + 1 : 1,
							isTrue: false,
							answer: '',
						},
				  ]
		);
	};

	const removeAnswer = (id) => {
		setAnswers((cv) => cv.filter((obj) => obj.id !== id));
	};

	const changeTextAnswer = (text, id, method) => {
		const input = text.trimStart().replace('  ', ' ');

		if (input.length <= MAX_CHARS[method]) {
			setAnswers((cv) =>
				cv.map((obj) =>
					obj.id === id
						? {
								...obj,
								isTrue: input.length ? obj.isTrue : false,
								answer: input,
						  }
						: obj
				)
			);
		}
	};

	const toggleStateAnswer = (id) => {
		switch (answersType) {
			case 'one':
				setAnswers((cv) =>
					cv.map((obj) =>
						obj.id === id
							? { ...obj, isTrue: true }
							: { ...obj, isTrue: false }
					)
				);
				break;

			case 'multi':
				setAnswers((cv) =>
					cv.map((obj) =>
						obj.id === id ? { ...obj, isTrue: !obj.isTrue } : obj
					)
				);
				break;

			default:
				break;
		}
	};

	const toggleSwitchChange = (event) => {
		setAnswersType(event.target.checked ? 'multi' : 'one');
		if (!event.target.checked) {
			setAnswers((cv) => cv.map((obj) => ({ ...obj, isTrue: false })));
		}
	};
	const handleSubmit = () => {
		const filterAnswers = answers.filter((answer) => answer.answer.length);
		if (findAnswersDuplicates(filterAnswers)) {
			const content = {
				title:
					answersType === 'one'
						? 'Тест с одиночным ответом'
						: 'Тест с множественным ответом',
				position: position,
				type: answersType === 'one' ? 'SINGLE_ANSWER' : 'MULTI_ANSWER',
				description: question,
				countAttempts: attemptsTest,
				score: pointCorrect,
				answers: filterAnswers.map((answer) => ({
					answer: answer.answer,
					isRight: answer.isTrue,
				})),
			};
			const contentBlob = new Blob([JSON.stringify(content)], {
				type: 'application/json; charset=UTF-8',
			});

			const formData = new FormData();
			formData.append('content', contentBlob);

			const topicId =
				window.location.pathname.match(/\/course\/\d+\/(\d+)/)[1];
			const config = {
				data: formData,
			};
			if (data) {
				config.url = data.id;
				dispatch(putContents(topicId, config)).then(() => {
					setClickCompleted(true);
				});
			} else {
				config.params = { topicId: topicId };
				dispatch(postContents(topicId, config)).then(() => {
					setClickCompleted(true);
				});
			}
		}
	};

	useEffect(() => {
		clickCompleted && !isError && !isLoading && setOpen(false);
	}, [clickCompleted, isError, isLoading]);

	const answerListContent = (
		<ul className={styles['answers-list']}>
			{answers.map((answer) => (
				<li key={answer.id} className={styles.answer}>
					{answersType === 'one' ? (
						<RadioButton
							state={answer.isTrue}
							onClick={() => {
								!answer.answer &&
									toast.error(
										'Добавьте текст в вариант ответа!'
									);
								answer.answer && toggleStateAnswer(answer.id);
							}}
						/>
					) : (
						<Checkbox
							state={answer.isTrue}
							onClick={() => {
								!answer.answer &&
									toast.error(
										'Добавьте текст в вариант ответа!'
									);
								answer.answer && toggleStateAnswer(answer.id);
							}}
						/>
					)}
					<input
						type="text"
						value={answer.answer}
						onChange={(e) =>
							changeTextAnswer(
								e.target.value,
								answer.id,
								'answer'
							)
						}
						placeholder="Введите ответ"
					/>
					<button onClick={() => removeAnswer(answer.id)}>
						<DeleteCross />
					</button>
				</li>
			))}
		</ul>
	);

	useEffect(() => {
		const closePopup = () => setOpen(false);
		document.body.style.overflowY = 'hidden';
		document.addEventListener('click', closePopup);

		return () => {
			document.removeEventListener('click', closePopup);
			document.body.style.overflowY = 'auto';
		};
	}, []);

	return ReactDOM.createPortal(
		<div className={styles['modal-wrapper']}>
			<div
				className={styles['popup']}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={styles['top-block']}>
					<h2 className={styles['title']}>Новый тест</h2>
					<ClosePopup onClick={() => setOpen(false)} />
				</div>
				<div className={styles['describe-block']}>
					<div className={styles['question-block']}>
						<span>Вопрос</span>
						<div className={styles['question-box']}>
							<input
								type="text"
								placeholder=""
								className={styles['title-input']}
								value={question}
								onChange={(e) =>
									e.target.value.length <=
										MAX_CHARS.question &&
									setQuestion(
										e.target.value
											.trimStart()
											.replace('  ', ' ')
									)
								}
								maxLength={MAX_CHARS.question}
							/>
							<span>Задайте вопрос</span>
						</div>
					</div>
					<div className={styles['question-block']}>
						<span>Варианты ответа</span>
						<div className={styles['answer-box']}>
							{answerListContent}
							<button
								className={styles['add-answer']}
								onClick={addAnswer}
							>
								<AddCross />
								Добавить вариант
							</button>
						</div>
					</div>
					<div className={styles['question-block']}>
						<span>Настройки</span>
						<div className={styles['correct-answer-box']}>
							<input
								type="number"
								placeholder=""
								className={styles['number-input']}
								value={pointCorrect}
								min={0}
								max={2000000000}
								onKeyDown={(e) => {
									if (
										['-', '+', 'e', 'E', '.', ','].includes(
											e.key
										)
									) {
										e.preventDefault();
									}
								}}
								onPaste={(e) => {
									const pasteData =
										e.clipboardData.getData('text');
									if (
										isNaN(pasteData) ||
										+pasteData >= 2000000000
									) {
										e.preventDefault();
									}
								}}
								onChange={(e) => {
									return (
										e.nativeEvent.data !== '.' &&
										e.nativeEvent.data !== ',' &&
										e.nativeEvent.data !== '-' &&
										e.nativeEvent.data !== '+' &&
										e.nativeEvent.data !== 'e' &&
										e.target.value < 2000000000 &&
										setPointCorrect(e.target.value)
									);
								}}
							/>
							<span>Баллов за верный ответ</span>
						</div>
						<div className={styles['attempts-test-box']}>
							<input
								type="number"
								placeholder=""
								className={styles['number-input']}
								value={attemptsTest}
								min={1}
								max={2000000000}
								onKeyDown={(e) => {
									if (
										['-', '+', 'e', 'E', '.', ','].includes(
											e.key
										)
									) {
										e.preventDefault();
									}
								}}
								onPaste={(e) => {
									const pasteData =
										e.clipboardData.getData('text');
									if (
										isNaN(pasteData) ||
										+pasteData >= 2000000000
									) {
										e.preventDefault();
									}
								}}
								onChange={(e) =>
									e.nativeEvent.data !== '.' &&
									e.nativeEvent.data !== ',' &&
									e.nativeEvent.data !== '-' &&
									e.nativeEvent.data !== '+' &&
									e.nativeEvent.data !== 'e' &&
									e.target.value < 2000000000 &&
									setAttemptsTest(e.target.value)
								}
							/>
							<span>Попыток на тест</span>
						</div>
						{!data && (
							<div className={styles['multiple-response-box']}>
								<p>Множественный ответ</p>
								<label className={styles.switch}>
									<input
										checked={answersType === 'multi'}
										type="checkbox"
										onChange={toggleSwitchChange}
									/>
									<span
										className={`${styles.slider} ${styles.round}`}
									></span>
								</label>
							</div>
						)}
					</div>
				</div>
				<div className={styles['btn-wrapper']}>
					<MainButton
						onClick={handleSubmit}
						type={
							question &&
							answers.length &&
							answers.some((obj) => obj.isTrue) &&
							pointCorrect >= 0 &&
							attemptsTest >= 1
								? 'primary'
								: 'disabled'
						}
						onMouseEnter={() => {
							if (!question) toast.error('Задайте вопрос!');
							else if (!answers.length)
								toast.error(
									'Добавьте хотя бы один вариант ответа!'
								);
							else if (!answers.some((obj) => obj.isTrue))
								toast.error('Выберите правильный ответ!');
							else if (!(pointCorrect >= 0))
								toast.error('Кол.-во быллов >= 0!');
							else if (!(attemptsTest >= 1))
								toast.error('Кол.-во попыток >= 1!');
						}}
						disabled={
							!(
								question &&
								answers.length &&
								answers.some((obj) => obj.isTrue) &&
								pointCorrect >= 0 &&
								attemptsTest >= 1
							)
						}
					>
						Готово
					</MainButton>
				</div>
			</div>
		</div>,
		document.body
	);
};

export default NewTest;
