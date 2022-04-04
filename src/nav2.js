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
			}}><i className="fa fa-arrow-left"></i></Link>:
			<Link to="/"><i className="fa fa-arrow-left"></i></Link>
		}
		{props.url === "/addComponents" ? <p className='navLabel'>Add Cost</p>:
		<p className='navLabel'>Create New Operation</p>}

		<a href="/"><input className="nav-cancel-btn" type="button" value="CANCEL"></input></a>
		<Link to="/result"><input className="nav-confirm-btn" type="button" value="CONFIRM"></input></Link>
    </div>
  );
}