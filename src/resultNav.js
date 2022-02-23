import './nav.css';
import React from 'react';
import { Link } from 'react-router-dom';
export default function ResultNav() {
  return (
    <div className="nav-div">
	  <Link to={{
				pathname: "/add",
				state:{
					fromAddComponents: true
				}
			}}><i className="fa fa-caret-left fa-2x"></i></Link>
    </div>
  );
}