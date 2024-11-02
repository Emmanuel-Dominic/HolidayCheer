import React from 'react';
import { IonItemSliding, IonItemOptions, IonItemOption, IonIcon, IonItem, IonText } from '@ionic/react';
import { callOutline, logoWhatsapp, chatboxEllipses } from 'ionicons/icons';
import { User } from '../utils/types';
import userService from '../services/userService';


interface SlidingItemProps {
    user: User;
}
  
const SlidingItem: React.FC<SlidingItemProps> = ({user}) => {

  const handleCalling = (e: React.MouseEvent<HTMLIonItemOptionElement, MouseEvent>, contact: string) => {
    return window.open(`tel:${contact}`);
  };

  const handleMessaging = async (e: React.MouseEvent<HTMLIonItemOptionElement, MouseEvent>, userId: string) => {
    return await userService.sendMessage(userId);
  };

  return (
    <IonItemSliding>
      <IonItemOptions side="start">
      <IonItemOption color="secondary" onClick={(e) => handleCalling(e, user.contact)}>
          <IonIcon slot="icon-only" icon={callOutline}></IonIcon>
      </IonItemOption>
      </IonItemOptions>

      <IonItem>
        <IonText slot='start'>{user.name}</IonText>
      </IonItem>

      <IonItemOptions side="end">
      <IonItemOption color={user.onWhatsApp ? "success": "primary"} onClick={(e) => handleMessaging(e, user.userId)}>
          <IonIcon slot="icon-only" icon={user.onWhatsApp ? logoWhatsapp: chatboxEllipses}></IonIcon>
      </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default SlidingItem;
