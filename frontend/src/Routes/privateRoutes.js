import Dashboard from "../components/Dashboard/Dashboard";
import Profile from "../components/Profile/Profile";
import OrderPage from '../components/Order/OrderPage'
import ServiceProviderAddPost from "../components/ServiceProvider/ServiceProviderAddPost/serviceProviderAddPost";
import ServiceProviderDashboard from "../components/ServiceProvider/ServiceProviderDashboard/serviceProviderDashboard";
import ServiceProviderProfile from "../components/ServiceProvider/ServiceProviderProfile/serviceProviderProfile";
import MyOrders from '../components/MyOrders/MyOrders';
import Favourites from '../components/Favourites/Favourites';
import Payment from "../components/MyOrders/Payment";
import PaymentConfirm from "../components/MyOrders/PaymentConfirm";

const GetPrivateRoutes = () => [
    {
        path: "/dashboard",
        exact: true,
        component: Dashboard,
    },
    {
        path: "/profile",
        exact: true,
        component: Profile,
    },
    {
        path: "/order/:orderId",
        exact: true,
        component: OrderPage,
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
        path: "/favourites",
        exact: true,
        component: Favourites,
    },
    {
        path: "/orders",
        exact: true,
        component: MyOrders,
    },
    {
        path: "/payment/:orderId",
        exact: true,
        component: Payment,
    },
    {
        path: "/payment_confirmation/:orderId",
        exact: true,
        component: PaymentConfirm,
    }
]

export default GetPrivateRoutes;