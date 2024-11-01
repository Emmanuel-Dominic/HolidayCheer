import { db } from "../firebaseConfig";
import { doc, getDoc } from 'firebase/firestore';


const registrationService = {
    checkRegistrationStatus: async () => {
        const statusDoc = await getDoc(doc(db, "registerStatus", "appStatus"));
        return statusDoc.exists() ? statusDoc.data().isOpen : false;
    }
}

export default registrationService;
