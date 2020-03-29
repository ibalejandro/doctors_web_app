import axios from 'axios';

const REPORTS_API_URL = 'http://34.215.55.134:7272'

class ReportsAPI {
    static async getUserReports() {
        try {
            const response = await axios.get(REPORTS_API_URL + '/api/reports');
            return response.data
        } catch (error) {
            console.error(error);
            return []
        }
    }

    static async getReportForUser(userId) {
        try {
            const response = await axios.get(REPORTS_API_URL + '/api/reports/' + userId)
            return response.data
        } catch (error) {
            console.error(error)
            return []
        }
    }
}

export default ReportsAPI
