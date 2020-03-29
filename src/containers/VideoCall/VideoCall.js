import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import VoxImplantManager from "../../services/VoxImplantManager"
import CallWidget from "../../components/CallWidget/CallWidget"

VoxImplantManager.setUp()

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

    return (
        <div>
            <CallWidget onCall={onCall} onHangUp={onHangUp} />
        </div>
    )
}

VideoCall.propTypes = {

}

export default VideoCall
