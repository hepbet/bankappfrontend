import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../bank.png";

function Navbar() {
  const location = useLocation();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const pageLinks = useMemo(
    () => [
      {
        name: "Home",
        url: "/",
        description: "Home page",
        tooltip: "description"
      },
      {
        name: "Create Account",
        url: "/CreateAccount",
        description: "Create a new account",
        tooltip: "description"
      },
      {
        name: "Login",
        url: "/Login",
        description: "Login account",
        tooltip: "description"
      },
      {
        name: "Deposit",
        url: "/Deposit",
        description: "Deposit money into your account",
        tooltip: "description"
      },
      {
        name: "Withdraw",
        url: "/Withdraw",
        description: "Withdraw money from your account",
        tooltip: "description"
      },
      {
        name: "All Data",
        url: "/AllData",
        description: "View all data",
        tooltip: "description"
      }
    ],
    []
  );
  

  useEffect(() => {
    pageLinks.forEach((page) => {
      if (page.url === location.pathname) {
        document.title = page.name;
      }
    });
  }, [location.pathname, pageLinks]);

  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  }; 

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          <img className="logo" src={logo} alt="Logo" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleNavCollapse} 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${
            isNavCollapsed ? "" : "show"
          }`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto">
            {pageLinks.map((page, key) => {
              return (
                <li
                  key={key}
                  className={`nav-item ${
                    location.pathname === page.url ? "active" : ""
                  }`}
                >
                  <NavLink to={page.url} className="nav-link" data-description={page[page.tooltip]}>
                  {page.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;