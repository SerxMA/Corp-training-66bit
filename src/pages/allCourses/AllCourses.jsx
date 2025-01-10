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
	const title = searchParams.get('title') ? searchParams.get('title') : '';
	const { role, username } = useAuth();

	useEffect(() => {
		if (page >= 1) {
			dispatch(
				role === 'ADMIN'
					? getCourses({
							params: { page: page - 1, title, limit: 18 },
					  })
					: getAllCoursesUser({
							params: {
								username: username,
								enrolled: false,
								title,
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
				? navigate(`/courses/all-courses?page=${page}&title=${title}`)
				: navigate(`/courses/all-courses?page=${page}`);
		}
	}, [page]);

	useEffect(() => {
		setPage(searchParams.get('page') ? +searchParams.get('page') : 1);
	}, [searchParams.get('page')]);

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
								enrolled={role === 'ADMIN' || course.userCourse}
							/>
						))}
					</ul>
					<PaginationBar
						maxPage={totalPages > 0 ? totalPages : 1}
						currentPage={page ? page : 1}
						onPageChange={setPage}
					/>
				</>
			)}
		</div>
	);
};

export default AllCourses;
