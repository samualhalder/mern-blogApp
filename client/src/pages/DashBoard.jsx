import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSideBar from "../components/DashSideBar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";

function DashBoard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const urlTab = urlParams.get("tab");
    setTab(urlTab);
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSideBar />
      </div>
      {tab === "profile" ? <DashProfile /> : null}
      {tab === "posts" ? <DashPosts /> : null}
      {tab === "users" ? <DashUsers /> : null}
      {tab === "comments" ? <DashComments /> : null}
    </div>
  );
}

export default DashBoard;
