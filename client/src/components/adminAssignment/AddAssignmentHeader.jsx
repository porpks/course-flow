
function AddAssignmentHeader() {
    return (
        <div className="flex justify-between items-center px-10 py-4 border-solid border-0 border-b-[1px] border-gray-300">
            <h1 className="H3">Add Assignment</h1>
            <div className="space-x-4">
                <button className="Secondary">Cancel</button>
                <button className="Primary border-none">Create</button>
            </div>
        </div>
    )
}

export default AddAssignmentHeader