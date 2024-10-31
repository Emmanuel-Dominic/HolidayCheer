import { User as FirebaseUser } from 'firebase/auth';
import { ReactNode } from 'react';


export interface AuthContextType {
    currentUser: FirebaseUser | null;
    loading: boolean;
    logout: () => Promise<void>;
}

export interface AuthProviderProps {
    children: ReactNode;
}

export interface PrivateRouteProps {
    component: React.ComponentType<any>;
    path: string;
    exact?: boolean;
}
