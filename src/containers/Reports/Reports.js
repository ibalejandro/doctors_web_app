import React, {useEffect, useState} from 'react'
import UserList from "../../components/UserList/UserList"
import ReportsAPI from "../../services/ReportsAPI"
import Container from 'react-bootstrap/Container';
import {useAuth0} from "../../shared/Auth";

const Reports = () => {

    const {loading, isAuthenticated, token} = useAuth0()

    const [userReports, setUserReports] = useState([])

    useEffect(() => {
        const getUserReports = async () => {
            const reportsFromApi = await ReportsAPI.getUserReports(token)
            setUserReports(reportsFromApi)
        }

        if (isAuthenticated && token) {
            getUserReports()
        }
    }, [isAuthenticated, token])

    if (loading) return <div>Cargando...</div>

    return (
        <Container>
            <h3 className="mb-3">Reportes</h3>
            <UserList reports={userReports}/>
        </Container>
    )
}

Reports.propTypes = {}

export default Reports
