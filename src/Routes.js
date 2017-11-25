import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PropTypes from 'prop-types';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Invite from './containers/support_representatives/Invite';
import InviteAccept from './containers/support_representatives/InviteAccept';
import NewTicket from './containers/tickets/New';
import ShowTicket from './containers/tickets/Show';
import Reports from './containers/reports/Index';
import NotFound from './containers/NotFound';


const Routes = ({ childProps }) => {
  return (
    <Switch>
      <Route
        path="/"
        exact
        component={Home}
        props={childProps}
      />
      <Route
        path="/login"
        exact
        component={Login}
        props={childProps}
      />
      <Route
        path="/signup"
        exact
        component={Signup}
        props={childProps}
      />
      <Route
        path="/invite"
        exact
        component={Invite}
        props={childProps}
      />
      <Route
        path="/invitation/accept/:invitationToken"
        exact
        component={InviteAccept}
        props={childProps}
      />
      <Route
        path="/reports"
        exact
        component={Reports}
        props={childProps}
      />
      <Route
        path="/tickets/new"
        exact
        component={NewTicket}
        props={childProps}
      />
      <Route
        path="/tickets/:ticketId"
        exact
        component={ShowTicket}
        props={childProps}
      />
      {/* Finally, catch all unmatched routes */}
      <Route component={NotFound} />
    </Switch>
  );
}
;
Routes.propTypes = {
  childProps: PropTypes.object,
};
Routes.defaultProps = {
  childProps: {}
}
export default Routes;
