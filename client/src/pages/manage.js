import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Members from "../components/Manage/Members/index"

function Manage() {
  return (
    <Router>
      <div className = "management">
        hi
          <Route exact path="/manage/members" component={Members} />
      </div>
    </Router>
  );
}
export default Manage;