import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import UserList from "../../components/UserList/UserList"
import ReportsAPI from "../../services/ReportsAPI"

const Reports = ({}) => {

    const [userReports, setUserReports] = useState([])

    useEffect(() => {
        const getUserReports = async () => {
            const reportsFromApi = await ReportsAPI.getUserReports()
            setUserReports(reportsFromApi)
        }
        getUserReports()
    },[])

    return (
        <div>
            <UserList reports={userReports}/>
        </div>
    )
}

Reports.propTypes = {

}

export default Reports
