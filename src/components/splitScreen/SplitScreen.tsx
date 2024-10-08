import "../../Css/SplitScreen.css";
import { Link } from "react-router-dom";
import ArrowIcon from "../../assets/arrowIcon.png";
import { ParticleSystem } from "../landPage/BackGroundAnimation";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

function SplitScreen() {
  return (
    <div className="WholePage">
      <div className="PlexusEffectSplitScreen">
        <ParticleSystem />
      </div>
      <div className="SplitScreenBackButton">
        <Link to="/">
          <button className="arrow">
            <img className="arrowPng" src={ArrowIcon} />
          </button>
        </Link>
      </div>
      <Link to="/SortingScreen">
        <button>
          <LeftSide></LeftSide>
        </button>
      </Link>
      <div className="MiddleBar"></div>
      <Link to="/GraphScreen">
        <button>
          <RightSide></RightSide>
        </button>
      </Link>
    </div>
  );
}

export { SplitScreen };
