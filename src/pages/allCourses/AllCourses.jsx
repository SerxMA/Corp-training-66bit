import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getCourses, getAllCoursesUser } from '../../store/actions/courses.js';
import CourseCard from '../../components/courseCard/CourseCard.jsx';
import styles from './AllCourses.module.css';
import PaginationBar from '../../components/paginationBar/PaginationBar.jsx';
import { useAuth } from '../../customHooks/useAuth.js';

const AllCourses = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { courses, totalPages } = useSelector((state) => state.courses);
	const [page, setPage] = useState(
		searchParams.get('page') ? +searchParams.get('page') : 1
	);
	const { role, username } = useAuth();

	useEffect(() => {
		if (page >= 1) {
			dispatch(
				role === 'ADMIN'
					? getCourses(page - 1)
					: getAllCoursesUser({
							params: { username: username, enrolled: false },
					  })
			);
			navigate(`/courses/all-courses?page=${page}`);
		} else {
			setPage(1);
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

export default AllCourses;
