import { User } from '../utils/types';
import { collection, getDocs, doc, setDoc, writeBatch, query, where, DocumentData } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';


const getUsers = async (): Promise<User[]> => {
  const usersSnapshot = await getDocs(collection(db, 'dfnUsers'));

  const users: User[] = usersSnapshot.docs.map((doc) => {
    const data = doc.data();
    
    const user: User = {
      userId: data.userId,
      name: data.name,
      email: data.email,
      contact: data.contact,
      onWhatsApp: data.onWhatsApp,
      assignedTo: data.assignedTo,
      dateOfBirth: data.dateOfBirth,
      isAdmin: data.isAdmin,
      yearOfJoining: data.yearOfJoining,
      nextOfKin: data.nextOfKin,
      parentContact: data.parentContact,
      assigned: data.assigned,
      spinned: data.spinned,
      password: data.password,
    };
    
    return user;
  });

  return users;
};

const getAssignments = async (): Promise<User[]> => {
    const usersSnapshot = await getDocs(collection(db, 'dfnUsers'));
  
    const users: User[] = usersSnapshot.docs
        .map((doc) => {
            const data = doc.data();
            const user: User = {
            userId: data.userId,
            name: data.name,
            email: data.email,
            contact: data.contact,
            onWhatsApp: data.onWhatsApp,
            assignedTo: data.assignedTo,
            isAdmin: data.isAdmin,
            dateOfBirth: data.dateOfBirth,
            yearOfJoining: data.yearOfJoining,
            nextOfKin: data.nextOfKin,
            parentContact: data.parentContact,
            assigned: data.assigned,
            spinned: data.spinned,
            password: data.password,
            };

            if (user.assigned && (user.assignedTo || user.assignedTo !== "")) {
                return user;
            }
            return undefined;
        })
        .filter((user): user is User => user !== undefined);
  
    return users;
};
  
const getUnAssignments = async (): Promise<User[]> => {
    const usersSnapshot = await getDocs(collection(db, 'dfnUsers'));
  
    const users: User[] = usersSnapshot.docs
        .map((doc) => {
            const data = doc.data();
            const user: User = {
            userId: data.userId,
            name: data.name,
            email: data.email,
            contact: data.contact,
            onWhatsApp: data.onWhatsApp,
            assignedTo: data.assignedTo,
            isAdmin: data.isAdmin,
            dateOfBirth: data.dateOfBirth,
            yearOfJoining: data.yearOfJoining,
            nextOfKin: data.nextOfKin,
            parentContact: data.parentContact,
            assigned: data.assigned,
            spinned: data.spinned,
            password: data.password,
            };

            if (!user.assigned && (!user.assignedTo || user.assignedTo === "")) {
                return user;
            }

            return undefined;
        })
        .filter((user): user is User => user !== undefined);
  
    return users;
};
  
const registerUser = async (userData: {
    email: string;
    password: string;
    name: string;
    contact: string;
    dateOfBirth: string;
    yearOfJoining: string;
    nextOfKin: string;
    parentContact: string;
    onWhatsApp: boolean;
  }) => {
    try {
      const emailQuerySnapshot = await getDocs(query(collection(db, 'dfnUsers'), where('email', '==', userData.email)));
      const contactQuerySnapshot = await getDocs(query(collection(db, 'dfnUsers'), where('contact', '==', userData.contact)));

      if (!emailQuerySnapshot.empty || !contactQuerySnapshot.empty) {
        throw new Error('Email or contact is already in use.');
      }

      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      const user = userCredential.user;

      await setDoc(doc(db, 'dfnUsers', user.uid), {
        userId: user.uid,
        name: userData.name,
        email: userData.email,
        contact: userData.contact,
        assignedTo: "",
        dateOfBirth: userData.dateOfBirth,
        isAdmin: false,
        yearOfJoining: userData.yearOfJoining,
        nextOfKin: userData.nextOfKin,
        parentContact: userData.parentContact,
        assigned: false,
        spinned: false,
        onWhatsApp: userData.onWhatsApp,
      });

      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || 'Registration failed.');
      } else {
        throw new Error('An unknown error occurred during registration.');
      }
    }
}

const myProfile = async (): Promise<DocumentData | null> => {
    const user = auth.currentUser;
  
    if (!user) {
      console.log("No user is currently logged in.");
      return null;
    }
  
    const q = query(collection(db, 'dfnUsers'), where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);
  
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { userId: doc.id, ...doc.data() };
    } else {
      return null;
    }
 };
  
const amGifting = async (assignedToValue: string): Promise<DocumentData | null> => {
    const q = query(collection(db, 'dfnUsers'), where('assignedTo', '==', assignedToValue));
    const querySnapshot = await getDocs(q);
  
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { userId: doc.id, ...doc.data() };
    } else {
      return null;
    }
};

const isAdminUser = async() => {
    const user = auth.currentUser;
    if (!user) {
      console.log("No user is currently logged in.");
      return false;
    }
    const q = query(collection(db, 'dfnUsers'), where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);
    const userData = querySnapshot.docs[0].data();
    return userData.isAdmin;
}

const sendMessage = async (userId: string) => {
    const q = query(collection(db, 'dfnUsers'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    const userData = querySnapshot.docs[0].data();
    const contact = userData.contact;
    const onWhatsApp = userData.onWhatsApp;
    
    if (contact.startsWith('+')) {
        return onWhatsApp 
            ? window.open(`https://wa.me/${contact.slice(1)}`)
            : window.open(`sms:${contact.slice(1)}`);
    } else if (contact.startsWith('0')) {
        return onWhatsApp 
            ? window.open(`https://wa.me/256${contact.slice(1)}`)
            : window.open(`sms:+256${contact.slice(1)}`);
    } else {
        return onWhatsApp 
            ? window.open(`https://wa.me/${contact}`)
            : window.open(`sms:+${contact}`);
    }
};

const AssignUsers = async () => {
  const usersSnapshot = await getDocs(collection(db, 'dfnUsers'));
  const users = usersSnapshot.docs.map((userDoc) => {
    const data = userDoc.data();
    return {
      userId: data.userId,
      name: data.name,
      email: data.email,
      contact: data.contact,
      onWhatsApp: data.onWhatsApp,
      assignedTo: data.assignedTo,
      dateOfBirth: data.dateOfBirth,
      yearOfJoining: data.yearOfJoining,
      nextOfKin: data.nextOfKin,
      parentContact: data.parentContact,
      isAdmin: data.isAdmin,
      spinned: data.spinned,
      assigned: data.assigned,
      password: data.password
    } as User;
  });

  let unassignedUsers = users.filter((user) => !user.assigned);

  unassignedUsers = unassignedUsers.sort(() => Math.random() - 0.5);

  const assignments = [];
  for (let i = 0; i < unassignedUsers.length - 1; i++) {
    const user = unassignedUsers[i];
    const nextUser = unassignedUsers[i + 1];

    assignments.push({
      fromUser: user.userId,
      toUser: nextUser.userId,
    });
  }

  if (unassignedUsers.length > 1) {
    assignments.push({
      fromUser: unassignedUsers[unassignedUsers.length - 1].userId,
      toUser: unassignedUsers[0].userId,
    });
  }

  const batch = writeBatch(db);
  assignments.forEach(({ fromUser, toUser }) => {
    const fromUserDocRef = doc(db, 'dfnUsers', fromUser);
    batch.update(fromUserDocRef, {
      assigned: true,
      assignedTo: toUser,
    });
  });

  await batch.commit();
};

export default { getUsers, getAssignments, sendMessage, myProfile, registerUser, amGifting, isAdminUser, getUnAssignments, AssignUsers };
