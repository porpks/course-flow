import AddAssignmentHeader from "../../components/adminAssignment/AddAssignmentHeader"
import AssignmentField from "../../components/adminAssignment/AssignmentField"
import Sidebar from "../../components/Sidebar"

function AddAssignmentPage() {
  return (
    <>
      <div className="flex">
        <div className="w-[240px]">
          <Sidebar />
        </div>
        <div className="flex flex-col w-full">
          <AddAssignmentHeader />
          <AssignmentField />
        </div>
      </div>
    </>
  )
}

export default AddAssignmentPage