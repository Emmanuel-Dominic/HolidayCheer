import React, {useCallback, useEffect, useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardContent } from '@ionic/react';
import { DocumentData } from 'firebase/firestore';
import './Home.css';
import SpinnerWheel from '../components/SpinnerWheel';
import SlidingItem from '../components/SlidingItem';
import { User } from '../utils/types';
import userService from '../services/userService';
import Loading from '../components/Loading';
import Logout from '../components/Logout';


const isUser = (data: DocumentData): data is User => {
  return (
    'userId' in data &&
    'name' in data &&
    'email' in data &&
    'contact' in data &&
    'onWhatsApp' in data &&
    'assignedTo' in data &&
    'dateOfBirth' in data &&
    'yearOfJoining' in data &&
    'nextOfKin' in data &&
    'parentContact' in data &&
    'isAdmin' in data &&
    'assigned' in data &&
    'password' in data &&
    true
  );
};

const HomePage: React.FC = () => {
  const [name, setName] = useState("circle");
  const [assignment, setAssignment] = useState<User | null>(null);
  const [spinned, setSpinned] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const startRotation = useCallback(() => {
    setName("circle start-rotate");
  
    setTimeout(() => {
      setName("circle start-rotate stop-rotate");
      setSpinned(true);
    }, 5000);
  }, [setName, setSpinned]);

  const fetchAssignment = useCallback(async () => {
    setIsLoading(true);
    const userProfile = await userService.myProfile();

    if (userProfile && userProfile.assignedTo) {
      const giftingRecord = await userService.amGifting(userProfile.assignedTo);
      if (giftingRecord && isUser(giftingRecord)) {
        setAssignment(giftingRecord);
      } else {
        setAssignment(null);
      }
    }
    setIsLoading(false);
  }, [userService]);

  useEffect(() => {
    fetchAssignment()
  }, [fetchAssignment])
  
  return !isLoading ? (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
          <Logout />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {spinned ? (
          <SpinnerWheel name={name} startRotation={startRotation} />) :
          (
          <IonCard>
            <IonCardHeader>
              <IonTitle>Assigned DFN</IonTitle>
            </IonCardHeader>
            <IonCardContent>
              {assignment && <SlidingItem user={assignment} />}
            </IonCardContent>
          </IonCard>
          )
        }
      </IonContent>
    </IonPage>):
    (
      <Loading />
    );
};

export default HomePage;
