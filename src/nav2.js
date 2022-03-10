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
		{props.url === "/addComponents" ? <p className='navLabel'>Add Cost</p>:
		<p className='navLabel'>Create New Operation</p>}
    </div>
  );
}