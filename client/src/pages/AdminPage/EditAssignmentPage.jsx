import Sidebar from '../../components/Sidebar'
import AssignmentField from '../../components/adminAssignment/AssignmentField'
import ModalAssignmentDelete from '../../components/adminAssignment/modalAssignmentDelete'
import { useAuth } from '../../contexts/AuthContext'
import { useParams } from 'react-router-dom'

function EditAssignmentPage() {
  const { deleteAssignment, setDeleteAssignment } = useAuth()
  const { assignId } = useParams()

  return (
    <>
      {deleteAssignment.state ? (
        <ModalAssignmentDelete editPage={true} />
      ) : (
        <>
          <div className="flex justify-center w-full">
            <div className="w-[240px]  shadow-xl">
              <Sidebar />
            </div>
            <div className="flex flex-col w-[1200px]  shadow-xl">
              <AssignmentField editAssignment={true} />
              <div className="bg-[--gray100] px-10 text-end pb-4">
                <h1
                  className="text-lg text-[--blue500] active:underline cursor-pointer"
                  onClick={() =>
                    setDeleteAssignment({
                      state: true,
                      assignment_id: Number(assignId),
                    })
                  }
                >
                  Delete Assignment
                </h1>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default EditAssignmentPage
