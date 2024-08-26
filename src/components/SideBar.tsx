import React, { useState } from "react";
import arrow from "/assets/side_arrow.png";
import complexitybutton from "/assets/Complexity_logo.png";
import backbutton from "/assets/back_button.png";
import "/src/css/SideBar.css";
import { Link } from "react-router-dom";

const UpperSidebar: React.FC = () => (
  <div className="sidebar__upper">
    <h4 className="sidebar__array-text">Array Data:</h4>
    <input
      className="sidebar__array-input"
      type="text"
      placeholder="Enter Your Array"
    />
  </div>
);

const MiddleSidebar: React.FC<{
  isCollapsed: boolean;
  toggleSidebar: () => void;
}> = ({ isCollapsed, toggleSidebar }) => (
  <div className="sidebar__middle">
    <button className="sidebar__toggle-button" onClick={toggleSidebar}>
      <img
        className={`sidebar__arrow ${
          isCollapsed ? "sidebar__arrow--rotated" : ""
        }`}
        src={arrow}
        alt="Toggle Sidebar"
      />
    </button>
  </div>
);

const LowerSidebar: React.FC<{
  ArrayGenerator: React.FC;
}> = ({ ArrayGenerator }) => (
  <div className="sidebar__lower">
    <ArrayGenerator />
    <div className="sidebar__complexity">
      <h4 className="sidebar__complexity-text">Complexity:</h4>
      <div className="sidebar__complexity-field"></div>
    </div>
    <div className="sidebar__buttons">
    <Link to = "/SplitScreen">
      <button className="sidebar__back-button">
        <img className="sidebar__back-icon" src={backbutton} alt="Back" />
      </button>
    </Link>
      <button className="sidebar__complexity-button">
        <img
          className="sidebar__complexity-icon"
          src={complexitybutton}
          alt="Complexity"
        />
      </button>
    </div>
  </div>
);

const SideBar: React.FC<{
  ArrayGenerator: React.FC;
}> = ({ ArrayGenerator }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div className={`sidebar ${isCollapsed ? "sidebar--collapsed" : ""}`}>
      {!isCollapsed && <UpperSidebar />}
      <MiddleSidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      {!isCollapsed && <LowerSidebar ArrayGenerator={ArrayGenerator} />}
    </div>
  );
};
export { SideBar };
