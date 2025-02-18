import React from "react";
import Header from "../../common/Header";
import LeftSidebar from "../../common/LeftSidebar";
import MainStory from "../story/MainStory";


const Dashboard = () => {


  return (
    <>
      <Header />
      <main className="main-body">
        <div className="main-row">
          <LeftSidebar />
          <div className="body-content">
            <MainStory />
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
