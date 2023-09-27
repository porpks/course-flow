import React, { useState, useEffect } from 'react'
import './lessonTable.css'
import { Link } from 'react-router-dom'

function LessonTable() {
  const [lessonData, setLessonData] = useState([])
  useEffect(() => {
    const storage = localStorage.getItem('lesson_data')
    try {
      if (storage) {
        console.log('have storage')
        const parsedData = JSON.parse(storage)
        // console.log(parsedData)
        const lessonName = parsedData.lessonName
        const transformedData = parsedData.map((lesson, index) => ({
          lessonName: lesson.lessonName,
          subLessonData: lesson.subLessonList,
        }))
        const subLessonData = { ...parsedData }
        console.log(subLessonData)

        setLessonData(transformedData)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }, [])

  // const handleDelete = (id, lessonName) => {
  //   alert(`Deleted lesson with ID ${id} ${lessonName}`)
  // }

  const handleDelete = (index, lessonName) => {
    if (window.confirm(`คุณต้องการลบบทเรียน "${lessonName}" ใช่หรือไม่?`)) {
      try {
        const storage = localStorage.getItem('lesson_data')
        if (storage) {
          const parsedData = JSON.parse(storage)

          if (index >= 0 && index < parsedData.length) {
            // ลบบทเรียนจากอาร์เรย์ด้วย index
            parsedData.splice(index, 1)

            // อัปเดตข้อมูลใน Local Storage และ state
            localStorage.setItem('lesson_data', JSON.stringify(parsedData))
            setLessonData(parsedData)

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
        <tbody>
          <tr className="rounded-lg">
            <th></th>
            <th>Lesson name</th>
            <th>Sub-lesson</th>
            <th>Action</th>
          </tr>
          {lessonData.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.lessonName}</td>
              <td>{countSubLessons(data.subLessonData)}</td>
              <td className="flex gap-[17px] items-center justify-center">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default LessonTable
