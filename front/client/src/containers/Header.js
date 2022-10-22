import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="ui fixed menu">
      <div className="ui container center">
        <Link to={`/`}>
          <h2>Shila</h2>
        </Link>
        <p className="game-button"><Link to={`/game`}>Play to Earn</Link></p>
      </div>
    </div>
  );
};

export default Header;
