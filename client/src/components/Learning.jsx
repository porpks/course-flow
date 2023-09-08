import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import LearnigDropdown from '../assets/LearnigDropdown';
import './Learning.css'
import LearningVdo from './LearningVdo';

const mockdata = {
    course_name: "Service Design Essentials",
    course_detail: "Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.",
    lesson: [
        {
            name: "Introduction",
            sublesson: [
                { sublesson_id: 1, name: "Welcome to the Course", status: "complete", asigment_status: "complete" },
                { sublesson_id: 2, name: "Course Overview", status: "complete", asigment_status: "complete" },
                { sublesson_id: 3, name: "Getting to Know You", status: "complete", asigment_status: "complete" },
                { sublesson_id: 4, name: "What is Service Design ?", status: "complete", asigment_status: "complete" },
                { sublesson_id: 5, name: "Service Design vs. UX vs. UI vs. Design  Thinking", status: "complete", asigment_status: "complete" },
                { sublesson_id: 6, name: "4 Levels of Service Design in an Organization", status: "complete", asigment_status: "pending" },
                { sublesson_id: 7, name: "Scope of Service Design", status: "didnot", asigment_status: null },
                { sublesson_id: 8, name: "Develop an Entirely New Service - U Drink I Drive", status: "didnot", asigment_status: null },
                { sublesson_id: 9, name: "Improving Existing Services - Credit Cards", status: "didnot", asigment_status: null },
                { sublesson_id: 10, name: "Improving Existing Services - MK Levels of Impact", status: "didnot", asigment_status: null },
            ]
        },
        {
            name: "Service Design Theories and Principles",
            sublesson: []
        }
    ]
}
let percent = 15


// eslint-disable-next-line react/prop-types
function SublessonIcon({ subStatus, asigmentStatus }) {
    if (subStatus === "complete") {
        if (asigmentStatus === "complete") {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M1.875 10C1.875 5.5125 5.5125 1.875 10 1.875C14.4875 1.875 18.125 5.5125 18.125 10C18.125 14.4875 14.4875 18.125 10 18.125C5.5125 18.125 1.875 14.4875 1.875 10ZM13.0083 8.48833C13.0583 8.42171 13.0945 8.34576 13.1147 8.26496C13.135 8.18415 13.1388 8.10012 13.1261 8.0178C13.1134 7.93547 13.0844 7.85652 13.0407 7.78558C12.9971 7.71464 12.9396 7.65315 12.8719 7.60471C12.8041 7.55627 12.7273 7.52187 12.6461 7.50352C12.5648 7.48518 12.4807 7.48326 12.3987 7.49789C12.3167 7.51251 12.2385 7.54338 12.1686 7.58868C12.0987 7.63398 12.0385 7.69279 11.9917 7.76167L9.295 11.5367L7.94167 10.1833C7.82319 10.0729 7.66648 10.0128 7.50456 10.0157C7.34265 10.0185 7.18816 10.0841 7.07365 10.1986C6.95914 10.3132 6.89354 10.4676 6.89069 10.6296C6.88783 10.7915 6.94793 10.9482 7.05833 11.0667L8.93333 12.9417C8.99749 13.0058 9.07483 13.0552 9.15999 13.0864C9.24515 13.1176 9.33608 13.1299 9.42647 13.1224C9.51686 13.115 9.60455 13.088 9.68344 13.0432C9.76233 12.9985 9.83054 12.9371 9.88333 12.8633L13.0083 8.48833Z" fill="#2FAC8E" />
                </svg>
            )
        } else {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="7.25" stroke="#2FAC8E" strokeWidth="1.5" />
                    <mask id="path-2-inside-1_140_7809" fill="white">
                        <path d="M10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18L10 10L10 2Z" />
                    </mask>
                    <path d="M10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18L10 10L10 2Z" fill="#2FAC8E" stroke="#2FAC8E" strokeWidth="3" mask="url(#path-2-inside-1_140_7809)" />
                </svg>
            )
        }
    } else {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="7.25" stroke="#2FAC8E" strokeWidth="1.5" />
            </svg>
        )
    }
}

function Learning() {

    const [videoHead, setVideoHead] = useState("")
    const [videoKey, setVideoKey] = useState(null)

    const handleVideo = (sublessonName, sublessonKey) => {
        setVideoHead(sublessonName)
        setVideoKey(sublessonKey)
    }

    return (
        <>
            <div className="flex justify-center py-[100px] px-[160px]">

                <div className="flex flex-col w-[360px] mr-[24px] px-6 py-8 shadow-[4px_4px_24px_0px_rgba(0,0,0,0.08)]">
                    <div className="">
                        <h1 className="Body3 text-[--orange500] mb-6">Course</h1>
                        <h1 className="H3 mb-2">{mockdata.course_name}</h1>
                        <p className="Body2 text-[--gray700] mb-6 leading-8">
                            {mockdata.course_detail}
                        </p>
                    </div>
                    <div className="mb-6">
                        <h1 className="Body2 text-[--gray700] mb-2">{percent}% Complete</h1>
                        <div className="w-full h-[10px] bg-[--gray300] rounded-full">
                            <div className={`w-[${percent}%] h-full Linear1 rounded-full`}></div>
                        </div>
                    </div>

                    {mockdata.lesson.map((lesson, index) => {
                        let seq = ""
                        index + 1 < 10 ? seq = "0" + (index + 1) : seq = String(index + 1)

                        return (
                            <Accordion key={index}>
                                <AccordionSummary
                                    expandIcon={<LearnigDropdown />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>
                                        <div className='flex'>
                                            <h1 className='Body2 mr-6 text-[--gray700]'>{seq}</h1>
                                            <h1 className='Body2'>{lesson.name}</h1>
                                        </div>
                                    </Typography>
                                </AccordionSummary>
                                <hr />
                                <AccordionDetails>
                                    <div className='px-2 py-3'>

                                        {lesson.sublesson.map((sublesson, index) => {
                                            return (
                                                <div key={index} className='flex items-center mb-6'>
                                                    <div className='mr-4 h-[20px]'>
                                                        <SublessonIcon subStatus={sublesson.status} asigmentStatus={sublesson.asigment_status} />
                                                    </div>
                                                    <p className='text-[--gray700] cursor-pointer'
                                                        onClick={() => handleVideo(sublesson.name, sublesson.sublesson_id)}
                                                    >{sublesson.name}
                                                    </p>
                                                </div>
                                            )
                                        })}

                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        )
                    })}

                </div>

                <div className="flex flex-col w-full">
                    <div className='mb-20'>
                        <LearningVdo videoHead={videoHead} videoKey={videoKey} />
                    </div>
                    <div className='mb-20 bg-[--blue100] h-[200px]'>
                        <h1>Assigment</h1>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Learning