import './sorting.css';
import React from 'react';
import { Link } from 'react-router-dom';
import 'reactjs-popup/dist/index.css';
export default function Sorting(props) {

	function selectSort(type){
		props.setSorting(type)
	}

  return (
	  <>
	  	<div className="headDiv">
		  <Link to="/"><i className="fa fa-caret-left fa-2x back" aria-hidden="true"></i></Link>
			<h1>Sorting By</h1>
		</div>
		<div className="sortingOptionDiv">
			<Link to="/"><p className="sortingLink" onClick={()=> selectSort("date")}>By Date</p></Link>
			<Link to="/"><p className="sortingLink" onClick={()=> selectSort("margin")}>By Margin</p></Link>
			<Link to="/"><p className="sortingLink" onClick={()=> selectSort("price")}>By Selling Price</p></Link>
		</div>
	  </>
  );
}