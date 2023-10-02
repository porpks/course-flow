import React, { useState, useEffect } from 'react'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { func } from 'prop-types'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import AddLessonVideo from './AddLessonVideo'
import ReactPlayer from 'react-player'
import { useAuth } from '../../contexts/AuthContext.jsx'
import SnackBar from '../SnackBar'

function AddLesson(sharedState, updateState) {
  const { lessonIndex } = useParams() // รับค่า index จาก URL
  // const lessonToEdit = lessonData[lessonIndex]
  const navigate = useNavigate()
  const { courseid } = useParams()
  const [dataCourse, setDataCourse] = useState([])
  const [dataCourseName, setDataCourseName] = useState('')
  const [subLessonList, setSubLessonList] = useState([
    { subLessonId: 1, subLessonName: '', subLessonVideo: null },
  ])
  const [lessonName, setLessonName] = useState('')
  const [vdo, setVdo] = useState('')
  const [avatarVdo, setAvatarVdo] = useState({})
  const [VdoUrl, setVdoUrl] = useState('')
  const { lesson, setLesson } = useAuth()

  const filterSublesson = subLessonList.filter(
    (item) => item.subLessonName === ''
  )
  const isSublessonEmpty = filterSublesson.length > 0

  const filterVdo = subLessonList.filter((item) => item.subLessonVideo === null)
  const isVdoEmpty = filterVdo.length > 0

  async function getDetailCourse() {
    try {
      const dataDetailCourse = await axios.get(
        `http://localhost:4000/admin/editcourse/${courseid}`
      )
      setDataCourse({
        course_id: dataDetailCourse.data.data.course_id,
        course_name: dataDetailCourse.data.data.course_name,
        lessons: dataDetailCourse.data.data.lessons.map((lesson) => ({
          lesson_name: lesson.lesson_name,
          sublessons: lesson.sublessons,
        })),
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const courseDataStorage = localStorage.getItem('course_data')
    const courseParsedData = JSON.parse(courseDataStorage)
    setDataCourseName(courseParsedData.course_name)

    const storage = localStorage.getItem('lesson_data')
    if (storage) {
      const parsedData = JSON.parse(storage)
      if (lessonIndex >= 0 && lessonIndex < parsedData.length) {
        const lessonToEdit = parsedData[lessonIndex]
        setLessonName(lessonToEdit.lessonName)
        setSubLessonList(lessonToEdit.subLessonList)
      }
    }
  }, [lessonIndex])

  // useEffect(() => {
  //   getDetailCourse()
  //   if (updatedSubLessonName && updatedLessonId) {
  //     const updatedSubLessonList = subLessonList.map((subLesson) =>
  //       subLesson.SubLessonId === updatedLessonId
  //         ? { ...subLesson, subLessonName: updatedSubLessonName }
  //         : subLesson
  //     )
  //     setSubLessonList(updatedSubLessonList)
  //     setUpdatedSubLessonName('')
  //     setUpdatedLessonId('')
  //   }
  // }, [updatedSubLessonName, updatedLessonId, subLessonList])
  const addSubLesson = () => {
    const newLessonId = subLessonList.length + 1
    const newSubLesson = {
      subLessonId: newLessonId,
      subLessonName: '',
      subLessonVideo: null,
    }
    setSubLessonList([...subLessonList, newSubLesson])
  }

  const deleteSubLesson = (lessonIdToDelete) => {
    if (subLessonList.length === 1) {
      SnackBar("You can't delete the last sub-lesson.", 'warning')
      return
    }
    const updatedSubLessonList = subLessonList.filter(
      (subLesson) => subLesson.subLessonId !== lessonIdToDelete
    )
    setSubLessonList(updatedSubLessonList)
  }

  const handleSubLesson = (subLessonId, subLessonName) => {
    const updatedSubLessonList = subLessonList.map((subLesson) =>
      subLesson.subLessonId === subLessonId
        ? { ...subLesson, subLessonName }
        : subLesson
    )
    // setLesson(updatedSubLessonList);
    setSubLessonList(updatedSubLessonList)
  }
  const handleLesson = (event) => {
    const value = event.target.value
    setLessonName(value)
  }

  const createButton = (event) => {
    const storage = localStorage.getItem('lesson_data')
    //TODO เนื่องจากการ Add Lesson ครั้งแรกจะยังไม่มีข้อมูลใน Storage เลยไม่มีการทำงานของ Code บรรทัดที่ 125
    if (!storage) {
      displaySnackbar('lesson has successfully created! ', 'success')
      const newData = [{ lessonName, subLessonList }]
      localStorage.setItem(`lesson_data`, JSON.stringify(newData))

      const subLessonData = subLessonList.map((item) => ({
        subLessonId: item.subLessonId,
        subLessonName: item.subLessonName,
      }))
      const subLessonVideo = subLessonList
        .filter((item) => item.subLessonVideo && item.subLessonVideo !== '')
        .map((item) => item.subLessonVideo)
      const newLesson = lesson
      newLesson.push({ lessonName, subLessonData, subLessonVideo })
      setLesson(newLesson)
      console.log(lesson)

      if (!lessonName) {
        displaySnackbar('Please enter a name for the lesson.', 'warning')
        return
      }

      if (isSublessonEmpty) {
        displaySnackbar('Please enter a name for the sub-lesson.', 'warning')
        return
      }

      if (isVdoEmpty) {
        displaySnackbar('Please upload videos for the sub-lesson.', 'warning')
        return
      }
    } else if (storage) {
      displaySnackbar('lesson has successfully created! ', 'success')
      const parsedData = JSON.parse(storage)
      const newData = [...parsedData, { lessonName, subLessonList }]
      localStorage.setItem('lesson_data', JSON.stringify(newData))

      if (!lessonName) {
        displaySnackbar('Please enter a name for the lesson.', 'warning')
        return
      }

      if (isSublessonEmpty) {
        displaySnackbar('Please enter a name for the sub-lesson.', 'warning')
        return
      }

      if (isVdoEmpty) {
        displaySnackbar('Please upload videos for the sub-lesson.', 'warning')
        return
      }

      const subLessonData = subLessonList.map((item) => ({
        subLessonId: item.subLessonId,
        subLessonName: item.subLessonName,
      }))

      const subLessonVideo = subLessonList
        .filter((item) => item.subLessonVideo && item.subLessonVideo !== '')
        .map((item) => item.subLessonVideo)

      const newLesson = lesson
      newLesson.push({ lessonName, subLessonData, subLessonVideo })
      setLesson(newLesson)
      console.log(lesson)
    }

    navigate(`/admin/addcourse`)
    // console.log(data)
    // updateState(data)
    // const lessonData = { lessonName, subLessonList }
    // const subLessonsArray = Object.values(lessonData).filter(
    //   (item) => typeof item === 'object'
    // )
    // // Map and prepare the data for sending to the server
    // const preparedData = subLessonsArray.map((subLesson) => ({
    //   lessonName: lessonData.lessonName,
    //   ...subLesson,
    // }))

    // console.log(preparedData)
  }

  const handleUploadVideo = async (event, subLessonId) => {
    const vdoFile = event.target.files[0]
    const file = JSON.stringify(vdoFile)
    const fileJsonString = JSON.stringify(file)
    localStorage.setItem('fileData', fileJsonString)

    const updatedSubLessonList = subLessonList.map((subLesson) =>
      subLesson.subLessonId === subLessonId
        ? { ...subLesson, subLessonVideo: vdoFile }
        : subLesson
    )

    setSubLessonList(updatedSubLessonList)

    if (vdoFile) {
      const allowedVdoTypes = [
        'video/mp4',
        'video/quicktime',
        'video/x-msvideo',
      ]

      if (allowedVdoTypes.includes(vdoFile.type)) {
        if (vdoFile.size <= 20 * 1024 * 1024) {
          setAvatarVdo(vdoFile)
          setVdoUrl(URL.createObjectURL(vdoFile))
        } else {
          displaySnackbar('File size exceeds 20 MB.', 'warning')
        }
      } else {
        displaySnackbar(
          'Invalid video type. Please choose a .mp4, .mov, or .avi file.',
          'warning'
        )
      }
    }
  }

  const handleRemoveVdo = async (subLessonId) => {
    const updatedSubLessonList = subLessonList.map((subLesson) =>
      subLesson.subLessonId === subLessonId
        ? { ...subLesson, subLessonVideo: null }
        : subLesson
    )
    setSubLessonList(updatedSubLessonList)
  }

  function displaySnackbar(message, status) {
    setOpenSnackBar(false)
    setSnackStatus(status)
    setSnackbarMes(message)
    setOpenSnackBar(true)
  }
  const [openSnackbar, setOpenSnackBar] = useState(false)
  const [snackBarMes, setSnackbarMes] = useState('')
  const [snackStatus, setSnackStatus] = useState('')

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackBar(false)
  }

  return (
    <>
      <SnackBar
        open={openSnackbar}
        onClose={handleClose}
        severity={snackStatus}
        message={snackBarMes}
      />
      <div className="flex flex-col">
        <div className="w-[1200px] ">
          <div className="flex flex-row justify-between file: items-center px-10 py-4">
            <div className="flex flex-row justify-center items-center space-x-4">
              <div
                className=""
                onClick={() => {
                  navigate(`/admin/addcourse`)
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M18.7915 11.0051H7.62148L12.5015 6.1251C12.8915 5.7351 12.8915 5.0951 12.5015 4.7051C12.1115 4.3151 11.4815 4.3151 11.0915 4.7051L4.50148 11.2951C4.11148 11.6851 4.11148 12.3151 4.50148 12.7051L11.0915 19.2951C11.4815 19.6851 12.1115 19.6851 12.5015 19.2951C12.8915 18.9051 12.8915 18.2751 12.5015 17.8851L7.62148 13.0051H18.7915C19.3415 13.0051 19.7915 12.5551 19.7915 12.0051C19.7915 11.4551 19.3415 11.0051 18.7915 11.0051Z"
                    fill="#9AA1B9"
                  />
                </svg>
              </div>
              <div className="flex flex-col ">
                <div className="flex flex-row Body3 space-x-2">
                  <p className="text-[#9AA1B9]">Course</p>
                  <p>{dataCourseName}</p>
                </div>
                <h1 className="H3">Add Lesson</h1>
              </div>
            </div>
            <div className="space-x-4">
              <button className="Secondary">Cancle</button>
              <button className="Primary border-none" onClick={createButton}>
                Create
              </button>
            </div>
          </div>
        </div>
        <form
          className="w-[1200px] pb-[219px] h-auto  flex flex-col justify-center items-center bg-[#F6F7FC] pt-10"
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <div className="w-[1120px]  flex flex-col justify-center items-center bg-[#FFF]">
            <div className="w-[920px] flex flex-col justify-center">
              <div className="pt-[40px]">
                <p className="Body2 pb-1 ">Lesson name*</p>
                <input
                  type="text"
                  name="Lesson name"
                  className="Input w-full h-[48px] mb-10"
                  value={lessonName}
                  onChange={handleLesson}
                />
              </div>
              <hr />
              <p className="Body1 my-10 text-[#646D89]">Sub-Lesson</p>{' '}
              {subLessonList.map((subLesson, index) => {
                return (
                  <div key={index}>
                    <div className="my-[12px] flex flex-row bg-[#F6F7FC] px-4 py-6">
                      <div className="w-[26px] h-[76px] mr-6 flex justify- items-center">
                        <DragIndicatorIcon
                          style={{ fontSize: 24, color: '#C8CCDB' }}
                          className="hover:cursor-pointer"
                        />
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="flex flex-row justify-between">
                          <p className="Body2 pb-1">Sub-lesson name*</p>
                          <button
                            className="Ghost hover:cursor-pointer text-blue-500"
                            onClick={() =>
                              deleteSubLesson(subLesson.subLessonId)
                            }
                          >
                            Delete
                          </button>
                        </div>
                        <input
                          type="text"
                          name="sub-lesson-name"
                          className="Body2 Input w-[530px] h-[48px] mb-10 p"
                          value={subLesson.subLessonName}
                          onChange={(e) =>
                            handleSubLesson(
                              subLesson.subLessonId,
                              e.target.value
                            )
                          }
                        />
                        <p className="Body2 pb-1">Video*</p>

                        <div>
                          <div className="flex flex-col gap-[6px]">
                            <div className="relative ">
                              {/*---------------------- IMG THUMBNAIL UPLOAD -----------------------*/}
                              {!subLesson.subLessonVideo ? (
                                <img
                                  src="../../public/image/uploadVdo.svg"
                                  className="relative w-[250px] h-[250px] object-cover rounded-2xl"
                                />
                              ) : null}
                              {/*---------------------- VDO PLAYER -----------------------*/}
                              {subLesson.subLessonVideo ? (
                                <div className="vdo-preview rounded-[8px] w-[739px] h-[460px] cursor-pointer ">
                                  <ReactPlayer
                                    url={URL.createObjectURL(
                                      subLesson.subLessonVideo
                                    )}
                                    width="100%"
                                    height="100%"
                                    controls={true}
                                    // light={true}
                                    // playIcon={"../public/image/playIcon.svg"}
                                  />
                                  {subLesson.subLessonVideo ? (
                                    <button
                                      className="absolute top-[22px] left-[698px] m-[6px] bg-[#9B2FAC] bg-opacity-95 rounded-full w-[30px] h-[30px] border-none cursor-pointer"
                                      onClick={() =>
                                        handleRemoveVdo(subLesson.subLessonId)
                                      }
                                    >
                                      <img
                                        src="../../public/image/closeIcon.svg"
                                        alt=""
                                        className="w-[10px] h-[10px]"
                                      />
                                    </button>
                                  ) : null}
                                </div>
                              ) : null}
                              {/*---------------------- UPLOAD BTN -----------------------*/}
                              {!subLesson.subLessonVideo ? (
                                <div className="absolute top-0 left-0 w-[250px] h-[250px] border-[2px] border-[--gray300] border-solid rounded-2xl hover:border-dashed  hover:border-[--blue500] hover:border-[3px]   group ">
                                  <label
                                    htmlFor={`video-upload-${subLesson.subLessonId}`}
                                    className="hidden group-hover:block w-full h-full pt-[45px] rounded-full  cursor-pointer "
                                  >
                                    <input
                                      id={`video-upload-${subLesson.subLessonId}`}
                                      name={`video-upload-${index}`}
                                      type="file"
                                      onChange={(e) =>
                                        handleUploadVideo(
                                          e,
                                          subLesson.subLessonId
                                        )
                                      }
                                      hidden
                                    />
                                  </label>
                                </div>
                              ) : null}
                              {/*------------------------------------------------------------*/}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              <button
                className="Secondary w-fit mb-[60px] mt-3"
                onClick={addSubLesson}
              >
                +Add Sub-lesson
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddLesson
