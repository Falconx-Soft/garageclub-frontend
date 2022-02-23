import './nav.css';
import React from 'react';
import { Link } from 'react-router-dom';
export default function Nav2(props) {
  return (
    <div className="nav-div">
		{props.url === "/addComponents" ? 
			<Link to={{
				pathname: "/add",
				state:{
					fromAddComponents: false
				}
			}}><i className="fa fa-caret-left fa-2x"></i></Link>:
			<Link to="/"><i className="fa fa-caret-left fa-2x"></i></Link>
		}

		{props.url === "/addComponents" ? 
			<div className="nav-div-right-btn">
				<Link to={{
					pathname: "/add",
					state:{
						fromAddComponents: true
					}
				}}><i className="fa fa-caret-right fa-2x" aria-hidden="true"></i></Link>
			</div>:
			<div className="nav-div-right-btn">
				<Link to="/result"><i className="fa fa-caret-right fa-2x" aria-hidden="true"></i></Link>
			</div>
		}
    </div>
  );
}