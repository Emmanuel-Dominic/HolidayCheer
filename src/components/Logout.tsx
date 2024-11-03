import React, { useState } from 'react';
import { IonAlert, IonButton, IonIcon } from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import { useHistory } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Logout = () => {
  const [showAlert, setShowAlert] = useState(false);
  const history = useHistory();
  const { currentUser, logout } = useAuth();

  if (!currentUser) return null;

  const handleLogout = async() => {
    await logout();
    history.push("/login");
  };

  return (
    <>
      <IonButton onClick={() => setShowAlert(true)} color="danger" slot="end" >
        <IonIcon icon={logOutOutline} slot="start" />
        Logout
      </IonButton>

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="Confirm Logout"
        message="Are you sure you want to log out?"
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Logout",
            handler: handleLogout,
          },
        ]}
      />
    </>
  );
};

export default Logout;
