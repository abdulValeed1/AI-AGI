import React from "react";
import { Outlet } from "react-router-dom";
import SideNavBar from "components/Navbar/Index";
import StepOneForm from "components/form/StepOneForm";
import Panel from "./Chat/Panel";
import Downloader from "./downloader/Downloader";

const Layout = ({ children }) => (
  <div className="flex gap-4 w-full h-screen max-h-screen overflow-hidden px-2 pl-0">
    <SideNavBar />
    {children}
  </div>
);

const StepOne = () => (
  <Layout>
    <StepOneForm />
  </Layout>
);

const Chat = () => (
  <Layout>
    <Panel id={null} />
  </Layout>
);

const Finisher = () => (
  <Layout>
    <Downloader/>
  </Layout>
);

const Page = () => {
  return <Outlet />;
};

// Attach components to Page
Page.StepOne = StepOne;
Page.Chat = Chat;
Page.Finisher = Finisher;

export default Page;