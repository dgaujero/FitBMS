import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Attendance from "../components/Manage/attendance";
import NavTabs from '../components/navTabs'
import Members from "../components/Manage/members";
import Classes from "../components/Manage/classes";

function Manage() {
  return (
    <div>
      <Router>
        <div className="management">
        <NavTabs></NavTabs>
          <Route exact path="/manage/attendance" component={Attendance} />
          <Route exact path="/manage/members" component={Members} />
          <Route exact path="/manage/classes" component={Classes} />
        </div>
      </Router>
    </div>
  );
}
export default Manage;
