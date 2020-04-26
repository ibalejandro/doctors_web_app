import { database } from './configureFirebase';

export const getReportViewers = async () => {
    try {
        const snapshot = await database.ref('/reports').once('value');
        return snapshot.val();
    } catch (e) {
        console.log(e);
    }
};

export const addViewerToReport = async (reviewerData) => {
    try {
        database.ref().child('reports').push(reviewerData);
    } catch (e) {
        console.log(e);
    }
};
