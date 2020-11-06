import Dashboard from "../components/Dashboard/Dashboard";

const GetPrivateRoutes = () => [
    {
        path: "/dashboard",
        exact: true,
        component: Dashboard,
    }
]

export default GetPrivateRoutes;