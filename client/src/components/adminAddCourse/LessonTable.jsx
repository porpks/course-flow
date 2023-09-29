import React, { useState, useEffect } from 'react'
import './lessonTable.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.jsx'

function LessonTable() {
  const [lessonData, setLessonData] = useState([])
  const { lesson, setLesson } = useAuth()

  useEffect(() => {
    const storage = localStorage.getItem('lesson_data')
    try {
      if (storage) {
        const parsedData = JSON.parse(storage)
        // console.log(parsedData)
        const lessonName = parsedData.lessonName
        const transformedData = parsedData.map((lesson, index) => ({
          lessonName: lesson.lessonName,
          subLessonData: lesson.subLessonList,
        }))
        const subLessonData = { ...parsedData }

        setLessonData(transformedData)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }, [lesson])

  // const handleDelete = (id, lessonName) => {
  //   alert(`Deleted lesson with ID ${id} ${lessonName}`)
  // }

  const handleDelete = (index, lessonName) => {
    if (window.confirm(`คุณต้องการลบบทเรียน "${lessonName}" ใช่หรือไม่?`)) {
      try {
        const storage = localStorage.getItem('lesson_data')
        const newDataLesson = [...lesson]
        if (storage) {
          const parsedData = JSON.parse(storage)

          if (index >= 0 && index < parsedData.length) {
            // ลบบทเรียนจากอาร์เรย์ด้วย index
            parsedData.splice(index, 1)
            // อัปเดตข้อมูลใน Local Storage และ state
            localStorage.setItem('lesson_data', JSON.stringify(parsedData))
            console.log(newDataLesson, 'newDataLesson')
            console.log(newDataLesson.splice(index, 1))
            setLessonData(parsedData)
            setLesson(newDataLesson)

            alert(`ลบบทเรียน "${lessonName}" เรียบร้อยแล้ว`)
          } else {
            alert(`Index ${index} ไม่ถูกต้อง`)
          }
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }

  const handleEdit = (id, lessonName) => {
    alert(`Edited lesson with ID ${id} ${lessonName}`)
  }

  const countSubLessons = (subLessonList) => {
    return subLessonList ? subLessonList.length : 0
  }

  return (
    <>
      <table className=" w-full border-collapse ">
        <tbody className="">
          <tr className="rounded-lg Body3 flex flex-row bg-[--gray400] text-[--gray800] ">
            <p className="py-[10px] px-4 w-[500px] pl-[70px] ">Lesson name</p>
            <p className="py-[10px] px-4 w-[396px]">Sub-lesson</p>
            <p className="py-[10px] px-6 w-[120px]">Action</p>
          </tr>
          {lessonData.map((data, index) => (
            <tr key={index} className="bg-white Body2 ">
              <div className="Tab flex flex-row items-center border-1">
                <td className="py-8 w-[70px] text-center">{index + 1}</td>
                <td className="py-8 w-[430px] ">{data.lessonName}</td>
                <td className="py-8  px-4 w-[396px]">
                  {countSubLessons(data.subLessonData)}
                </td>
                <div className="flex flex-row space-x-[17px] items-center justify-stretch px-[20px] w-[120px]">
                  <button
                    className="btn cursor-pointer"
                    onClick={() => handleDelete(index, data.lessonName)}
                  >
                    <img src="../../../public/image/delete.svg" alt="" />
                  </button>
                  <Link to={`/admin/addcourse/editlesson/${index}`}>
                    <button className="btn cursor-pointer">
                      <img src="../../../public/image/edit.svg" alt="Edit" />
                    </button>
                  </Link>
                </div>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default LessonTable
