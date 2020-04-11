import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import VoxImplantManager from "../../services/VoxImplantManager"
import CallWidget from "../../components/CallWidget/CallWidget"
import VideoCallWidget from "../../components/VideoCallWidget/VideoCallWidget"

// VoxImplantManager.setUp()

const VideoCall = ({}) => {

    /*
    const [userReports, setUserReports] = useState([])

    useEffect(() => {
        const getUserReports = async () => {
            const reportsFromApi = await ReportsAPI.getUserReports()
            setUserReports(reportsFromApi)
        }
        getUserReports()
    },[])
    */

    function onCall(numberToCall) {
        numberToCall = "+57" + numberToCall
        VoxImplantManager.makeCall(numberToCall)
    }

    function onHangUp() {
        VoxImplantManager.hangUp()
    }

    function onVideoCall(citizenId) {
        window.open("https://talky.io/" + citizenId)
    }

    return (
        <div>
            <CallWidget onCall={onCall} onHangUp={onHangUp} />
            <br />
            <VideoCallWidget onVideoCall={onVideoCall} />
        </div>
    )
}

VideoCall.propTypes = {

}

export default VideoCall
