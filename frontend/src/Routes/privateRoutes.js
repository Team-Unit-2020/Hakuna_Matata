import Dashboard from "../components/Dashboard/Dashboard";
import ServiceProviderAddPost from "../components/ServiceProvider/ServiceProviderAddPost/serviceProviderAddPost";
import ServiceProviderDashboard from "../components/ServiceProvider/ServiceProviderDashboard/serviceProviderDashboard";
import ServiceProviderProfile from "../components/ServiceProvider/ServiceProviderProfile/serviceProviderProfile";

const GetPrivateRoutes = () => [
    {
        path: "/dashboard",
        exact: true,
        component: Dashboard,
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
]

export default GetPrivateRoutes;