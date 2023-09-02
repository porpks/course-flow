import { useState } from "react";

function UpdateProfile() {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative flex flex-col items-center w-[1440px] h-[995px]">
      <div className="absolute left-[102px] top-[100px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none">
          <circle cx="5.5" cy="5.5" r="4" stroke="#2F5FAC" stroke-width="3" />
        </svg>
      </div>

      <div className="absolute left-[43px] top-[159px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none">
          <circle cx="13.1741" cy="13.1741" r="13.1741" fill="#C6DCFF" />
        </svg>
      </div>

      <div className="absolute left-[1387px] top-[216px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="53"
          height="74"
          viewBox="0 0 53 74"
          fill="none">
          <circle cx="37" cy="37" r="37" fill="#C6DCFF" />
        </svg>
      </div>

      <div className="absolute right-[126.22px] top-[126px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="51"
          height="51"
          viewBox="0 0 51 51"
          fill="none">
          <path
            d="M11.3581 19.9099L37.1499 15.9774L27.6597 40.28L11.3581 19.9099Z"
            stroke="#FBAA1C"
            stroke-width="3"
          />
        </svg>
      </div>

      <h2 className="H2 pt-[100px] pb-[72px]">Profile</h2>
      <div className="flex justify-between w-[930px] h-[521px] bg-cover">
        <div className="relative">
          <img
            src="../public/image/user_profile.png"
            className="relative w-[358px] h-[358px] object-cover	rounded-2xl	"
          />
          <button className="flex justify-center items-center absolute top-0 right-0 m-[6px] bg-[#9B2FAC] rounded-full w-[32px] h-[32px] border-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none">
              <path
                d="M5.82422 16.1764L16.1772 5.82349M5.82422 5.82349L16.1772 16.1764"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="w-[453px] Body2">
          <div>Name</div>
          <input
            type="text"
            className="p-[12px] w-[100%] h-[48px] rounded-lg border-gray-400 border-[1px] border-solid bg-utility-white mb-[40px]"
            placeholder="Enter Name and Lastname"
          />

          <div>Date of Birth</div>
          <div className="relative w-[100%] h-[48px] mb-[40px]">
            <input
              type={focused ? "date" : "text"}
              className="p-[12px] w-[100%] h-[48px] rounded-lg border-gray-400 border-[1px] border-solid "
              placeholder="DD/MM/YYYY"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={{
                backgroundImage:
                  'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%239AA1B9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6.75 3V5.25M17.25 3V5.25M3 18.75V7.5C3 6.90326 3.23705 6.33097 3.65901 5.90901C4.08097 5.48705 4.65326 5.25 5.25 5.25H18.75C19.3467 5.25 19.919 5.48705 20.341 5.90901C20.7629 6.33097 21 6.90326 21 7.5V18.75M3 18.75C3 19.3467 3.23705 19.919 3.65901 20.341C4.08097 20.7629 4.65326 21 5.25 21H18.75C19.3467 21 19.919 20.7629 20.341 20.341C20.7629 19.919 21 19.3467 21 18.75M3 18.75V11.25C3 10.6533 3.23705 10.081 3.65901 9.65901C4.08097 9.23705 4.65326 9 5.25 9H18.75C19.3467 9 19.919 9.23705 20.341 9.65901C20.7629 10.081 21 10.6533 21 11.25V18.75M12 12.75H12.008V12.758H12V12.75ZM12 15H12.008V15.008H12V15ZM12 17.25H12.008V17.258H12V17.25ZM9.75 15H9.758V15.008H9.75V15ZM9.75 17.25H9.758V17.258H9.75V17.25ZM7.5 15H7.508V15.008H7.5V15ZM7.5 17.25H7.508V17.258H7.5V17.25ZM14.25 12.75H14.258V12.758H14.25V12.75ZM14.25 15H14.258V15.008H14.25V15ZM14.25 17.25H14.258V17.258H14.25V17.25ZM16.5 12.75H16.508V12.758H16.5V12.75ZM16.5 15H16.508V15.008H16.5V15Z"/></svg>\')',
                backgroundSize: "24 ",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right center",
              }}
            />
          </div>

          <div>Educational Background</div>
          <input
            type="text"
            className="p-[12px] w-[100%] h-[48px] rounded-lg border-gray-400 border-[1px] border-solid mb-[40px]"
            placeholder="Enter Educational Background"
          />

          <div>Email</div>
          <input
            type="text"
            className="p-[12px] w-[100%] h-[48px] rounded-lg border-gray-400 border-[1px] border-solid mb-[37px]"
            placeholder="Enter Email"
          />

          <button className="Primary w-[100%] border-none">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}
export default UpdateProfile;
