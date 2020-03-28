import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import VoxImplantManager from "../../services/VoxImplantManager"

VoxImplantManager.setUp()
// VoxImplantManager.makeCall("+573163703362")

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
    return (
        <div>
            <h1>Video Call</h1>
        </div>
    )
}

VideoCall.propTypes = {

}

export default VideoCall
