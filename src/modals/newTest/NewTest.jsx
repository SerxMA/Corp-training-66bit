import { useState } from 'react';
import ReactDOM from 'react-dom';

import Cross from '../Cross.jsx';
import AddCross from '../AddCross.jsx';
import DeleteCross from '../deleteCross.jsx';
import styles from './NewTest.module.css';

const MAX_CHARS = {
	question: 50,
	answer: 50,
};

const NewTest = ({ setOpen }) => {
	const [answersType, setAnswersType] = useState('one');
	const [question, setQuestion] = useState('');
	const [answers, setAnswers] = useState([
		{ id: 1, isTrue: false, answer: '' },
	]);
	const [pointCorrect, setPointCorrect] = useState(0);
	const [attemptsTest, setAttemptsTest] = useState(1);

	const addAnswer = () => {
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
					obj.id === id ? { ...obj, answer: input } : obj
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

	const answerListContent = (
		<ul className={styles['answers-list']}>
			{answers.map((answer) => (
				<li key={answer.id} className={styles.answer}>
					<div
						className={`${styles.state} ${
							answer.isTrue ? styles.state_on : ''
						}`}
						onClick={() =>
							answer.answer && toggleStateAnswer(answer.id)
						}
					></div>
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

	return ReactDOM.createPortal(
		<div className={styles['modal-wrapper']}>
			<div className={styles['popup']}>
				<div className={styles['top-block']}>
					<h2 className={styles['title']}>Новый тест</h2>
					<button
						className={styles['cross']}
						onClick={() => setOpen(false)}
					>
						<Cross />
					</button>
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
								onChange={(e) =>
									setPointCorrect(e.target.value)
								}
							/>
							<span>Баллов за верный ответ</span>
						</div>
						<div className={styles['attempts-test-box']}>
							<input
								type="number"
								placeholder=""
								className={styles['number-input']}
								value={attemptsTest}
								onChange={(e) =>
									setAttemptsTest(e.target.value)
								}
							/>
							<span>Попыток на тест</span>
						</div>
						<div className={styles['multiple-response-box']}>
							<p>Множественный ответ</p>
							<label className={styles.switch}>
								<input
									type="checkbox"
									onChange={toggleSwitchChange}
								/>
								<span
									className={`${styles.slider} ${styles.round}`}
								></span>
							</label>
						</div>
					</div>
				</div>
				<button
					className={`${styles['btn']}
					${
						question &&
						answers.length &&
						answers.some((obj) => obj.isTrue) &&
						pointCorrect >= 0 &&
						attemptsTest >= 1
							? styles['btn_success']
							: styles['btn_disabled']
					}`}
					disabled={!MAX_CHARS.question}
				>
					Готово
				</button>
			</div>
		</div>,
		document.body
	);
};

export default NewTest;
