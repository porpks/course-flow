import { useState } from 'react';
import ReactPlayer from 'react-player'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import LearnigDropdown from '../assets/LearnigDropdown';
import './Learning.css'
import { useAuth } from "../contexts/AuthContext.jsx";

const mockdata = {
    coursename: "Service Design Essentials",
    coursedetail: "Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.",
    lesson: [
        {
            lessonname: "Introduction",
            sublesson: [
                { sublesson_id: 1, sublessonname: "Welcome to the Course", sublesson_status: "complete" },
                { sublesson_id: 2, sublessonname: "Course Overview", sublesson_status: "complete" },
                { sublesson_id: 3, sublessonname: "Getting to Know You", sublesson_status: "complete" },
                { sublesson_id: 4, sublessonname: "What is Service Design ?", sublesson_status: "complete" },
                { sublesson_id: 5, sublessonname: "Service Design vs. UX vs. UI vs. Design  Thinking", sublesson_status: "complete" },
                { sublesson_id: 6, sublessonname: "4 Levels of Service Design in an Organization", sublesson_status: "inprogress" },
                { sublesson_id: 7, sublessonname: "Scope of Service Design", sublesson_status: null },
                { sublesson_id: 8, sublessonname: "Develop an Entirely New Service - U Drink I Drive", sublesson_status: null },
                { sublesson_id: 9, sublessonname: "Improving Existing Services - Credit Cards", sublesson_status: null },
                { sublesson_id: 10, sublessonname: "Improving Existing Services - MK Levels of Impact", sublesson_status: null },
            ]
        },
        {
            lessonname: "Service Design Theories and Principles",
            sublesson: []
        }
    ]
}
let percent = 15


// eslint-disable-next-line react/prop-types
function SublessonIcon({ subStatus }) {
    if (subStatus === "complete") {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M1.875 10C1.875 5.5125 5.5125 1.875 10 1.875C14.4875 1.875 18.125 5.5125 18.125 10C18.125 14.4875 14.4875 18.125 10 18.125C5.5125 18.125 1.875 14.4875 1.875 10ZM13.0083 8.48833C13.0583 8.42171 13.0945 8.34576 13.1147 8.26496C13.135 8.18415 13.1388 8.10012 13.1261 8.0178C13.1134 7.93547 13.0844 7.85652 13.0407 7.78558C12.9971 7.71464 12.9396 7.65315 12.8719 7.60471C12.8041 7.55627 12.7273 7.52187 12.6461 7.50352C12.5648 7.48518 12.4807 7.48326 12.3987 7.49789C12.3167 7.51251 12.2385 7.54338 12.1686 7.58868C12.0987 7.63398 12.0385 7.69279 11.9917 7.76167L9.295 11.5367L7.94167 10.1833C7.82319 10.0729 7.66648 10.0128 7.50456 10.0157C7.34265 10.0185 7.18816 10.0841 7.07365 10.1986C6.95914 10.3132 6.89354 10.4676 6.89069 10.6296C6.88783 10.7915 6.94793 10.9482 7.05833 11.0667L8.93333 12.9417C8.99749 13.0058 9.07483 13.0552 9.15999 13.0864C9.24515 13.1176 9.33608 13.1299 9.42647 13.1224C9.51686 13.115 9.60455 13.088 9.68344 13.0432C9.76233 12.9985 9.83054 12.9371 9.88333 12.8633L13.0083 8.48833Z" fill="#2FAC8E" />
            </svg>
        )
    }
    else if (subStatus === "inprogress") {
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
    else {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="7.25" stroke="#2FAC8E" strokeWidth="1.5" />
            </svg>
        )
    }
}

