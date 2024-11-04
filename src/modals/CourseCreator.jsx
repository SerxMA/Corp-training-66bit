import { useState } from 'react'

import ChooseImgModal from './chooseFile/ChooseImgModal.jsx';
import NewCourse from './newCourse/NewCourse.jsx';

const CourseCreator = () => {
    const [step, setStep] = useState(1);
    const [courseData, setCourseData] = useState({});
  
    const handleNext = (data) => {
      setCourseData(data);
      setStep(2);
    };
  
    return (
      <div>
        {step === 1 && <NewCourse onNext={handleNext} />}
        {step === 2 && (
          <ChooseImgModal courseData={courseData} />
        )}
      </div>
    );
}

export default CourseCreator;