import AssignmentField from '../../components/adminAssignment/AssignmentField'
import Sidebar from '../../components/Sidebar'

function AddAssignmentPage() {
  return (
    <>
      <div className="flex  flex-row justify-center">
        <div className="w-[240px]  shadow-xl">
          <Sidebar isAssignmentPage={true} />
        </div>
        <div className="flex flex-col w-[1200px]  shadow-xl">
          <AssignmentField addAssignment={true} />
        </div>
      </div>
    </>
  )
}

export default AddAssignmentPage
