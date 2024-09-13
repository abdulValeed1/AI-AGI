import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Page from "./components/Page";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Page />,
      children: [
        { index: true, element: <Page.StepOne /> },
        { 
          path: "chat",
          element: <Page.Chat />,
          children: [
            { index: true, element: <Page.Chat /> },
            { path: "growth-plan", element: <Page.Chat /> },
            { path: "linked-ai-value", element: <Page.Chat /> },
            { path: "ai-responsible-use", element: <Page.Chat /> },
            { path: "ai-tech-enablement", element: <Page.Chat /> },
          ]
        },
        { path: "finish", element: <Page.Finisher /> },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;