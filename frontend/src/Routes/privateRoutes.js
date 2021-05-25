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
        userType: "user"
    },
    {
        path: "/profile",
        exact: true,
        component: Profile,
        userType: "user"
    },
    {
        path: "/order/:orderId",
        exact: true,
        component: OrderPage,
        userType: "user"
    },
    {
        path: "/service-provider/profile",
        exact: true,
        component: ServiceProviderProfile,
        userType: "sp"
    },
    {
        path: "/service-provider/dashboard",
        exact: true,
        component: ServiceProviderDashboard,
        userType: "sp"
    },
    {
        path: "/service-provider/add-post",
        exact: true,
        component: ServiceProviderAddPost,
        userType: "sp"
    },
    {
        path: "/favourites",
        exact: true,
        component: Favourites,
        userType: "user"
    },
    {
        path: "/orders",
        exact: true,
        component: MyOrders,
        userType: "user"
    },
    {
        path: "/payment/:orderId",
        exact: true,
        component: Payment,
        userType: "user"
    },
    {
        path: "/payment_confirmation/:orderId",
        exact: true,
        component: PaymentConfirm,
        userType: "user"
    }
]

export default GetPrivateRoutes;