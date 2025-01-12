import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useAuth } from '../../customHooks/useAuth';
import CourseCard from '../../components/courseCard/CourseCard.jsx';
import PaginationBar from '../../components/paginationBar/PaginationBar.jsx';
import styles from './MyCourses.module.css';
import { getMyCoursesUser } from '../../store/actions/courses.js';

const MyCourses = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { courses, totalPages } = useSelector((state) => state.courses);
	const [page, setPage] = useState(
		searchParams.get('page') ? +searchParams.get('page') : 1
	);
	const title = searchParams.get('title') ? searchParams.get('title') : '';
	const { id } = useAuth();

	useEffect(() => {
		if (page >= 1) {
			dispatch(
				getMyCoursesUser({
					params: {
						status: 'PUBLISHED',
						userId: id,
						enrolled: true,
						title,
						page: page - 1,
						limit: 20,
					},
				})
			);
		} else {
			setPage(1);
		}
	}, [page, title]);

	useEffect(() => {
		if (page >= 1) {
			title.length
				? navigate(`/courses/my-courses?page=${page}&title=${title}`)
				: navigate(`/courses/my-courses?page=${page}`);
		}
	}, [page]);

	useEffect(() => {
		if (totalPages > 1 && page > totalPages) {
			setPage(1);
		}
	}, [totalPages]);
	return (
		<div className={styles['all-courses']}>
			{!!courses.length && (
				<>
					<ul className={styles['courses-wrapper']}>
						{courses.map((course) => (
							<CourseCard
								key={course.id}
								img={course?.pictureUrl}
								tags={course?.tags}
								title={course.title}
								id={course.id}
								description={course.description}
								enrolled
							/>
						))}
					</ul>
					<PaginationBar
						maxPage={totalPages > 0 ? totalPages : 1}
						currentPage={page}
						onPageChange={setPage}
					/>
				</>
			)}
		</div>
	);
};

export default MyCourses;
