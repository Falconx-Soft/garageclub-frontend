import './item.css';
import React from "react"
import 'reactjs-popup/dist/index.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { Link } from 'react-router-dom';
import logo1 from './cost1.png';

// import SwipeToDelete from 'react-swipe-to-delete-component';
import SwipeToDelete from 'react-swipe-to-delete-ios';
// Import styles of the react-swipe-to-delete-component
import 'react-swipe-to-delete-component/dist/swipe-to-delete.css';

export default function Item(props) {

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
	) => (event) => {
		if(created_at != undefined){
			console.log(risk,created_at,purchase,margin,type,calculation_type,coast)
		
			props.settabData(preData =>{
				return{
					margin:margin,
					valoracion:calculation_type==0 ? "REBU":"IVA",
					purchase: purchase,
					selling: 2,
					type:type ==0 ? "A": type == 1 ? "B":"C",
					risk:risk,
					reference:reference,
					makeNmade:makeNmade,
					id:id
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
			fetch("api/costs/"+coast[i].cost+"/")
				.then(res => res.json())
				.then(data => props.setCostList(costList => [...costList, data]))
			}
	}
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  let count = 0;
  const getCostItemList=props.costList.map(i => {
	  count += 1;
		return(
			<>
				<div className="cosatItem2">
					<div className="cosatItemLeft">
						<img src={logo1} alt="Logo" />
						<p>{i.description}</p>
					</div>
					<div className="cosatItemRight">
						<p><b>{i.amount * props.costDetails[count-1].quantity}€</b></p>
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

      <p className="resultTitel">porsche keynne Referencia</p>

      	<div className="resultForm">
			<div className="resultFormItem">
				<p className="resultFormItemLeft">Margin</p>
				{props.tabData.margin < 0 ? 
				<p className="resultHeaderIner-div-black">{parseFloat(props.tabData.margin/props.tabData.purchase).toFixed(2)}%</p>
				:
				colorOfBaner === "red"?
				<p className="resultHeaderIner-div-pink">+{parseFloat(props.tabData.margin/props.tabData.purchase).toFixed(2)}%</p>
				:
				<p className="resultHeaderIner-div">+{parseFloat(props.tabData.margin/props.tabData.purchase).toFixed(2)}%</p>
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
		<div className="coastDivHead">
			<h1>Cost Details</h1>
		</div>
		
		{getCostItemList}
		
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
				props.id
				)}>
					<p className="item-detail-keyNumber">{props.keyNumber}</p>
					<p className="item-detail-detail">{props.detail}</p>
					<div className="item-detail-list">
						<p className="item-detail-list-data">TIPO {props.risk === 1 ? "A":"B"}
						</p>
						<i className="fa fa-circle icon"></i>
						<p className="item-detail-list-data">{props.created_at.split("T")[0]}</p>
						<i className="fa fa-circle icon"></i>
						<p className="item-detail-list-data">{props.amount_purchase} €</p>
					</div>
				</div>
				{props.margin < 0 ?
					<div className="item-tag item-tag-black">
						<p>{parseFloat(props.margin/props.amount_purchase).toFixed(2)}%</p>
					</div>:
					colorOfBaner === "red" ?
					<div className="item-tag item-tag-red">
						<p>+{parseFloat(props.margin/props.amount_purchase).toFixed(2)}%</p>
					</div>:
					<div className="item-tag item-tag-green">
						<p>+{parseFloat(props.margin/props.amount_purchase).toFixed(2)}%</p>
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