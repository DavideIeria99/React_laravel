import { Outlet } from "react-router-dom";
import Navbar from "../../UI/Navbar/Navbar";
import Footer from "../../UI/Footer/Footer";
import { ConfigProvider } from "../../../Context/Config/Index";


import AuthProvider from "../../../Context/Auth";
import StreamingProvider from "../../../Context/Streaming";


export default function Root() {
  return (
    <>
      <ConfigProvider>
        <AuthProvider>
          <StreamingProvider>

            <Navbar />
            <Outlet />
            <Footer />

          </StreamingProvider>
        </AuthProvider>
      </ConfigProvider>
    </>
  );
}
