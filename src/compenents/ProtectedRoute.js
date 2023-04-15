import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import HeaderTabs from "./Header";
import SideBar from "./SideBar";

import appIcon from "../assets/icons/applications.png";
import programsIcon from "../assets/icons/programs.png";
import usersIcon from "../assets/icons/users.png";
import documentsIcon from "../assets/icons/documents.png";
import ApplicationForm from "./ApplicationForm";

import {
  IconBroadcast,
  IconUser,
  IconCash,
  IconLayoutList,
  IconLayoutDashboard,
} from "@tabler/icons";

const links = [
  {
    link: "/",
    label: "Dashboard",
    icon: IconLayoutDashboard,
  },
  {
    link: "/Contacts",
    label: "Employees",
    icon: IconUser,
  },
  {
    link: "/Payrolls",
    label: "Payrolls",
    icon: IconCash,
  },
  {
    link: "/transactions",
    label: "Trasactions",
    icon: IconLayoutList,
  },
];

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [formStatus, setFormStatus] = useState(false);

  if (!user || user.token == null) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {/** <HeaderTabs
        links={links}
        toggleOpened={setFormStatus}
        toggleOpenedStatus={formStatus}
  /> **/}
      <SideBar
        data={links}
        toggleOpened={setFormStatus}
        toggleOpenedStatus={formStatus}
      />

      <ApplicationForm onClose={setFormStatus} opened={formStatus} />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
