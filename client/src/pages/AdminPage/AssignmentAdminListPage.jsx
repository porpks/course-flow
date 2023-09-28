import AssignmentListAdmin from '../../components/adminAssignment/AssignmentListAdmin.jsx'
import AssignmentTopbar from '../../components/adminAssignment/AssignmentTopbar.jsx'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext.jsx'
import ModalAssignmentDelete from '../../components/adminAssignment/modalAssignmentDelete.jsx'
import Sidebar from '../../components/Sidebar.jsx'

function AssignmentAdminListPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const { deleteAssignment, setDeleteAssignment } = useAuth()
  return (
    <>
      {deleteAssignment.state ? (
        <ModalAssignmentDelete />
      ) : (
        <>
          <div className="flex justify-center w-full">
            <div>
              <Sidebar isAssignmentPage={true} />
            </div>
            <div>
              <AssignmentTopbar setSearchQuery={setSearchQuery} />
              <AssignmentListAdmin searchQuery={searchQuery} />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default AssignmentAdminListPage
