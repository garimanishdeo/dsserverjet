import React from 'react';


// const MapContainer = React.lazy(() => import('./views/map/MapContainer'));
const Dashboard_New = React.lazy(() => import('./views/dashboard/version_1/Dashboard_New'));
const Business = React.lazy(() => import('./views/business/BusinessContainer'));






const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard_New },
  // { path: '/map', name: 'Maps', component: MapContainer },
  { path: '/business', name: 'DS Servers', component: Business }


];

export default routes;
