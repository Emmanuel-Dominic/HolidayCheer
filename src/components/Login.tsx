import React, { useState } from 'react';
import { IonText, IonLabel, IonInput, IonItem, IonList, IonButton, IonTitle, IonCard, IonCardContent, IonCardHeader, IonContent, IonPage, IonHeader, IonToolbar } from '@ionic/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useHistory } from 'react-router-dom';
import './Login.css';


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (!email.includes('@') || email.length < 5) {
      setError('Invalid email address.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      history.push('/');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Login</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <IonCard className='loginPage'>
        <IonCardHeader>
          <IonText color="dark">
            <IonTitle size="large">Login Form</IonTitle>
          </IonText>
        </IonCardHeader>
        <IonCardContent>
          <IonList>
            <form onSubmit={handleLogin} className='loginForm'>
              {error && <IonText color="danger">{error}</IonText>}
              <IonItem>
                <IonLabel position="floating">
                  Email
                </IonLabel>
                <IonInput
                  fill="outline"
                  type="email"
                  value={email}
                  onIonInput={(event) => setEmail(event.detail.value as string)}
                  required
                />              
              </IonItem>
              <IonItem>
                <IonLabel position="floating">
                  Password
                </IonLabel>
                <IonInput
                  fill="outline"
                  type="password"
                  value={password}
                  onIonInput={(event) => setPassword(event.detail.value as string)}
                  required
                />
              </IonItem>
              <IonButton expand="block" type="submit" color="secondary" disabled={email.length < 5 || password.length < 3}>Login</IonButton>
              <IonItem>
                <IonText>
                  Don&apos;t have an account? <a href="/register">Register here</a>
                </IonText>
              </IonItem>
            </form>
          </IonList>
        </IonCardContent>
      </IonCard>
    </IonContent>
  </IonPage>
  );
};

export default LoginPage;
