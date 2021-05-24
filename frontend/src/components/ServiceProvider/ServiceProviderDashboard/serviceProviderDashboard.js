import React from "react";
import DashboardNav from "../../Navbars/DashboardNav";
import HomePageNav from '../../Navbars/HomePageNav';
import { useHistory, useLocation } from "react-router-dom";
export default function ServiceProviderDashboard() {
  const history = useHistory();
  const location = useLocation();
  function onAddNewPostClick() {
    history.push("./add-post");
  }

  function onCreateProfileClick() {
    history.push("./profile");
  }
  return (
    <div
      style={{
        backgroundImage:
          "url(" + require("../../../assets/img/addPosts.png") + ")",
        backgroundRepeat: "repeat-x",
        minHeight: 1000,
      }}
    >
      <DashboardNav transparent={true}/>

      <div className="dashboard-bg">
        <br />
        <br />
        <br />
        <br />
        <h2 className="welcome-msg"  style ={{color: "black", backgroundColor:"rgba(255,255,255,0.9)"}}>Thank You Join With Us</h2> <br />
        <br />
        <br />
        <div className="row">
          <div className="col-lg-6 ml-auto mr-auto sm-6">
            <button
              className="btn btn-primary w-50 bold-font"
              onClick={() => onAddNewPostClick()}
            >
              Add Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
