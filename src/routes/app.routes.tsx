import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard/Dashboard";
import List from "../pages/List/List";

const AppRoutes = () => (
  <Layout>
    <Switch>
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/list/:type" exact component={List} />
    </Switch>
  </Layout>
);

export default AppRoutes;
