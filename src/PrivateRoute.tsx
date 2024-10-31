import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { PrivateRouteProps } from './utils/types';
import Loading from './components/Loading';


const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <Loading />;

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? <Component {...props} /> : <Redirect to="/register" />
      }
    />
  );
};

export default PrivateRoute;
