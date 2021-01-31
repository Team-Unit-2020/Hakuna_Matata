
import Home from "../components/Home/Home";
import Confirm from "../components/User/Confirm";
import Login from "../components/User/Login";
import PasswordReset from "../components/User/PasswordReset";
import Register from "../components/User/Register";
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
            path: "/signup",
            exact: true,
            component: Register,
        },
        {
            path: "/service-provider/profile",
            exact: true,
            component: ServiceProviderProfile,
        },
        {
            path: "/service-provider/dashboard",
            exact: true,
            component: ServiceProviderDashboard,
        },
        {
            path: "/service-provider/add-post",
            exact: true,
            component: ServiceProviderAddPost,
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
        }
    ]
};


export default GetPublicRoutes;