import React, { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"
import { ChevronDown, ChevronUp } from "lucide-react";

function Index() {
    const location = useLocation();

    const navItems = [
      { path: "/", label: "Fill Details" },
      {
        path: "/chat",
        label: "Chat",
        subItems: [
          { path: "/chat/growth-plan", label: "Growth Plan" },
          { path: "/chat/linked-ai-value", label: "Linked AI Value" },
          { path: "/chat/ai-responsible-use", label: "AI Responsible Use" },
          { path: "/chat/ai-tech-enablement", label: "AI Tech Enablement" }
        ]
      },
      { path: "/finish", label: "Finish" }
    ];
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const toggleSubMenu = () => setIsSubMenuOpen(!isSubMenuOpen);
  
    const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

    useEffect(() => {
      const isChatPath = location.pathname.startsWith('/chat');
      setIsSubMenuOpen(isChatPath);
    }, [location.pathname]);
  
    return (
      <div className="h-screen max-h-screen overflow-hidden flex flex-col gap-4 justify-between px-2 py-2 pb-4 bg-slate-50 w-[200px]">
        <div className="flex flex-col gap-6">
          <Link to="/" className="text-lg font-semibold text-center">
            AGI
          </Link>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <div key={item.path}>
                <Link
                  to={item.path}
                  className={`text-base font-medium text-center py-2 px-4 rounded transition-colors flex items-center justify-between
                    ${isActive(item.path) 
                      ? "bg-blue-500 text-white" 
                      : "hover:bg-slate-200"}`}
                  onClick={item.subItems ? toggleSubMenu : undefined}
                >
                  {item.label}
                  {item.subItems && (
                    isSubMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                  )}
                </Link>
                {item.subItems && isSubMenuOpen && (
                  <div className="ml-4 mt-1 flex flex-col gap-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={`text-sm py-1 px-3 rounded transition-colors
                          ${isActive(subItem.path)
                            ? "bg-blue-400 text-white" 
                            : "hover:bg-slate-200"}`}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    );  
}

export default Index

