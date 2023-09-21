
function AssignmentField() {
    return (
        <><div className="p-10 bg-[--gray100] h-auto">
            <div className="bg-white w-full px-[100px] pt-10 pb-[60px] rounded-2xl border-solid border-[1px] border-[--gray300]">
                <from className="space-y-10">
                    <div className="w-1/2 pr-5">
                        <label htmlFor="course" className="text-lg">Course</label><br />
                        <select name="course" id="course"
                            required
                            className="w-full text-lg p-3 border-solid border-[1px] border-[--gray300] rounded-lg">
                            <option disabled selected>Choose course</option>
                            <option value="course1">course1</option>
                            <option value="course2">course2</option>
                        </select>
                    </div>
                    <div className="flex space-x-10">
                        <div className="w-1/2">
                            <label htmlFor="lesson" className="text-lg">Lesson</label><br />
                            <select name="lesson" id="lesson"
                                required
                                className="w-full text-lg p-3 border-solid border-[1px] border-[--gray300] rounded-lg">
                                <option disabled selected>Choose lesson</option>
                                <option value="lesson1">lesson1</option>
                                <option value="lesson2">lesson2</option>
                            </select>
                        </div>                    <div className="w-1/2">
                            <label htmlFor="sublesson" className="text-lg">Sub-lesson</label><br />
                            <select name="sublesson" id="sublesson"
                                required
                                className="w-full text-lg p-3 border-solid border-[1px] border-[--gray300] rounded-lg">
                                <option disabled selected>Choose sublesson</option>
                                <option value="sublesson1">sublesson1</option>
                                <option value="sublesson2">sublesson2</option>
                            </select>
                        </div>
                    </div>

                    <hr />
                    <h1 className="text-xl text-[--gray700]">Assignment detail</h1>

                    <div>
                        <label htmlFor="assignment" className="text-lg">Assignment *</label><br />
                        <input className="w-full text-lg p-3 border-solid border-[1px] border-[--gray300] rounded-lg" />
                    </div>
                    <div className="w-1/2 pr-5">
                        <label htmlFor="duration" className="text-lg">Duration of assignment (day)</label><br />
                        <select name="duration" id="duration"
                            required
                            className="w-full text-lg p-3 border-solid border-[1px] border-[--gray300] rounded-lg">
                            <option disabled selected>Choose duration</option>
                            <option value={2}>2 days</option>
                            <option value={3}>3 days</option>
                        </select>
                    </div>
                </from>
            </div>
        </div>

        </>
    )
}

export default AssignmentField