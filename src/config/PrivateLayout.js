import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const PrivateLayout = () => {
    const { accessToken } = useSelector((state) => state.UserReducer);

    console.log("accessToken", accessToken);

    return <Outlet />;
};

export default PrivateLayout;
