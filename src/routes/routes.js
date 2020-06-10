import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import MapView from '../components/MapView/MapView'

export default function AppRoutes() {
  return( 
    <Switch>
      <Route  path='/map' component={MapView}/>
      <Redirect to="/map" />
    </Switch>
  );
}
