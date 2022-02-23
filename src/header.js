import './header.css';
import React from 'react';

export default function Header(props) {
  return (
    <div className="header-div">
		<h1 className="header-heading">{props.title}</h1>
		{/* { props.title == "GET YOUR CAR" && <input className="header-input" type="text" placeholder="Search by car"/>} */}
    </div>
  );
}