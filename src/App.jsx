import "./App.css";
import { Route, Routes } from "react-router-dom";
import RequireAuth, { NonAuth } from "./guard/RoutesGuard";
import PageNotFound from "./components/pages/PageNotFound";
import useAxiosInterceptor from "./utils/AxiosIntercepter";
import AccessDenied from "./components/pages/denied/AccessDenied";
import RbacRoute from "./helper/Routes/Routes";
import HtmlRoutes from "./helper/Routes/HtmlRoutes";
import { useEffect } from "react";
import useWebSocket from "./helper/WebSocket";
import customContext from "./contexts/Context";
import Dashboard from "./components/pages/dashboard/Dashboard";
import RbacReadRoute from "./helper/Routes/ActionRoutes/ReadRoutes";
import StorageData from "./helper/storagehelper/StorageData";
import RbacCreateRoute from "./helper/Routes/ActionRoutes/CreateRoutes";
import RbacUpdateRoute from "./helper/Routes/ActionRoutes/UpdateRoutes";
import Login from "./components/pages/Login";

function App() {
  useAxiosInterceptor();
  const { userData } = customContext()

  const connection = useWebSocket();

  useEffect(() => {
    // console.log(connection, "Connection");
  }, [connection.isConnected, userData?.id]); // Only log when connection status changes

  const loggedInUserRole =
    (StorageData?.getUserData() && StorageData?.getUserData()) || "";


  return (
    <>
      <Routes>
      <Route
          path="/"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/login"
          element={
            <NonAuth>
              <Login />
            </NonAuth>
          }
        />
     




        {!loggedInUserRole.is_superuser ? [RbacCreateRoute(), RbacReadRoute(), RbacUpdateRoute()] : RbacRoute()}
        {/* {RbacRoute()} */}
        {HtmlRoutes()}
        {/* End  */}
        <Route path="/denied" element={<AccessDenied />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
