import axios from 'axios';

const REPORTS_API_URL = process.env.REACT_APP_REPORTS_API_URL

class ReportsAPI {
    static async getUserReports(token) {
        try {
            const response = await axios({
                url: REPORTS_API_URL + '/reports/',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                method: 'get'
            });

            return response.data.reports.map((report) => {
                return {
                    ...report,
                    comorbidity: report.diagnosedWith,
                    city: report.postalCode
                }
            })
        } catch (error) {
            console.error(error);
            return []
        }
    }

    static async getReportForUser(reportId, token) {
        try {
            const response = await axios({
                url: REPORTS_API_URL + '/reports/' + reportId,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                method: 'get'
            });
            const report = response.data;
            return {
                ...report,
                comorbidity: report.diagnosedWith,
                city: report.postalCode
            }
        } catch (error) {
            console.error(error)
            return []
        }
    }
}

export default ReportsAPI