function Learning() {
    const { userID, setUserID } = useAuth();

    const [videoHead, setVideoHead] = useState("")
    const [videoKey, setVideoKey] = useState(null)
    // const [currentTime, setCurrentTime] = useState(0)
    // const playerRef = useRef(null)
    const [isShowVdo, setIsShowVdo] = useState(false)
    const [isShowAsm, setIsShowAsm] = useState(false)

    const handleShowVideo = (sublessonName, sublessonKey) => {
        setIsShowAsm(false)
        setIsShowVdo(false)
        setTimeout(() => {
            setVideoHead(sublessonName)
            setVideoKey(sublessonKey)
            setIsShowVdo(true)
        }, 500)

    }

    const handlePause = (pauseTime) => {
        console.log(pauseTime);
        // setProgressTime(pauseTime);
        // playerRef.current.seekTo(currentTime, 'seconds');
    }
    const handleEnd = () => {
        setIsShowAsm(true)
    }
    console.log(userID);
    return (
        <>
            <div className="flex justify-center py-[100px] px-[160px]">

                <div className="flex flex-col w-[360px] mr-[24px] px-6 py-8 shadow-[4px_4px_24px_0px_rgba(0,0,0,0.08)]">
                    <div className="">
                        <h1 className="Body3 text-[--orange500] mb-6">Course</h1>
                        <h1 className="H3 mb-2">{mockdata.coursename}</h1>
                        <p className="Body2 text-[--gray700] mb-6 leading-8">
                            {mockdata.coursedetail}
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
                                            <h1 className='Body2'>{lesson.lessonname}</h1>
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
                                                        <SublessonIcon subStatus={sublesson.sublesson_status} />
                                                    </div>
                                                    <p className='text-[--gray700] cursor-pointer'
                                                        onClick={() => handleShowVideo(sublesson.sublessonname, sublesson.sublesson_id)}
                                                    >{sublesson.sublessonname}
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
                        <div className="h-[90px]">
                            <h1 className="H2">{videoHead}</h1>
                        </div>
                        {isShowVdo ? <div className="w-full">
                            <h1 className="H3">VDO: {videoKey}</h1>
                            <div className='rounded-lg overflow-hidden '>


                                <ReactPlayer
                                    url='https://yzcnxdhntdijwizusqmn.supabase.co/storage/v1/object/public/test-avatar/1%20Minute%20Sample%20Video.mp4?t=2023-09-08T15%3A26%3A51.001Z'
                                    width="100%"
                                    height="100%"
                                    controls={true}
                                    light={true}
                                    playIcon={<svg className='min-h-[460px]' xmlns="http://www.w3.org/2000/svg" width="104" height="104" viewBox="0 0 104 104" fill="none">
                                        <rect width="104" height="104" rx="52" fill="#020202" fillOpacity="0.5" />
                                        <path d="M77 52.5L40.25 73.7176L40.25 31.2824L77 52.5Z" fill="white" />
                                    </svg>}
                                    start={33}
                                    // progressInterval={progressTime}
                                    // onPlay={handlePlay}
                                    onPause={(e) => handlePause(e.target.currentTime)}
                                    onEnded={handleEnd}

                                />

                            </div>
                        </div> :
                            null}
                    </div>
                    {isShowAsm ?
                        <div className='mb-20 bg-[--blue100] h-[300px] p-6 rounded-lg'>
                            <div className='flex justify-between'>
                                <h1 className='Body1 mb-6'>Assigment</h1>
                                <div className='Body2 h-fit px-2 py-1 rounded text-[#0A7B60] bg-[#DDF9EF]'>status</div>
                            </div>
                            <p className='Body2 mb-1'>Question ?</p>
                            <div className='bg-white w-full h-[100px] mb-6 p-3 rounded-lg'>
                                <p className='Body2 text-[--gray600]'>Answer...</p>
                            </div>
                            <div className='flex justify-between items-center'>
                                <button className='text-white border-none bg-[--blue500] px-8 py-[18px] rounded-xl'>Send Assignment</button>
                                <p className='Body2 text-[--gray700]'>Assign within 2 days</p>
                            </div>
                        </div> :
                        null}
                </div>

            </div >

        </>
    )
}

export default Learning