import './nav.css';
import React from 'react';
import { Link } from 'react-router-dom';
export default function Nav2(props) {

	function clickSaveData(){
		document.getElementById("saveBtn").click();
	}

  return (
    <div className="nav-div">
		{props.url === "/addComponents" ? 
			<Link to={{
				pathname: "/add",
				state:{
					fromAddComponents: false
				}
			}}><i className="fa fa-arrow-left"></i></Link>:

			props.url === "/result" ? 
			<Link to={{
				pathname: "/add",
				state:{
					fromAddComponents: true
				}
			}}><i className="fa fa-arrow-left"></i></Link>:
			
			<Link to="/"><i className="fa fa-arrow-left"></i></Link>
		}
		{
			props.url === "/addComponents" ? 

			<p className='navLabel'>Add Cost</p>:

			props.url === "/add" ? 

			<p className='navLabel'>Create New Operation</p>:

			<p className='navLabel'>View Result</p>
		}

		{
			props.url === "/add" ?

			<>
				<a href="/"><input className="nav-cancel-btn" type="button" value="CANCEL"></input></a>
				<Link to="/result"><input className="nav-confirm-btn" type="button" value="CONFIRM"></input></Link>
			</>
			:
			props.url === "/addComponents" ?
			<>
				<a href="/"><input className="nav-cancel-btn" type="button" value="CANCEL"></input></a>
				<Link to="/result"><input className="nav-confirm-btn" type="button" value="Add"></input></Link>
			</>
			:
			<>
				<a href="/"><input className="nav-cancel-btn" type="button" value="CANCEL"></input></a>
				<Link to="/result"><input className="nav-confirm-btn" type="button" value="Save" onClick={clickSaveData}></input></Link>
			</>


		}
    </div>
  );
}