import React, {useState} from "react";
import VideoCallExplanationCard from "../../components/VideoCallExplanationCard/VideoCallExplanationCard";

const VideoCallExplanation = () => {
    const [showVideo, setShowVideo] = useState(false);

    const showVideoHandler = () => {
        const newShowVideo = !showVideo;
        setShowVideo(newShowVideo);
    };

    return (
        <VideoCallExplanationCard showVideo={showVideo} onShowVideoClick={showVideoHandler}/>
    );
};

export default VideoCallExplanation;