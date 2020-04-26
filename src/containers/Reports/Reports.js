import React, {useEffect, useState} from 'react'
import UserList from "../../components/UserList/UserList"
import ReportsAPI from "../../services/ReportsAPI"
import Container from 'react-bootstrap/Container';
import {useAuth0} from "../../shared/Auth";
import { getReportViewers, addViewerToReport } from '../../services/Firebase/FirebaseViewers';

const Reports = () => {

    const {loading, isAuthenticated, token, user} = useAuth0()

    const [userReports, setUserReports] = useState([])
    const [reportViewers, setReportViewers] = useState({})

    useEffect(() => {
        const getUserReports = async () => {
            const reportsFromApi = await ReportsAPI.getUserReports(token)
            setUserReports(reportsFromApi)
        }

        if (isAuthenticated && token) {
            getUserReports()
        }
    }, [isAuthenticated, token])

    useEffect(() => {
        const getReportViewersData = async () => {
            const viewers = await getReportViewers();
            setReportViewers(viewers);
        }
        getReportViewersData();
    }, []);

    const onViewReport = (reportId) => {
        addViewerToReport({
            reportId,
            doctorId: user.sub,
            doctorPicture: user.picture,
            doctorName: user.nickname
        });
    };

    if (loading) return <div>Cargando...</div>

    return (
        <Container>
            <h3 className="mb-3">Reportes</h3>
            <UserList
                reports={userReports}
                reportViewers={reportViewers}
                onViewReport={onViewReport}
            />
        </Container>
    )
}

Reports.propTypes = {}

export default Reports
