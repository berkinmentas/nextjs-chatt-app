import React from "react";
import SideBar from "../components/SideBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseconfig";
import Login from "../components/Login";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <h1>loading...</h1>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  if (error) {
    return <Login />;
  }

  return (
    <main className="w-full font-disp h-screen flex justify-between gap-x-6 p-3 lg:p-4 iems-center bg-gradient-to-br from-mSec  to-dSec  ">
      {/*Side Bar */}
      <div className="w-full lg:w-max lg:min-w-[25%]">
        <SideBar />
      </div>
    </main>
  );
};

export default Home;
