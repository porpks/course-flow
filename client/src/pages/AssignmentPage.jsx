import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../components/Assignment.css";
import { useState } from "react";
function AssignmentPage() {
  const [answer, setanswer] = useState(false);
  return (
    <>
      <div className='flex flex-col items-center '>
        <Navbar />
        <div className='h-[1990px] bg-white relative w-[1440px] '>
          <svg
            width='1418'
            height='190'
            viewBox='0 0 1418 190'
            fill='none'
            className='absolute top-[100px] left-[22px]'
            xmlns='http://www.w3.org/2000/svg'>
            <circle cx='64.5' cy='5.5' r='4' stroke='#2F5FAC' strokeWidth='3' />
            <circle cx='1381' cy='153' r='37' fill='#C6DCFF' />
            <circle cx='13.1741' cy='72.1741' r='13.1741' fill='#C6DCFF' />
            <path
              d='M1231.36 45.9099L1257.15 41.9774L1247.66 66.28L1231.36 45.9099Z'
              stroke='#FBAA1C'
              strokeWidth='3'
            />
            <path
              d='M248.843 132L243.838 150.68'
              stroke='#2FAC61'
              strokeWidth='3'
              strokeLinecap='round'
            />
            <path
              d='M237 138.838L255.681 143.843'
              stroke='#2FAC61'
              strokeWidth='3'
              strokeLinecap='round'
            />
          </svg>
          <div className=' w-[453px] h-[153px] flex-col justify-start items-center gap-14 inline-flex absolute top-[100px] left-[493.5px]'>
            <div className=' flex-col justify-start items-center gap-[60px] flex'>
              <div className='MyAssignments H2'>My Assignments</div>
            </div>
            <div className=' justify-start items-start gap-4 inline-flex'>
              <div className='Component1 p-2 flex items-start gap-2 hover:border-b-2 border-solid border-black border-t-0 border-r-0 border-l-0 border-b-0'>
                <div className='Body2'>All</div>
              </div>
              <div className='Component4 p-2 flex items-start gap-2 hover:border-b-2 border-solid border-black border-t-0 border-r-0 border-l-0 border-b-0'>
                <div className='Body2'>Pending</div>
              </div>
              <div className='Component1 p-2 flex items-start gap-2 hover:border-b-2 border-solid border-black border-t-0 border-r-0 border-l-0 border-b-0'>
                <div className='Body2'>In progress</div>
              </div>
              <div className='Component2 p-2 flex items-start gap-2 hover:border-b-2 border-solid border-black border-t-0 border-r-0 border-l-0 border-b-0'>
                <div className='Body2'>Submitted</div>
              </div>
              <div className='Component3 p-2 flex items-start gap-2 hover:border-b-2 border-solid border-black border-t-0 border-r-0 border-l-0 border-b-0'>
                <div className='Body2'>Overdue</div>
              </div>
            </div>
          </div>
          <div className='Frame427321008 w-[1120px]  flex-col justify-start items-start gap-6 inline-flex absolute top-[285px] left-[160px]'>
            <div className='Frame427321006 px-24 py-10 bg-slate-200 rounded-lg flex-col justify-start items-start gap-9 flex w-[100%]'>
              <div className='Frame427321001 w-[100%] justify-start items-start gap-6 inline-flex '>
                <div className='Frame427321000 grow shrink basis-0 flex-col justify-start items-start gap-3 inline-flex w-[100%]'>
                  <div className='CourseServiceDesignEssentials self-stretch text-black text-2xl font-medium leading-loose w-[100%]'>
                    Course: Service Design Essentials
                  </div>
                  <div className='Introduction4LevelsOfServiceDesignInAnOrganization self-stretch text-slate-500 text-base font-normal leading-normal'>
                    Introduction: 4 Levels of Service Design in an Organization{" "}
                  </div>
                </div>
                <div className='Frame427321007 flex-col justify-start items-end gap-2 inline-flex'>
                  <div className='StatusHomework px-2 py-1 bg-yellow-50 rounded justify-start items-start gap-2 inline-flex'>
                    <div className='Pending text-yellow-700 text-base font-medium leading-normal'>
                      Pending
                    </div>
                  </div>
                  <div className='Email text-slate-500 text-base font-normal leading-normal'>
                    Assign within 2 days
                  </div>
                </div>
              </div>
              <div className='w-[100%] Frame427321002  p-6 bg-white rounded-lg border border-gray-300 justify-start items-end gap-6 inline-flex'>
                <div className='InputStyle grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex'>
                  <div className='Label self-stretch justify-start items-start gap-1 inline-flex'>
                    <div className='Email grow shrink basis-0 Body2'>
                      What are the 4 elements of service design?
                    </div>
                  </div>
                  <div className='InputField self-stretch pl-3 pr-4 py-3 bg-white rounded-lg border border-solid border-gray-300 justify-start items-start gap-2 inline-flex'>
                    <div className='ContainerInputText relative grow shrink basis-0 h-[96px] justify-start items-start flex'>
                      <input
                        className='placeholder-slate-400 placeholder-opacity-50 outline-none border-none Placeholder grow shrink basis-0 text-slate-400 text-base font-normal leading-normal h-[100%]'
                        onChange={() => setanswer(true)}></input>
                      {!answer && (
                        <span className='absolute top-0 left-0 transform translate-y-1/2 translate-x-1 p-2 pointer-events-none text-slate-400 text-base'>
                          Answer...
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className=' Frame427321003 flex-col  items-start gap-4 inline-flex justify-center '>
                  <div className='Primary mb-[20px] self-stretch px-8 py-4 bg-blue-800 rounded-xl shadow justify-center items-center gap-2.5 inline-flex'>
                    <div className=' text-center text-white text-base font-bold leading-normal'>
                      Submit
                    </div>
                  </div>
                  <div className='ButtonGhost px-2 py-1 rounded-2xl justify-center items-center gap-2 inline-flex'>
                    <div className='Register text-blue-800 text-base font-bold leading-normal h-[32px] '>
                      Open in Course
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
export default AssignmentPage;
