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

export interface User {
    userId: string;
    name: string;
    email: string;
    contact: string;
    onWhatsApp: boolean;
    assignedTo: string | null;
    dateOfBirth: string;
    yearOfJoining: string;
    nextOfKin: string;
    parentContact: string;
    isAdmin: boolean;
    spinned: boolean;
    assigned: boolean;
    password: string;
}
