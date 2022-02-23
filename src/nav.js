import './nav.css';
import React from 'react';
import { Link } from 'react-router-dom';
import 'reactjs-popup/dist/index.css';
export default function Nav() {
  return (
    <div className="nav-div">
	  <i className="fas fa-bars"></i>
		<div className="nav-div-right-btn">
			<Link to="/sorting"><i className="fas fa-compress-alt"></i></Link>
			<Link to={{
				pathname: "/add",
				state:{
					fromAddComponents: false
				}
			}}><i className="fas fa-plus"></i></Link>
		</div>

    </div>
  );
}