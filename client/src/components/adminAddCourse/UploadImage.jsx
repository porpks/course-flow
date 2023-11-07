/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import SnackBar from "../SnackBar.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";

function UploadImage(props) {
  const [image, setImage] = useState("");
  const [avatar, setAvatar] = useState({});
  // const [avatarUrl, setAvatarUrl] = useState("");
  const { adminImageUrl, setAdminImageUrl } = useAuth()


  const handleUploadImage = (event) => {
    const imgFile = event.target.files[0];
    if (imgFile) {
      const allowedImgTypes = ["image/jpeg", "image/jpg", "image/png"];

      if (allowedImgTypes.includes(imgFile.type)) {
        if (imgFile.size <= 5 * 1024 * 1024) {
          const image_url = URL.createObjectURL(imgFile);
          // setGetImgUrl(URL.createObjectURL(imgFile));
          // setAvatar(imgFile);
          props.setGetImgUrl(imgFile);
          setAdminImageUrl(image_url);
          localStorage.setItem("image_url", image_url);
          props.getUrl(localStorage.getItem("image_url"));
        } else {
          displaySnackbar("File size exceeds 5 MB.");
        }
      } else {
        displaySnackbar(
          "Invalid file type. Please choose a .jpg, .jpeg, or .png file."
        );
      }
    }
  };

  const handleRemoveImage = async () => {
    setAvatar({});
    setAdminImageUrl("");
    setImage("");
    localStorage.removeItem("image_url");
  };

  function displaySnackbar(message) {
    setOpenSnackBar(false);
    setSnackbarMes(message);
    setOpenSnackBar(true);
  }
  const [openSnackbar, setOpenSnackBar] = useState(false);
  const [snackBarMes, setSnackbarMes] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  // console.log(props.submitData);

  useEffect(() => {
    if (props.submitData) {
      setAdminImageUrl("");
    }
  }, [props.submitData]);

  return (
    <div>
      {" "}
      <SnackBar
        open={openSnackbar}
        onClose={handleClose}
        severity={"error"}
        message={snackBarMes}
      />
      <div className="flex flex-col gap-[6px]">
        <label className="">Cover image *</label>
        <div className="relative h-fit">
          {/*---------------------- IMG THUMBNAIL UPLOAD -----------------------*/}
          {!adminImageUrl ? (
            <img
              src="../../../public/image/uploadImage.svg"
              className="relative bg-[--gray100] w-[358px] h-[358px] object-cover	rounded-2xl"
            />
          ) : null}
          {/*---------------------- IMG  UPLOAD -----------------------*/}
          {adminImageUrl ? (
            <img
              src={`${adminImageUrl}`}
              className="relative w-[480px]	rounded-2xl	"
            />
          ) : null}
          {/*---------------------- Close X BTN -----------------------*/}
          {adminImageUrl || image ? (
            <button
              className=" absolute top-0 left-[calc((480px)-2.5rem)] m-[6px] bg-[#9B2FAC] bg-opacity-95 rounded-full w-[30px] h-[30px] border-none cursor-pointer"
              onClick={handleRemoveImage}>
              <img
                src="../../../public/image/closeIcon.svg"
                alt=""
                className="w-[10px] h-[10px]"
              />
            </button>
          ) : null}
          {/*---------------------- UPLOAD BTN -----------------------*/}
          {!adminImageUrl ? (
            <div className="absolute top-0 left-0 w-[358px] h-[358px] border-[--blue500] border-[3px] rounded-2xl hover:border-dashed   group ">
              <label
                htmlFor="upload-img"
                className="hidden group-hover:block w-full h-full pt-[45px] text-[--blue500] text-center text-xl  cursor-pointer ">
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
