import {database} from './configureFirebase';
import {useListVals} from "react-firebase-hooks/database";

export const addViewerToReport = async (reviewerData) => {
    try {
        const ref = await database.ref().child('reports').push(reviewerData);
        await ref.onDisconnect().remove()
        return ref
    } catch (e) {
        console.log(e);
        return null
    }
};

export const useViewerList = () => {
    const [viewers, loading, error] = useListVals(database.ref('/reports'))
    if (error) console.log("Firebase could not get viewers", error)
    if (!viewers || loading || error || !Array.isArray(viewers)) {
        return []
    } else {
        return viewers
    }
}
