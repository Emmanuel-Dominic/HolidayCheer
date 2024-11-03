import React, { useState, useEffect, useCallback } from 'react';
import { IonIcon, IonPage, IonContent, IonText, IonButton, IonAvatar, IonImg, IonCardTitle, IonCardContent, IonCard, IonHeader, IonList, IonItem, IonTitle, IonLabel, IonToolbar } from '@ionic/react';
import { call, cog, logIn, personAdd, refresh, star } from 'ionicons/icons';
import userService from '../services/userService';
import Loading from '../components/Loading';
import "./Guideline.css";
import Logout from '../components/Logout';

const GuidelinePage: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAdmin = useCallback(async () => {
    setIsLoading(true);
    const data = await userService.isAdminUser();
    setIsAdmin(data);
    setIsLoading(false);
  }, [userService, setIsAdmin, setIsLoading]);

  const handleAssignUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      await userService.AssignUsers()
      alert('Users have been assigned successfully');
    } catch (error) {
      console.error("Error assigning users: ", error);
      alert("Failed to assign users");
    } finally {
      setIsLoading(false);
    }
  }, [userService, setIsLoading]);

  useEffect(() => {
    fetchAdmin();
  }, [fetchAdmin]);

  return !isLoading ? (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Guidelines</IonTitle>
              <Logout />
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <IonContent>
              <IonCard className="profile">
                <IonCardContent>
                  <IonAvatar class="profile-pic">
                    <IonImg src="https://avatars.githubusercontent.com/u/50827537?s=400&u=2e9e73feeabc076b66a5032340a327974c87de11&v=4" />
                  </IonAvatar>
                  <IonCardTitle class="profile-title">
                    <IonTitle>By:</IonTitle>
                    <IonText>
                      <IonIcon color='warning' icon={star} /> 
                      Emmanuel Dominic 
                      <IonIcon color='warning' icon={star} />
                    </IonText>
                  </IonCardTitle>
                  <IonList lines="none">
                    <IonItem>
                      <IonText class="ion-margin-y-small">
                        Being a lifelong learner of technology, and an excellent team player whilst maintaining integrity and confidentiality is at the core of what I do.
                      </IonText>
                    </IonItem>
                    <IonItem>
                      <IonText>
                        ReadMore:&nbsp;<a href="https://www.ematembu.com">Profile</a>.
                      </IonText>
                    </IonItem>
                  </IonList>
                </IonCardContent>
                {isAdmin ? (
                  <IonButton type="button" onClick={handleAssignUsers} disabled={isLoading}>
                    {isLoading ? 'Assigning...' : 'Cast Assign Users'}
                  </IonButton>
                ) : ''}
              </IonCard>
              <IonCard>
                <IonCardContent>
                  <IonList className="guide-list">
                    <IonItem>
                      <IonLabel>
                        <IonTitle><IonIcon icon={personAdd} /> Register</IonTitle>
                        <IonText>Complete the registration form with accurate details. Follow the specific guidelines below for each field.</IonText>
                        <IonList lines="none">
                          <IonItem className='text-title'>Personal Details:</IonItem>
                          <IonItem>• Name: Minimum 3 characters required.</IonItem>
                          <IonItem>• Email: Must be a valid email address (e.g., example@example.com).</IonItem>
                          <IonItem>• Contact: 10-13 characters, starting with &apos;07&apos;, &apos;256&apos;, or &apos;+256&apos;.</IonItem>
                          <IonItem>• Date of Birth: Must be within the past 45 years.</IonItem>
                          <IonItem>• Year of Joining: Must be within the past 30 years.</IonItem>
                          
                          <IonItem className='text-title'>Next Of Kin/Guardian Details:</IonItem>
                          <IonItem>• Next of Kin: Minimum 3 characters required.</IonItem>
                          <IonItem>• Next of Kin Contact: 10-13 characters, starting with &apos;07&apos;, &apos;256&apos;, or &apos;+256&apos;.</IonItem>
                          <IonItem>• Password: Minimum 8 characters for account security.</IonItem>
                        </IonList>
                      </IonLabel>
                    </IonItem>

                    <IonItem>
                      <IonLabel>
                        <IonTitle><IonIcon icon={logIn} /> Login</IonTitle>
                        <IonText>Use your registered email and password to log in.</IonText>
                        <IonList lines="none">
                          <IonItem>• Email: Enter the registered email.</IonItem>
                          <IonItem>• Password: Enter your account password (minimum 3 characters).</IonItem>
                        </IonList>
                        <IonText>Note: Verify your email/contact and password before logging in to avoid login errors.</IonText>
                        <IonList lines="none">
                          <IonItem>New User?:&nbsp;<a href="/register">Register</a></IonItem>
                          <IonItem>Need Help?:&nbsp;<a href="tel:+256700701616">ContactSupport</a></IonItem>
                        </IonList>
                      </IonLabel>
                    </IonItem>

                    <IonItem>
                      <IonLabel>
                        <IonTitle><IonIcon icon={refresh} /> Spin</IonTitle>
                        <IonText>Press &apos;Spin&apos; to reveal your assigned gift person.</IonText>
                        <IonList lines="none">
                          <IonItem>• Press &apos;Spin&apos; to initiate the wheel. This option is only available after registration closes.</IonItem>
                          <IonItem>• Wait for the wheel to stop and view your assigned gift person&apos;s details.</IonItem>
                          <IonItem>• Swipe right to make a call to your assigned gift person.</IonItem>
                          <IonItem>• Swipe left to contact your assigned gift person via SMS or WhatsApp (if registered on WhatsApp).</IonItem>
                        </IonList>
                        <IonText>Note: Ensure a stable internet connection for optimal spinning experience.</IonText>
                      </IonLabel>
                    </IonItem>

                    <IonItem>
                      <IonLabel>
                        <IonTitle><IonIcon icon={call} /> Contact</IonTitle>
                        <IonText>Use the following options to reach your assigned gift person:</IonText>
                        <IonList lines="none">
                          <IonItem>• Swipe right to call your gift person directly.</IonItem>
                          <IonItem>• Swipe left to send an SMS or contact them on WhatsApp (if available).</IonItem>
                        </IonList>
                      </IonLabel>
                    </IonItem>

                    <IonItem>                      
                      <IonLabel>
                        <IonTitle><IonIcon icon={cog} /> Admin Dashboard</IonTitle>
                        <IonText>Access is limited to admins, allowing them to view assigned and unassigned users.</IonText>
                      </IonLabel>
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>
            </IonContent>
          </IonContent>
        </IonPage>
      ) : (
        <Loading />
      );
}

export default GuidelinePage;
