import { useState } from 'react';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

function AssignmentField() {
    const [course, setCourse] = useState("");
    const courseData = ['Course1', 'Course2', 'Course3']
    const lessonData = ['Lesson1', 'Lesson2', 'Lesson3']
    const sublessonData = ['SubLesson1', 'SubLesson2', 'SubLesson3']
    const durations = ['1 day', '2 days', '3 days']
    const handleChange = (event) => {
        // setCourse(event.target.value);
        console.log(event.value);
    };
    return (
        <>

            <div className="p-10 bg-[--gray100] h-auto">
                <div className="bg-white w-full px-[100px] pt-10 pb-[60px] rounded-2xl border-solid border-[1px] border-[--gray300]">
                    <div className="space-y-10">
                        <div className="w-1/2 pr-5">
                            <label htmlFor="course" className="text-lg">Course</label>
                            <Dropdown name="course" id="course"
                                controlClassName="Dropdown-asm w-full text-lg text-black"
                                placeholder="* Select course"
                                // value={course}
                                options={courseData}
                                onChange={(e) => console.log(e.value)} />
                        </div>
                        <div className="flex space-x-10">
                            <div className="w-1/2">
                                <label htmlFor="lesson" className="text-lg">Lesson</label><br />
                                <Dropdown name="lesson" id="lesson"
                                    controlClassName="Dropdown-asm w-full text-lg text-black"
                                    placeholder="* Select lesson"
                                    // value={lessons}
                                    options={lessonData}
                                    onChange={(e) => console.log(e.value)} />
                            </div>                    <div className="w-1/2">
                                <label htmlFor="sublesson" className="text-lg">Sub-lesson</label><br />
                                <Dropdown name="sublesson" id="sublesson"
                                    controlClassName="Dropdown-asm w-full text-lg text-black"
                                    placeholder="* Select sublesson"
                                    // value={sublessons}
                                    options={sublessonData}
                                    onChange={(e) => console.log(e.value)} />
                            </div>
                        </div>

                        <hr />
                        <h1 className="text-xl text-[--gray700]">Assignment detail</h1>

                        <div>
                            <label htmlFor="assignment" className="text-lg">Assignment *</label><br />
                            <input className="w-full text-lg p-3 border-solid border-[1px] border-[--gray300] rounded-lg" />
                        </div>
                        <div className="w-1/2 pr-5">
                            <label htmlFor="duration" className="text-lg">Duration of assignment (day)</label><br />
                            <Dropdown name="duration" id="duration"
                                controlClassName="Dropdown-asm w-full text-lg text-black"
                                placeholder="* Select duration"
                                // value={sublessons}
                                options={durations}
                                onChange={(e) => console.log(e.value)} />
                        </div>
                    </div>
                </div>
            </div>
            {/* <style>{`.select:after {
                    content: "▼";
                padding: 12px 8px;
                position: absolute;
                right: 10px;
                top: 0;
                z-index: 1;
                text-align: center;
                width: 10%;
                height: 100%;
                pointer-events: none;
}`}</style> */}
        </>
    )
}

export default AssignmentField