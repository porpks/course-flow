import React, { useState, useEffect } from 'react'
import './lessonTable.css'

function LessonTable() {
  const mockData = [
    {
      id: 1,
      Lesson_name: 'Prinsessa Ruusunen',
      Sub_lesson: 8,
    },
    {
      id: 2,
      Lesson_name: 'Merry Christmas Mr. Lawrence',
      Sub_lesson: 1,
    },
    {
      id: 3,
      Lesson_name: "Cookie's Fortune",
      Sub_lesson: 5,
    },
    {
      id: 4,
      Lesson_name: 'Killer Inside Me, The',
      Sub_lesson: 5,
    },
    {
      id: 5,
      Lesson_name: 'Girl from Monaco, The (fille de Monaco, La)',
      Sub_lesson: 2,
    },
    {
      id: 6,
      Lesson_name: 'Bad Boy (Story of Danny Lester, The)',
      Sub_lesson: 6,
    },
    {
      id: 7,
      Lesson_name: 'Tooth Fairy',
      Sub_lesson: 7,
    },
    {
      id: 8,
      Lesson_name: 'Marseillaise, La',
      Sub_lesson: 5,
    },
    {
      id: 9,
      Lesson_name: 'Music for One Apartment and Six Drummers',
      Sub_lesson: 2,
    },
    {
      id: 10,
      lessonName: 'Stormheart',
      subLessonName: 6,
    },
  ]
  const [lessonData, setLessonData] = useState([])
  useEffect(() => {
    try {
      const storedData = localStorage.getItem('lesson_data')
      if (storedData) {
        const parsedData = JSON.parse(storedData)
        // console.log(parsedData)
        const lessonName = parsedData.lessonName
        const transformedData = parsedData.subLessonList.map((subLesson) => ({
          lessonName, // เรียกใช้ lessonName จากตัวแปรด้านบน
          subLessonId: subLesson.lessonId,
          subLessonName: subLesson.subLessonName,
        }))
        console.log(transformedData)
        setLessonData(transformedData)
        // console.log(parsedData.subLessonList)
        const subLessonListData = parsedData.subLessonList

        // console.log(Array.isArray(subLessonListData))
        // if (Array.isArray(subLessonListData)) {
        //   const lessonDataFromLocal = subLessonListData.map((item) => ({
        //     Sub_lesson: item.subLessonName,
        //   }))
        //   console.log(lessonDataFromLocal)
        //   // setLessonData({
        //   //   Lesson_name: parsedData.lessonName,
        //   //   Sub_lesson: lessonDataFromLocal,
        //   // })
        //   setLessonData(parsedData)
        // } else if (typeof parsedData === 'object') {
        //   setLessonData([parsedData])
        //   console.log(lessonDataFromLocal)
        // }
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }, [])
  console.log(lessonData)
  const handleDelete = (id, lessonName) => {
    alert(`Deleted lesson with ID ${id} ${lessonName}`)
  }

  const handleEdit = (id, lessonName) => {
    alert(`Edited lesson with ID ${id} ${lessonName}`)
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
              <td>{data.id}</td>
              <td>{data.lessonName}</td>
              <td>{data.Sub_lesson}</td>
              <td className="flex gap-[17px] items-center justify-center">
                <button
                  className="btn cursor-pointer"
                  onClick={() => handleDelete(data.id, data.Lesson_name)}
                >
                  <img src="../../../public/image/delete.svg" alt="" />
                </button>
                <button
                  className="btn cursor-pointer"
                  onClick={() => handleEdit(data.id, data.Lesson_name)}
                >
                  <img src="../../../public/image/edit.svg" alt="" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default LessonTable
