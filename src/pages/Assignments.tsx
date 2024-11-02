import React, { useEffect, useState, useCallback } from 'react';
import { IonSpinner, IonList, IonTitle, IonCardHeader, IonCardContent, IonCard, IonItem, IonText, IonContent, IonToolbar, IonHeader, IonPage } from '@ionic/react';
import { User } from '../utils/types';
import registrationService from '../services/registrationService';
import userService from '../services/userService';
import './Assignments.css';
import SlidingItem from '../components/SlidingItem';
import Loading from '../components/Loading';
import Logout from '../components/Logout';

const AssignmentPage: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [assignments, setAssignments] = useState<User[]>([]);
  const [unAssignments, setUnAssignments] = useState<User[]>([]);
  const [registrationStatus, setRegistrationStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAdmin = useCallback(async () => {
    setIsLoading(true);
    const data = await userService.isAdminUser();
    setIsAdmin(data);
    setIsLoading(false);
  }, [userService, setIsAdmin, setIsLoading]);
  
  const fetchUnAssignments = useCallback(async () => {
    setIsLoading(true);
    const unAssignedUsers = await userService.getUnAssignments();
    setUnAssignments(unAssignedUsers);
    setIsLoading(false);
  }, [userService, setUnAssignments, setIsLoading]);
  
  const fetchAssignments = useCallback(async () => {
    setIsLoading(true);
    const assignedUsers = await userService.getAssignments();
    setAssignments(assignedUsers);
    setIsLoading(false);
  }, [userService, setAssignments, setIsLoading]);

  useEffect(() => {
    registrationService.checkRegistrationStatus().then(status => setRegistrationStatus(status));
    fetchAdmin();
    fetchAssignments();
    fetchUnAssignments();
  }, [fetchAdmin, fetchAssignments, fetchUnAssignments]);
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Assignments</IonTitle>
          <Logout />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {isLoading ? (<Loading />): (
        <>
        {registrationStatus ? (
          <IonCard>
            <IonCardHeader>
              <IonTitle size="large">Registration Still in Progress</IonTitle>
              <IonText>Once all people are assigned, they will appear here.</IonText>
            </IonCardHeader>
            <IonCardContent>
                <IonSpinner color="warning" name="lines-sharp" />
            </IonCardContent>
          </IonCard>
          ) : (
          <IonCard>
            <IonCardHeader>
              <IonTitle size="large">Assigned DFN</IonTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
              {assignments.map((assignment) => (
                <IonItem key={assignment.userId}>
                  <SlidingItem user={assignment} />
                </IonItem>
              ))}
              </IonList>
            </IonCardContent>
          </IonCard>
        )}
        {isAdmin ? (
          <IonCard>
            <IonCardHeader>
              <IonTitle size="large">UnAssigned DFN</IonTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
              {unAssignments.map((assignment) => (
                <IonItem key={assignment.userId}>
                  <SlidingItem user={assignment} />
                </IonItem>
              ))}
              </IonList>
            </IonCardContent>
          </IonCard>
        ): ''}
        </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default AssignmentPage;
