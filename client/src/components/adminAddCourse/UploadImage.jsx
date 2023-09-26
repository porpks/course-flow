import React, { useState, useEffect } from "react";
357 * 240;
function UploadImage() {
  const [image, setImage] = useState("");
  const [avatar, setAvatar] = useState({});
  const [avatarUrl, setAvatarUrl] = useState("");
  const handleUploadImage = (event) => {
    const imgFile = event.target.files[0];
    if (imgFile) {
      const allowedImgTypes = ["image/jpeg", "image/jpg", "image/png"];

      if (allowedImgTypes.includes(imgFile.type)) {
        if (imgFile.size <= 5 * 1024 * 1024) {
          setAvatar(imgFile);
          setAvatarUrl(URL.createObjectURL(imgFile));
        } else {
          alert("File size exceeds 5 MB.");
        }
      } else {
        alert("Invalid file type. Please choose a .jpg, .jpeg, or .png file.");
      }
    }
  };

  const handleRemoveImage = async () => {
    setAvatar({});
    setAvatarUrl("");
    setImage("");

    // await axios.put(`http://localhost:4000/profile/delete/${userId}`);
  };

  // console.log(`avatar : ${avatar}`);
  // console.log(`avatar URL : ${avatarUrl}`);
  return (
    <div>
      <div className="flex flex-col gap-[6px]">
        <label className="">Cover image *</label>
        <div className="relative h-fit">
          {/*---------------------- IMG THUMBNAIL UPLOAD -----------------------*/}
          {!avatarUrl ? (
            <img
              src="../public/image/uploadImage.svg"
              className="relative bg-[--gray100] w-[358px] h-[358px] object-cover	rounded-2xl"
            />
          ) : null}
          {/*---------------------- IMG  UPLOAD -----------------------*/}
          {avatarUrl ? (
            <img
              src={`${avatarUrl}`}
              className="relative w-[calc(357px*1.5)] h-[calc(240px*1.5)] 	rounded-2xl	"
            />
          ) : null}
          {/*---------------------- Close X BTN -----------------------*/}
          {avatarUrl || image ? (
            <button
              className=" absolute top-0 left-[calc((357px*1.5)-2.5rem)] m-[6px] bg-[#9B2FAC] bg-opacity-95 rounded-full w-[30px] h-[30px] border-none cursor-pointer"
              onClick={handleRemoveImage}
            >
              <img
                src="../public/image/closeIcon.svg"
                alt=""
                className="w-[10px] h-[10px]"
              />
            </button>
          ) : null}
          {/*---------------------- UPLOAD BTN -----------------------*/}
          {!avatarUrl ? (
            <div className="absolute top-0 left-0 w-[358px] h-[358px] border-[--blue500] border-[3px] rounded-2xl hover:border-dashed   group ">
              <label
                htmlFor="upload-img"
                className="hidden group-hover:block w-full h-full pt-[45px] text-[--blue500] text-center text-xl  cursor-pointer "
              >
                <input
                  id="upload-img"
                  name="avatar"
                  type="file"
                  onChange={(e) => handleUploadImage(e)}
                  hidden
                />
              </label>
            </div>
          ) : null}
          {/*------------------------------------------------------------*/}
        </div>
      </div>
    </div>
  );
}

export default UploadImage;
