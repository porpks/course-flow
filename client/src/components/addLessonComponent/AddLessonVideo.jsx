import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'

import SnackBar from '../SnackBar.jsx'

function AddLessonVideo() {
  const [vdo, setVdo] = useState('')
  const [avatarVdo, setAvatarVdo] = useState({})
  const [VdoUrl, setVdoUrl] = useState('')

  console.log(`VDO : ${avatarVdo}`)
  console.log(`VDO URL : ${VdoUrl}`)

  const handleUploadVideo = async (event) => {
    const vdoFile = event.target.files[0]

    if (vdoFile) {
      const allowedVdoTypes = [
        'video/mp4',
        'video/quicktime',
        'video/x-msvideo',
      ]

      if (allowedVdoTypes.includes(vdoFile.type)) {
        if (vdoFile.size <= 20 * 1024 * 1024) {
          setAvatarVdo(vdoFile)
          setVdoUrl(URL.createObjectURL(vdoFile))
        } else {
          displaySnackbar('File size exceeds 20 MB.')
        }
      } else {
        displaySnackbar(
          'Invalid video type. Please choose a .mp4, .mov, or .avi file.'
        )
      }
    }
  }

  function displaySnackbar(message) {
    setOpenSnackBar(false)
    setSnackbarMes(message)
    setOpenSnackBar(true)
  }
  const [openSnackbar, setOpenSnackBar] = useState(false)
  const [snackBarMes, setSnackbarMes] = useState('')

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackBar(false)
  }

  const handleRemoveVdo = async () => {
    setAvatarVdo({})
    setVdoUrl('')
    setVdo('')
    // await axios.put(`http://localhost:4000/profile/delete/${userId}`);
  }
  return (
    <>
      <SnackBar
        open={openSnackbar}
        onClose={handleClose}
        severity={'error'}
        message={snackBarMes}
      />
      <div>
        <div className="flex flex-col gap-[6px]">
          <div className="relative ">
            {/*---------------------- IMG THUMBNAIL UPLOAD -----------------------*/}
            {VdoUrl || vdo ? null : (
              <img
                src="../../public/image/uploadVdo.svg"
                className="relative w-[250px] h-[250px] object-cover rounded-2xl  	"
              />
            )}
            {/*---------------------- VDO PLAYER -----------------------*/}
            {VdoUrl || vdo ? (
              <div className="vdo-preview rounded-[8px] w-[739px] h-[460px] cursor-pointer ">
                <ReactPlayer
                  url={`${VdoUrl}`}
                  width="100%"
                  height="100%"
                  controls={true}
                  // light={dataDetail.cover_img}
                  playIcon={'../public/image/playIcon.svg'}
                />
              </div>
            ) : null}
            {/*---------------------- Close X BTN -----------------------*/}
            {VdoUrl || vdo ? (
              <button
                className=" absolute top-[22px] left-[698px] m-[6px] bg-[#9B2FAC] bg-opacity-95 rounded-full w-[30px] h-[30px] border-none cursor-pointer"
                onClick={handleRemoveVdo}
              >
                <img
                  src="../../public/image/closeIcon.svg"
                  alt=""
                  className="w-[10px] h-[10px]"
                />
              </button>
            ) : null}
            {/*---------------------- UPLOAD BTN -----------------------*/}

            {!VdoUrl ? (
              <div className="absolute top-0 left-0 w-[250px] h-[250px] border-[2px] border-[--gray300] border-solid rounded-2xl hover:border-dashed  hover:border-[--blue500] hover:border-[3px]   group ">
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
    </>
  )
}

export default AddLessonVideo
