/* eslint-disable react/prop-types */
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

function AssignmentField(props) {
  const navigate = useNavigate()
  const { assignId } = useParams()

  const [courseId, setCourseId] = useState(null)
  const [course, setCourse] = useState('')
  const [lessonId, setLessonId] = useState(null)
  const [lesson, setLesson] = useState('')
  const [sublessonId, setSublessonId] = useState(null)
  const [sublesson, setSublesson] = useState('')
  const [duration, setDuration] = useState('')
  const [assignDetail, setAssignDetail] = useState('')
  const [courseData, setCourseData] = useState([])
  const [lessonData, setLessonData] = useState([])
  const [sublessonData, setSublessonData] = useState([])
  const [editHeader, setEditHeader] = useState('')
  const durations = ['1 day', '2 days', '3 days']

  const getCourse = async () => {
    try {
      const result = await axios.get(
        'http://localhost:4000/assignment/courseList'
      )
      setCourseData(result.data.data)
    } catch (err) {
      console.error(err)
    }
  }
  const getLesson = async (course_id) => {
    try {
      const result = await axios.get(
        `http://localhost:4000/assignment/lessonList?courseId=${course_id}`
      )
      setLessonData(result.data.data)
    } catch (err) {
      console.error(err)
    }
  }
  const getSublesson = async (lesson_id) => {
    try {
      const result = await axios.get(
        `http://localhost:4000/assignment/sublessonList?lessonId=${lesson_id}`
      )
      setSublessonData(result.data.data)
    } catch (err) {
      console.error(err)
    }
  }
  const getAssingment = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4000/assignment/byId?assignId=${assignId}`
      )
      setCourse(result.data.data.course)
      setLesson(result.data.data.lesson)
      setSublesson(result.data.data.sublesson)
      setAssignDetail(result.data.data.question)
      setEditHeader(result.data.data.question)
      if (result.data.data.duration > 1) {
        setDuration(`${result.data.data.duration} days`)
      } else {
        setDuration(`${result.data.data.duration} day`)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleCreate = async () => {
    if (courseId && lessonId && sublessonId && assignDetail && duration) {
      // console.log(courseId, lessonId, sublessonId, assignDetail, Number(duration.split(" ")[0]));
      const assignmentBody = {
        sublessonId,
        assignDetail,
        duration: Number(duration.split(' ')[0]),
      }
      try {
        await axios.post(
          `http://localhost:4000/assignment/create`,
          assignmentBody
        )
      } catch (err) {
        console.error(err)
      }
      setCourse('')
      setLesson('')
      setSublesson('')
      setLessonData([])
      setSublessonData([])
      setAssignDetail('')
      setDuration('')

      navigate('/admin/assingmentlist')
    } else {
      alert('Please input data')
    }
  }
  const handleEdit = async () => {
    if (assignDetail && duration) {
      // console.log(Number(assignId), assignDetail, Number(duration.split(" ")[0]));
      const assignmentBody = {
        assignId,
        assignDetail,
        duration: Number(duration.split(' ')[0]),
      }
      try {
        await axios.put(`http://localhost:4000/assignment/edit`, assignmentBody)
      } catch (err) {
        console.error(err)
      }
      setAssignDetail('')
      setDuration('')

      navigate('/admin/assingmentlist')
    } else {
      alert('Please input data')
    }
  }

  useEffect(() => {
    if (props.addAssignment) {
      getCourse()
    }
    if (props.editAssignment) {
      getAssingment()
    }
  }, [])

  return (
    <>
      {' '}
      {props.addAssignment ? (
        <div className="flex justify-between items-center px-10 py-4 border-solid border-0 border-b-[1px] border-gray-300">
          <h1 className="H3">Add Assignment</h1>
          <div className="space-x-4">
            <button
              className="Secondary"
              onClick={() => navigate('/admin/assingmentlist')}
            >
              Cancel
            </button>
            <button className="Primary border-none" onClick={handleCreate}>
              Create
            </button>
          </div>
        </div>
      ) : props.editAssignment ? (
        <div className="flex justify-between items-center px-10 py-4 border-solid border-0 border-b-[1px] border-gray-300">
          <div className="flex space-x-4">
            <div
              className="flex space-x-4 active:underline cursor-pointer"
              onClick={() => navigate('/admin/assingmentlist')}
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
              <h1 className="H3 text-[--gray600]">Assignment</h1>
            </div>
            <h1 className="H3">{editHeader}</h1>
          </div>
          <div className="space-x-4">
            <button
              className="Secondary"
              onClick={() => navigate('/admin/assingmentlist')}
            >
              Cancel
            </button>
            <button className="Primary border-none" onClick={handleEdit}>
              Save
            </button>
          </div>
        </div>
      ) : null}
      <div className="p-10 bg-[--gray100] h-auto">
        <div className="bg-white w-full px-[100px] pt-10 pb-[60px] rounded-2xl border-solid border-[1px] border-[--gray300]">
          <div className="space-y-10">
            <div className="w-1/2 pr-5">
              <label htmlFor="course" className="text-lg">
                Course
              </label>
              <Dropdown
                name="course"
                id="course"
                disabled={props.editAssignment}
                controlClassName="Dropdown-asm w-full text-lg text-black"
                placeholder={
                  <span className="text-gray-400">* Select course</span>
                }
                value={course}
                options={courseData}
                onChange={(e) => {
                  setLesson('')
                  setSublesson('')
                  setCourseId(e.value)
                  setCourse(e.label)
                  getLesson(e.value)
                  setSublessonData([])
                }}
              />
            </div>
            <div className="flex space-x-10">
              <div className="w-1/2">
                <label htmlFor="lesson" className="text-lg">
                  Lesson
                </label>
                <br />
                <Dropdown
                  name="lesson"
                  id="lesson"
                  disabled={props.editAssignment}
                  controlClassName="Dropdown-asm w-full text-lg text-black"
                  placeholder={
                    lesson === '' ? (
                      <span className="text-gray-400">* Select lesson</span>
                    ) : null
                  }
                  value={lesson}
                  options={lessonData}
                  onChange={(e) => {
                    setSublesson('')
                    setLessonId(e.value)
                    setLesson(e.label)
                    getSublesson(e.value)
                  }}
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="sublesson" className="text-lg">
                  Sub-lesson
                </label>
                <br />
                <Dropdown
                  name="sublesson"
                  id="sublesson"
                  disabled={props.editAssignment}
                  controlClassName="Dropdown-asm w-full text-lg text-black"
                  placeholder={
                    <span className="text-gray-400">* Select sublesson</span>
                  }
                  value={sublesson}
                  options={sublessonData}
                  onChange={(e) => {
                    setSublesson('')
                    setSublessonId(e.value)
                    setSublesson(e.label)
                  }}
                />
              </div>
            </div>

            <hr />
            <h1 className="text-xl text-[--gray700]">Assignment detail</h1>

            <div>
              <label htmlFor="assignment" className="text-lg">
                Assignment *
              </label>
              <br />
              <input
                className="w-full text-lg p-3 border-solid border-[1px] border-[--gray300] rounded-lg focus:border-[--orange500] focus:outline-none placeholder:text-gray-400"
                placeholder="Assignment Question..."
                value={assignDetail}
                onChange={(e) => setAssignDetail(e.target.value)}
              />
            </div>
            <div className="w-1/2 pr-5">
              <label htmlFor="duration" className="text-lg">
                Duration of assignment (day)
              </label>
              <br />
              <Dropdown
                name="duration"
                id="duration"
                controlClassName="Dropdown-asm w-full text-lg text-black"
                placeholder={
                  <span className="text-gray-400">* Select duration</span>
                }
                value={duration}
                options={durations}
                onChange={(e) => setDuration(e.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AssignmentField
