import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideNavBar from "components/Navbar/Index";
import StepOneForm from "components/form/StepOneForm";
import Panel from "./Chat/Panel";
import ResponsibleAIPanel from "components/ResponsibleAI/ResponsiblePanel"
import Result from "components/Results/Result"
import Downloader from "./downloader/Downloader";

const Layout = ({ children }) => (
  <div className="flex gap-4 w-full h-screen max-h-screen overflow-hidden px-2 pl-0 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-800 ">
    <SideNavBar />
    {children}
  </div>
);

const StepOne = () => (
  <Layout>
    <StepOneForm />
  </Layout>
);

const Chat = () => {
  const location = useLocation();
  const path = location.pathname.split('/').pop();

  let content;
  switch (path) {
    case 'linked-ai-value':
      content = <Panel id="linked-ai-value" />;
      break;
    case 'ai-responsible-use':
      content = <Result step={2} />;
      break;
    case 'ai-tech-enablement':
      content = <Panel id="ai-tech-enablement" />;
      break;
    default:
      content = <Panel id={null} />;
  }

  return (
    <Layout>
      {content}
    </Layout>
  );
};

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