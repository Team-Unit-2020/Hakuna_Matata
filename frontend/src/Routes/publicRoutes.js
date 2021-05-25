
import Home from "../components/Home/Home";
import Confirm from "../components/User/Confirm";
import Login from "../components/User/Login";
import PasswordReset from "../components/User/PasswordReset";
import RegisterAsServiceSeeker from "../components/User/RegisterAsServiceSeeker";
import ViewAd from '../components/Home/ViewAd'
import ServiceProviderProfile from '../components/ServiceProvider/ServiceProviderProfile/serviceProviderProfile';
import ServiceProviderDashboard from '../components/ServiceProvider/ServiceProviderDashboard/serviceProviderDashboard';
import ServiceProviderAddPost from '../components/ServiceProvider/ServiceProviderAddPost/serviceProviderAddPost';

const GetPublicRoutes = () => {
    return [
        {
            path: "/",
            exact: true,
            component: Home,
        },
        {
            path: "/login",
            exact: true,
            component: Login,
        },
        {
            path: "/service-seeker/signup",
            exact: true,
            component: RegisterAsServiceSeeker,
        },
        {
            path: "/confirm/:code",
            exact: true,
            component: Confirm,
        },
        {
            path: "/reset/:code",
            exact: true,
            component: PasswordReset,
        },
        {
            path: "/ad/:id",
            exact: true,
            component: ViewAd,
        }
    ]
};


export default GetPublicRoutes;