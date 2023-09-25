import Sidebar from "../../components/Sidebar"
import AssignmentField from "../../components/adminAssignment/AssignmentField"

function EditAssignmentPage() {
    return (
        <>
            <div className="flex">
                <div className="w-[240px]">
                    <Sidebar />
                </div>
                <div className="flex flex-col w-full">
                    <AssignmentField editAssignment={true} />
                    <div className="bg-[--gray100] px-10 text-end">
                        <h1 className="text-lg text-[--blue500] active:underline cursor-pointer">Delete Assignment</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditAssignmentPage