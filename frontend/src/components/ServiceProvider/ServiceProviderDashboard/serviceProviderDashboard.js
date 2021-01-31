import React from 'react';
import DashboardNav from '../../Navbars/DashboardNav';
import { useHistory, useLocation } from 'react-router-dom';
export default function ServiceProviderDashboard() {
    const history = useHistory();
    const location = useLocation();
    function onAddNewPostClick() {
        history.push("./add-post")
    }

    function onCreateProfileClick() {
        history.push("./profile")
    }
    return (
        <>
            <DashboardNav />

            <div className="dashboard-bg">
                <br />
                <br />
                <br />
                <br />
                <h2 className="welcome-msg">Thank You Join With Us</h2> <br /><br /><br />
                <div class="row mt-3">
                    <div class="col-lg-6 sm-6">
                        <button className="btn btn-primary w-50 bold-font" onClick={() => onCreateProfileClick()}>Create Your Profile</button>
                    </div>
                    <div class="col-lg-6 sm-6">
                        <button className="btn btn-primary w-50 bold-font" onClick={() => onAddNewPostClick()}>Add Post</button>
                    </div>
                </div>
            </div>


        </>
    )
}