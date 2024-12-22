import { useState } from 'react';
import ReactDOM from 'react-dom';
import { DateCalendar, MultiSectionDigitalClock } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import styles from './DeadlinesСalendar.module.css';
import MainButton from '../../UI/buttons/mainButton/MainButton';

const formatDateTime = ({ date, time }) => {
	const [hours, minutes] = time.split(':');
	date.setHours(Number(hours), Number(minutes), 0);
	return dayjs(date).format('YYYY-MM-DDTHH:mm:ss');
};

const DeadlinesСalendar = ({ setOpen, id, title, chengeDeadline, data }) => {
	const [date, setDate] = useState(
		data.date ? dayjs(data.date).format('YYYY-MM-DDTHH:mm:ss') : ''
	);
	console.log(date);

	const dateChange = (newTime, field) => {
		setDate((cv) => {
			const currDateField = cv.split('T');
			const revField = field === 'time' ? 'date' : 'time';
			const revFieldContent =
				field === 'time'
					? currDateField.length > 1
						? dayjs(currDateField[0]).toDate()
						: new Date()
					: currDateField.length > 1
					? currDateField[1]
					: '08:00';

			const updatedDate = formatDateTime({
				[revField]: revFieldContent,
				[field]: newTime,
			});
			return updatedDate;
		});
	};

	const saveDeadlines = () => {
		chengeDeadline((cv) =>
			cv.map((obj) =>
				obj.id === id
					? {
							...obj,
							deadlines: {
								...obj.deadlines,
								endTime: new Date(date),
							},
					  }
					: obj
			)
		);
		setOpen(false);
	};

	return ReactDOM.createPortal(
		<div className={styles['modal-wrapper']}>
			<div
				className={styles['popup']}
				onClick={(e) => e.stopPropagation()}
			>
				<div className={styles['top-block']}>
					<h2 className={styles['title']}>
						{title ? title : 'Название темы'}
					</h2>
				</div>
				<div className={styles['describe-block']}>
					<div className={styles['data-block']}>
						<p>Дата</p>
						<DateCalendar
							value={date ? dayjs(date) : null}
							onChange={(date) =>
								date && dateChange(date.toDate(), 'date')
							}
							sx={{
								borderRadius: '0.5rem',
								border: '1px solid var(--content-background)',
								backgroundColor: 'var(--background-primary)',
								color: 'var(--content-primary)',
								boxShadow:
									'0px 0px 16px 0px rgba(33, 37, 41, 0.06)',
								'.css-17f9e7e-MuiTypography-root-MuiDayCalendar-weekDayLabel':
									{
										color: 'var(--content-disabled)',
									},
								'.css-cyfsxc-MuiPickersCalendarHeader-labelContainer':
									{
										font: 'var(--body-medium16)',
									},
								'.css-xb7uwb-MuiPickersArrowSwitcher-spacer': {
									width: '30px',
								},
								'.css-1ckov0h-MuiSvgIcon-root': {
									color: 'var(--content-primary)',
								},
								'.css-17nrfho-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button':
									{
										border: '1px solid var(--content-border);',
									},
								'.css-17nrfho-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button:hover':
									{
										backgroundColor:
											'var(--content-background);',
									},
								'.css-z4ns9w-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button':
									{
										border: '1px solid var(--content-border);',
									},
								'.css-z4ns9w-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button:hover':
									{
										backgroundColor:
											'var(--content-background);',
									},
								'.css-4k4mmf-MuiButtonBase-root-MuiPickersDay-root':
									{
										color: 'var(--content-primary);',
									},
								'.css-qct7wd-MuiButtonBase-root-MuiPickersDay-root':
									{
										color: 'var(--content-primary);',
									},
								'.css-qct7wd-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)':
									{
										border: '1px solid var(--content-disabled);',
									},
								'.css-4k4mmf-MuiButtonBase-root-MuiPickersDay-root.Mui-selected':
									{
										color: 'var(--content-constant)',
									},
								'.css-iupya1-MuiButtonBase-root-MuiIconButton-root-MuiPickersCalendarHeader-switchViewButton':
									{
										color: 'var(--content-subPrimary)',
									},
								'.css-1rf3jwr-MuiButtonBase-root-MuiIconButton-root-MuiPickersCalendarHeader-switchViewButton':
									{
										color: 'var(--content-subPrimary)',
									},
							}}
						/>
					</div>
					<div className={styles['time-block']}>
						<p>Время</p>
						<div className={styles['time-box']}>
							<MultiSectionDigitalClock
								value={date ? dayjs(date) : null}
								onChange={(time) =>
									time &&
									dateChange(
										dayjs(time).format('HH:mm'),
										'time'
									)
								}
								sx={{
									justifyContent: 'center',
									paddingTop: '50px',
									height: '175px',
									'.css-ux17pc-MuiButtonBase-root-MuiMenuItem-root-MuiMultiSectionDigitalClockSection-item':
										{
											font: '500 1.5rem/1.25 "IBM Plex Sans"',
											color: 'var(--blue-main)',
										},
									'.MuiList-root:hover::-webkit-scrollbar': {
										display: 'none',
									},
									'.MuiList-root': {
										border: 'none !important',
									},
								}}
							/>
						</div>
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
						onClick={saveDeadlines}
						type={date ? 'primary' : 'disabled'}
						disabled={!date}
					>
						Сохранить
					</MainButton>
				</div>
			</div>
		</div>,
		document.body
	);
};

export default DeadlinesСalendar;
