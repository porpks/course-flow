
// eslint-disable-next-line react/prop-types
function LearningVdo({ videoHead, videoKey }) {
    if (videoKey) {
        return (
            <>
                <div className="h-[90px]">
                    <h1 className="H2">{videoHead}</h1>
                </div>
                <div className="w-full">
                    <h1 className="H3">VDO: {videoKey}</h1>
                </div>
            </>
        )
    }

}

export default LearningVdo