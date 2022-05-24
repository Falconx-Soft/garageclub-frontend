import './item.css';
import React from "react"
import 'reactjs-popup/dist/index.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { Link } from 'react-router-dom';
import logo1 from './cost1.png';
import useWindowDimensions from './itemsScreenWidth';

// import SwipeToDelete from 'react-swipe-to-delete-component';
import SwipeToDelete from 'react-swipe-to-delete-ios';
// Import styles of the react-swipe-to-delete-component
import 'react-swipe-to-delete-component/dist/swipe-to-delete.css';

export default function Item(props) {

	const { height, width } = useWindowDimensions();

	let colorOfBaner = "green"
	for(let i=0; i<props.marginTemp.temp.length; i++){
		if(props.amount_purchase > props.marginTemp.temp[i].min_purchase_range && props.amount_purchase < props.marginTemp.temp[i].max_purchase_range){
			if(props.type === 0){
			  if(props.margin < props.marginTemp.temp[i].typeA){
				colorOfBaner="red";
			  }else{
				colorOfBaner="green";
			  }
			} else if(props.type === 1){
			  if(props.margin < props.marginTemp.temp[i].typeB){
				colorOfBaner="red";
			  }else{
				colorOfBaner="green";
			  }
			}else{
			  if(props.margin < props.marginTemp.temp[i].typeC){
				colorOfBaner="red";
			  }else{
				colorOfBaner="green";
			  }
			}
		}
	}


function DeleteBtn(){
	fetch('http://35.180.210.115:8002/api/validations/'+props.id+'/', { 
	method: 'delete',
	headers: {
	  'Content-Type': 'application/json',
	  'Accept': 'application/json',
	}, })
	props.setvalidation(preData=>{
		console.log("delete")
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

let margin = 0; 
const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  
  const toggleDrawer = (anchor, open,
	risk,
	created_at,
	purchase,
	margin,
	type,
	calculation_type,
	coast,
	reference,
	makeNmade,
	id,
	amount_sale,
	) => (event) => {
		if(created_at != undefined){
			console.log(risk,created_at,purchase,margin,type,calculation_type,coast)
		
			props.settabData(preData =>{
				return{
					margin:margin,
					valoracion:calculation_type==0 ? "REBU":"IVA",
					purchase: purchase,
					selling: amount_sale,
					type:type ==0 ? "A": type == 1 ? "B":"C",
					risk:risk,
					reference:reference,
					makeNmade:makeNmade,
					id:id,
				}
			})
		}
	if(coast != null){
		let coastTemp = []
		coast.map(i => {
			coastTemp.push({"quantity":i.quantity,"costID":i.cost,"id":i.id})
		})
		props.setcostDetails(coastTemp);
		props.setCostList([])
		for(let i=0; i<coast.length;i++){
			fetch("http://35.180.210.115:8002/api/costs/"+coast[i].cost+"/", {
				headers : { 
				  'Content-Type': 'application/json',
				  'Accept': 'application/json'
				 }
				})
				.then(res => res.json())
				.then(data => props.setCostList(costList => [...costList, data]))
			}
	}
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  
  const getCostItemList=props.costList.map(i => {
	  let amount = 0.0;
	  for(let x=0; x<props.costDetails.length; x++){
		if(props.costDetails[x].costID == i.id){
			amount = i.amount * props.costDetails[x].quantity;
		}
	}
		return(
			<>
				<div className="cosatItem2">
					<div className="cosatItemLeft">
						<img src={i.icon} alt="Logo" />
						<p>{i.description}</p>
					</div>
					<div className="cosatItemRight">
						<p><b>{amount}€</b></p>
					</div>
				</div>
			</>
		)
	});


  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
    <List>
	<>
	<div className="resultHeader-div div-radius">
      <div className="resultHead">
        <p className="resultHeadLabel">Valoraciones Details</p>
        <Link className="resultHeadLink" to={{
				pathname: "/edit",
				state:{
					fromAddComponents: true
				}
			  }}><p className="resultHeadLink">Edit</p></Link>
      </div>

      <p className="resultTitel">{props.detail} {props.keyNumber}</p>

      	<div className="resultForm">
			<div className="resultFormItem">
				<p className="resultFormItemLeft">Margin</p>
				{props.tabData.margin < 0 ? 
				<p className="resultHeaderIner-div-black">€{props.tabData.margin} ({parseFloat(props.tabData.margin/props.tabData.purchase).toFixed(2)}%)</p>
				:
				colorOfBaner === "red"?
				<p className="resultHeaderIner-div-pink">€{props.tabData.margin} (+{parseFloat(props.tabData.margin/props.tabData.purchase).toFixed(2)}%)</p>
				:
				<p className="resultHeaderIner-div">€{props.tabData.margin} (+{parseFloat(props.tabData.margin/props.tabData.purchase).toFixed(2)}%)</p>
				}
			</div>

			<div className="resultFormItem">
				<p className="resultFormItemLeft">Valoracion</p>
				<p className="resultFormItemRight">{props.tabData.valoracion}</p>
			</div>

			<div className="resultFormItem">
				<p className="resultFormItemLeft">Purchase Amount</p>
				<p className="resultFormItemRight">{props.tabData.purchase}€</p>
			</div>

			<div className="resultFormItem">
				<p className="resultFormItemLeft">Selling Amount</p>
				<p className="resultFormItemRight">{props.tabData.selling}€</p>
			</div>

			<div className="resultFormItem">
				<p className="resultFormItemLeft">Type</p>
				<p className="resultFormItemRight">{props.tabData.type}</p>
			</div>

			<div className="resultFormItem">
				<p className="resultFormItemLeft">Risk</p>
				<p className="resultFormItemRight">{props.tabData.risk}</p>
			</div>
    	</div>
		{getCostItemList.length != 0 ?
		<>
		<div className="coastDivHead">
			<h1>Cost Details</h1>
		</div>
		{getCostItemList}
		</>: null
		}
		
    </div>
	</>
      </List>
    </Box>
  );

  return (
	<>
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
				
				{
					width < 671 ?
						<div className="item-detail-div" onClick={toggleDrawer("bottom", true,
						props.risk,
						props.created_at,
						props.amount_purchase,
						props.margin,
						props.type,
						props.calculation_type,
						props.cost,
						props.keyNumber,
						props.detail,
						props.id,
						props.amount_sale
						)}>
							<p className="item-detail-keyNumber">{props.keyNumber}</p>
							<p className="item-detail-detail">{props.detail}</p>
							<div className="item-detail-list">
								<p className="item-detail-list-data">TIPO {props.type === 0 ? "A":props.type === 1 ? "B":"C"}
								</p>
								<i className="fa fa-circle icon"></i>
								<p className="item-detail-list-data">{props.created_at.split("T")[0]}</p>
								<i className="fa fa-circle icon"></i>
								<p className="item-detail-list-data">{props.amount_purchase} €</p>
							</div>
						</div>
					:
						<div className="item-detail-div" onClick={toggleDrawer("right", true,
						props.risk,
						props.created_at,
						props.amount_purchase,
						props.margin,
						props.type,
						props.calculation_type,
						props.cost,
						props.keyNumber,
						props.detail,
						props.id,
						props.amount_sale
						)}>
							<p className="item-detail-keyNumber">{props.keyNumber}</p>
							<p className="item-detail-detail">{props.detail}</p>
							<div className="item-detail-list">
								<p className="item-detail-list-data">TIPO {props.type === 0 ? "A":props.type === 1 ? "B":"C"}
								</p>
								<i className="fa fa-circle icon"></i>
								<p className="item-detail-list-data">{props.created_at.split("T")[0]}</p>
								<i className="fa fa-circle icon"></i>
								<p className="item-detail-list-data">{props.amount_purchase} €</p>
							</div>
						</div>

				}
				{props.margin < 0 ?
					<div className="item-tag item-tag-black">
						<p>€{props.margin} ({parseFloat(props.margin/props.amount_purchase).toFixed(2)}%)</p>
					</div>:
					colorOfBaner === "red" ?
					<div className="item-tag item-tag-red">
						<p>€{props.margin} (+{parseFloat(props.margin/props.amount_purchase).toFixed(2)}%)</p>
					</div>:
					<div className="item-tag item-tag-green">
						<p>€{props.margin} (+{parseFloat(props.margin/props.amount_purchase).toFixed(2)}%)</p>
					</div>
				}
				
			</div>
			<button className="deleteBtn hide">Delete</button>
		</div>
	</SwipeToDelete>

	<div>
	{['left', 'right', 'top', 'bottom'].map((anchor) => (
	<React.Fragment key={anchor}>
		{/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
		<Drawer
		anchor={anchor}
		open={state[anchor]}
		onClose={toggleDrawer(anchor, false)}
		>
		{list(anchor)}
		</Drawer>
	</React.Fragment>
	))}
	</div>
	</>
  );
}