import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function ModalAssignmentDelete(props) {
  const navigate = useNavigate()

  const { deleteAssignment, setDeleteAssignment } = useAuth();
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:4000/assignment/${deleteAssignment.assignment_id}`
      );

      setDeleteAssignment({
        state: false,
        assignment_id: null,
      });
      // eslint-disable-next-line react/prop-types
      if (props.editPage) {
        navigate('/admin/assingmentlist')
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className='h-screen bg-black/70 relative'>
      <div className='absolute top-[40.185%] left-[36.25%] Modal w-[528px]  bg-white rounded-3xl shadow flex-col justify-start items-center flex'>
        <div className='Top self-stretch px-6 py-2 border-b border-gray-200 justify-start items-center flex'>
          <div className="Confirmation grow shrink basis-0 text-black text-xl font-normal font-['Inter'] leading-loose">
            Confirmation
          </div>

          <svg
            width='41'
            height='40'
            viewBox='0 0 41 40'
            fill='none'
            onClick={() =>
              setDeleteAssignment({
                state: false,
                sublesson_id: null,
              })
            }
            className='Exit w-10 h-10 relative cursor-pointer'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M15.5312 24.8486L25.4706 15.1516M15.5312 15.1516L25.4706 24.8486'
              stroke='#C8CCDB'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
        <div className='Detail w-[528px] p-6 flex-col justify-start items-start gap-6 flex'>
          <div className='Detail h-6 flex-col justify-start items-start gap-2.5 flex'>
            <div className="DoYouSureToDeleteThisAssignment text-slate-500 text-base font-normal font-['Inter'] leading-normal">
              Do you sure to delete this assignment?
            </div>
          </div>
          <div className='ButtonWrapper justify-start items-start gap-4 flex'>
            <div
              className='Secondary w-[316px] h-[60px] px-8 py-4 bg-white rounded-xl shadow  justify-center items-center gap-2.5 flex'
              onClick={handleDelete}>
              <div className=" text-center  text-base font-bold font-['Inter'] leading-normal">
                Yes, I want to delete assignment
              </div>
            </div>
            <div className='Primary w-[142px] h-[60px] px-8 py-4 bg-blue-800 rounded-xl shadow justify-center items-center gap-2.5 flex'>
              <div
                className=" text-center text-white text-base font-bold font-['Inter'] leading-normal"
                onClick={() =>
                  setDeleteAssignment({
                    state: false,
                    sublesson_id: null,
                  })
                }>
                No, I don’t
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalAssignmentDelete;
