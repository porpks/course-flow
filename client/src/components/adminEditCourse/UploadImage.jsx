import React, { useState, useEffect } from "react";
import SnackBar from "../SnackBar.jsx";

function UploadImage(props) {
  const [image, setImage] = useState("");
  const [avatar, setAvatar] = useState({});
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleUploadImage = (event) => {
    displaySnackbar("Your course image upload was a success.");

    const imgFile = event.target.files[0];

    if (imgFile) {
      const allowedImgTypes = ["image/jpeg", "image/jpg", "image/png"];

      if (allowedImgTypes.includes(imgFile.type)) {
        if (imgFile.size <= 5 * 1024 * 1024) {
          const image_url = URL.createObjectURL(imgFile);
          // setGetImgUrl(URL.createObjectURL(imgFile));
          // setAvatar(imgFile);
          props.setGetImgUrl(imgFile);
          setAvatarUrl(image_url);
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
    setAvatarUrl("");
    props.setGetCoverImg("");
    // setImage("");
    localStorage.removeItem("image_url");
    console.log(`Delete`);
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
      setAvatarUrl("");
    }
  }, [props.submitData]);

  return (
    <div>
      {" "}
      <SnackBar
        open={openSnackbar}
        onClose={handleClose}
        severity={avatarUrl ? "success" : "error"}
        message={snackBarMes}
      />
      <div className="flex flex-col gap-[6px] mt-[40px]">
        <label className="">Cover image *</label>
        <div className="relative h-fit">
          {/*---------------------- IMG THUMBNAIL UPLOAD -----------------------*/}
          {!props.getCoverImg && !avatarUrl ? (
            <img
              src="../../../public/image/uploadImage.svg"
              className="relative bg-[--gray100] w-[358px] h-[358px] object-cover	rounded-2xl"
            />
          ) : null}

          {/*---------------------- IMG  UPLOAD -----------------------*/}
          {props.getCoverImg ? (
            <img
              src={`${props.getCoverImg}`}
              className="relative w-[calc(357px*1.5)] h-[calc(240px*1.5)] 	rounded-2xl	"
            />
          ) : null}

          {avatarUrl ? (
            <img
              src={`${avatarUrl}`}
              className="relative w-[480px]	rounded-2xl	"
            />
          ) : null}

          {/*---------------------- Close X BTN -----------------------*/}
          {props.getCoverImg || avatarUrl ? (
            <button
              className=" absolute top-0 left-[calc((480px)-2.5rem)] m-[6px] bg-[#9B2FAC] bg-opacity-95 rounded-full w-[30px] h-[30px] border-none cursor-pointer"
              onClick={handleRemoveImage}
            >
              <img
                src="../../../public/image/closeIcon.svg"
                alt=""
                className="w-[10px] h-[10px]"
              />
            </button>
          ) : null}

          {/*---------------------- UPLOAD BTN -----------------------*/}
          {!props.getCoverImg && !avatarUrl ? (
            <div className="absolute top-0 left-0  w-[358px] h-[358px]  border-[--blue500] border-[3px] rounded-2xl hover:border-dashed   group ">
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
