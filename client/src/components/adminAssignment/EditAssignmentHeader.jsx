function EditAssignmentHeader() {
    return (
        <div className="flex justify-between items-center px-10 py-4 border-solid border-0 border-b-[1px] border-gray-300">
            <div className="flex space-x-4">
                <div className="flex space-x-4 active:underline cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18.7915 11.0051H7.62148L12.5015 6.1251C12.8915 5.7351 12.8915 5.0951 12.5015 4.7051C12.1115 4.3151 11.4815 4.3151 11.0915 4.7051L4.50148 11.2951C4.11148 11.6851 4.11148 12.3151 4.50148 12.7051L11.0915 19.2951C11.4815 19.6851 12.1115 19.6851 12.5015 19.2951C12.8915 18.9051 12.8915 18.2751 12.5015 17.8851L7.62148 13.0051H18.7915C19.3415 13.0051 19.7915 12.5551 19.7915 12.0051C19.7915 11.4551 19.3415 11.0051 18.7915 11.0051Z" fill="#9AA1B9" />
                    </svg>
                    <h1 className="H3 text-[--gray600]">Assignment</h1>
                </div>
                <h1 className="H3">{"Assignment Name"}</h1>
            </div>
            <div className="space-x-4">
                <button className="Secondary">Cancel</button>
                <button className="Primary border-none">Save</button>
            </div>
        </div>
    )
}

export default EditAssignmentHeader