import React, { useEffect, useState } from 'react';
import { IonList, IonItem, IonLabel, IonCard, IonCardContent, IonButton, IonTitle, IonCardHeader } from '@ionic/react';
import './SpinnerWheel.css';
import registrationService from '../services/registrationService';

interface SpinnerWheelProps {
  name: string;
  startRotation: () => void;
}

const SpinnerWheel: React.FC<SpinnerWheelProps> = ({name, startRotation}) => {
  const [registrationStatus, setRegistrationStatus] = useState(false);

  useEffect(() => {
    registrationService.checkRegistrationStatus().then(status => setRegistrationStatus(status));
  }, []);

  return (
    <IonCard>
      <IonCardHeader>
        <IonTitle size="large">Click Button to see Your Gift Person</IonTitle>
      </IonCardHeader>
      <IonCardContent class="spin-content">
        <IonList lines="none" className={name}>
          <IonItem className="text-item">
            <IonLabel className='text' contentEditable='true' spellCheck='false'>1</IonLabel>
          </IonItem>
          <IonItem className="text-item">
            <IonLabel className='text' contentEditable='true' spellCheck='false'>2</IonLabel>
          </IonItem>
          <IonItem className="text-item">
            <IonLabel className='text' contentEditable='true' spellCheck='false'>3</IonLabel>
          </IonItem>
          <IonItem className="text-item">
            <IonLabel className='text' contentEditable='true' spellCheck='false'>4</IonLabel>
          </IonItem>
          <IonItem className="text-item">
            <IonLabel className='text' contentEditable='true' spellCheck='false'>5</IonLabel>
          </IonItem>
          <IonItem className="text-item">
            <IonLabel className='text' contentEditable='true' spellCheck='false'>6</IonLabel>
          </IonItem>
          <IonItem className="text-item">
            <IonLabel className='text' contentEditable='true' spellCheck='false'>7</IonLabel>
          </IonItem>
          <IonItem className="text-item">
            <IonLabel className='text' contentEditable='true' spellCheck='false'>8</IonLabel>
          </IonItem>
          <IonItem className="text-item">
            <IonLabel className='text' contentEditable='true' spellCheck='false'>9</IonLabel>
          </IonItem>
          <IonItem className="text-item">
            <IonLabel className='text' contentEditable='true' spellCheck='false'>10</IonLabel>
          </IonItem>
          <IonItem className="text-item">
            <IonLabel className='text' contentEditable='true' spellCheck='false'>11</IonLabel>
          </IonItem>
          <IonItem className="text-item">
            <IonLabel className='text' contentEditable='true' spellCheck='false'>12</IonLabel>
          </IonItem>
        </IonList>
        <IonButton type='button' className='spin-button' onClick={startRotation} disabled={registrationStatus}>SPIN</IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default SpinnerWheel;
