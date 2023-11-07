import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import SnackBar from "../SnackBar.jsx";

function UploadVideo(props) {
  const [vdo, setVdo] = useState("");
  const [avatarVdo, setAvatarVdo] = useState({});
  const [vdoUrl, setVdoUrl] = useState("");

  //   console.log(`VDO : ${avatarVdo}`);
  //   console.log(`VDO URL : ${VdoUrl}`);

  const handleUploadVideo = async (event) => {
    displaySnackbar("Your course video upload was a success.");

    const vdoFile = event.target.files[0];

    if (vdoFile) {
      const allowedVdoTypes = [
        "video/mp4",
        "video/quicktime",
        "video/x-msvideo",
      ];

      if (allowedVdoTypes.includes(vdoFile.type)) {
        if (vdoFile.size <= 20 * 1024 * 1024) {
          const video_url = URL.createObjectURL(vdoFile);
          props.setGetVdoUrl(vdoFile);
          setVdoUrl(URL.createObjectURL(vdoFile));
          localStorage.setItem("video_url", video_url);
          props.getUrl(localStorage.getItem("video_url"));
        } else {
          displaySnackbar("File size exceeds 20 MB.");
        }
      } else {
        displaySnackbar(
          "Invalid video type. Please choose a .mp4, .mov, or .avi file."
        );
      }
    }
  };

  const handleRemoveVdo = async () => {
    setVdoUrl("");
    props.setGetVideoTrailer("");
    // setVdo("");
    localStorage.removeItem("video_url");
    // await axios.put(`http://localhost:4000/profile/delete/${userId}`);
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

  useEffect(() => {
    if (props.submitData) {
      setVdoUrl("");
    }
  }, [props.submitData]);
  return (
    <div>
      <SnackBar
        open={openSnackbar}
        onClose={handleClose}
        severity={vdoUrl ? "success" : "error"}
        message={snackBarMes}
      />
      <div className="flex flex-col gap-[6px] mt-[40px]">
        <label className="">Video Trailer *</label>
        <div className="relative ">
          {/*---------------------- IMG THUMBNAIL UPLOAD -----------------------*/}
          {!props.getVideoTrailer && !vdoUrl ? (
            <img
              src="../../../public/image/uploadVdo.svg"
              className="relative w-[358px] h-[358px] object-cover rounded-2xl	"
            />
          ) : null}

          {/*---------------------- VDO PLAYER -----------------------*/}
          {props.getVideoTrailer ? (
            <div className="vdo-preview flex justify-start items-center rounded-[8px] w-[739px] h-[460px] cursor-pointer ">
              <ReactPlayer
                url={`${props.getVideoTrailer}`}
                width="100%"
                height="100%"
                controls={true}
                // light={dataDetail.cover_img}
                playIcon={"../../../public/image/playIcon.svg"}
              />
            </div>
          ) : null}

          {vdoUrl || vdo ? (
            <div className="vdo-preview rounded-[8px] w-[739px] h-[460px] cursor-pointer ">
              <ReactPlayer
                url={`${vdoUrl}`}
                width="100%"
                height="100%"
                controls={true}
                // light={dataDetail.cover_img}
                playIcon={"../../../public/image/playIcon.svg"}
              />
            </div>
          ) : null}

          {/*---------------------- Close X BTN -----------------------*/}
          {vdoUrl || props.getVideoTrailer ? (
            <button
              className=" absolute top-[22px] left-[698px] m-[6px] bg-[#9B2FAC] bg-opacity-95 rounded-full w-[30px] h-[30px] border-none cursor-pointer"
              onClick={handleRemoveVdo}
            >
              <img
                src="../../../public/image/closeIcon.svg"
                alt=""
                className="w-[10px] h-[10px]"
              />
            </button>
          ) : null}

          {/*---------------------- UPLOAD BTN -----------------------*/}

          {!props.getVideoTrailer && !vdoUrl ? (
            <div className="absolute top-0 left-0 w-[358px] h-[358px] border-[--blue500] border-[3px] rounded-2xl hover:border-dashed   group ">
              <label
                htmlFor="video-upload"
                className="hidden group-hover:block w-full h-full pt-[45px] rounded-full  cursor-pointer "
              >
                <input
                  id="video-upload"
                  name="video"
                  type="file"
                  onChange={(e) => handleUploadVideo(e)}
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

export default UploadVideo;
