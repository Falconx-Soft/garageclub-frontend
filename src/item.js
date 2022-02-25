import './item.css';
import React from "react"
import 'reactjs-popup/dist/index.css';

// import SwipeToDelete from 'react-swipe-to-delete-component';
import SwipeToDelete from 'react-swipe-to-delete-ios';
// Import styles of the react-swipe-to-delete-component
import 'react-swipe-to-delete-component/dist/swipe-to-delete.css';

export default function Item(props) {

	let colorOfBaner = "green"
	for(let i=0; i<props.marginTemp.temp.length; i++){
		console.log(props.amount_purchase,props.marginTemp.temp[i].min_purchase_range,)
		if(props.amount_purchase > props.marginTemp.temp[i].min_purchase_range && props.amount_purchase < props.marginTemp.temp[i].max_purchase_range){
			if(props.type === 0){
			  if(props.amount_purchase< props.marginTemp.temp[i].typeA){
				colorOfBaner="red";
			  }else{
				colorOfBaner="green";
			  }
			} else if(props.type === 1){
			  if(props.amount_purchase< props.marginTemp.temp[i].typeB){
				colorOfBaner="red";
			  }else{
				colorOfBaner="green";
			  }
			}else{
			  if(props.amount_purchase< props.marginTemp.temp[i].typeC){
				colorOfBaner="red";
			  }else{
				colorOfBaner="green";
			  }
			}
		}
	}

function DeleteBtn(){
	console.log("Swiped",props.id)
	fetch('api/validations/'+props.id, { method: 'DELETE' })
	props.setvalidation(preData=>{
		return preData.map((c) => {
			if(c && c.id !== props.id){
				return c
			}
		})
	})

	props.setTemp(preData=>{
		return preData.map((c) => {
			if(c && c.id !== props.id){
				return c
			}
		})
	})
}

  return (
	<SwipeToDelete 
	key={props.id} 
	onDelete={DeleteBtn}
	
	height={100} // required
	// optional
	transitionDuration={250} // default
	deleteWidth={75} // default
	deleteColor="rgba(252, 58, 48, 1.00)" // default
	deleteText="Delete" // default
	// deleteComponent={<DeleteComponent/>} // not default
	disabled={false} // default
	rtl={false} // default
	
	>
		<div className="outer-div">
			<div className="item-div">
				{props.risk === 1 ?
					<h1 className="item-image">A</h1>:
					<h1 className="item-image">B</h1>
				}
				
				<div className="item-detail-div">
					<p>{props.keyNumber}</p>
					<p>{props.detail}</p>
				</div>
				{props.margin < 0 ?
					<div className="item-tag item-tag-black">
						<p>{parseFloat(props.margin/props.amount_purchase).toFixed(2)}%</p>
					</div>:
					colorOfBaner === "red" ?
					<div className="item-tag item-tag-red">
						<p>{parseFloat(props.margin/props.amount_purchase).toFixed(2)}%</p>
					</div>:
					<div className="item-tag item-tag-green">
						<p>{parseFloat(props.margin/props.amount_purchase).toFixed(2)}%</p>
					</div>
				}
				
			</div>
			<button className="deleteBtn hide">Delete</button>
		</div>
	</SwipeToDelete>
  );
}