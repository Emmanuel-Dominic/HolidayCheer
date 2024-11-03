import React from 'react';
import {
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonSkeletonText,
    IonThumbnail,
  } from '@ionic/react'
import './Loading.css';

const Loading: React.FC = () => {
  return (
    <IonList>
        <IonListHeader>
            <IonSkeletonText animated={true} style={{ width: '80px' }}></IonSkeletonText>
        </IonListHeader>
        <IonItem>
            <IonThumbnail slot="start">
                <IonSkeletonText animated={true}></IonSkeletonText>
            </IonThumbnail>
        </IonItem>
        <IonItem>
            <IonLabel>
                <h3>
                <IonSkeletonText animated={true} style={{ width: '80%' }}></IonSkeletonText>
                </h3>
                <p>
                <IonSkeletonText animated={true} style={{ width: '60%' }}></IonSkeletonText>
                </p>
                <p>
                <IonSkeletonText animated={true} style={{ width: '30%' }}></IonSkeletonText>
                </p>
            </IonLabel>
        </IonItem>
    </IonList>
  );
};

export default Loading;
