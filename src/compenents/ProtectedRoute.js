import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import HeaderTabs from "./Header";
import SideBar from "./SideBar";

import ApplicationForm from "./ApplicationForm";

import {
  IconUser,
  IconCash,
  IconLayoutDashboard,
  IconRefresh,
} from "@tabler/icons";

const links = [
  {
    link: "/",
    label: "Dashboard",
    icon: IconLayoutDashboard,
  },
  {
    link: "/contacts",
    label: "Employees",
    icon: IconUser,
  },
  {
    link: "/payrolls",
    label: "Payrolls",
    icon: IconCash,
  },
  {
    link: "/payrolls/run",
    label: "Run payrolls",
    icon: IconRefresh,
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
      <Outlet context={{ formStatus, setFormStatus }} />
    </>
  );
};

export default ProtectedRoute;
