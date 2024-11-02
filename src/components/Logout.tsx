import React from 'react';
import { IonButton, IonIcon } from "@ionic/react";
import { logOutOutline } from "ionicons/icons";

const Logout = () => {

  return (
    <IonButton color="danger" slot="end" >
      <IonIcon icon={logOutOutline} slot="start" />
      Logout
    </IonButton>
  );
};

export default Logout;
