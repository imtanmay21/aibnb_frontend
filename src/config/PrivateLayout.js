import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateLayout = () => {
    const { accessToken } = useSelector((state) => state.UserReducer);

    console.log("accessToken", accessToken);

    // if (auth_token === "") {
    //     return <Navigate to="/" replace />;
    // }

    return <Outlet />;
};

export default PrivateLayout;
