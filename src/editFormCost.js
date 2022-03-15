import './addComponents.css';
import logo1 from './cost1.png';
import React from 'react';
import { Link } from 'react-router-dom';
export default function AddComponents(props) {

	function handleAddClick(id){
		props.setComponents(preData=>{
			return preData.map((c) => {
                return c.id === id ? {...c, quantity: c.quantity+1} : c
            })
		})
	}

	function handleSubtractClick(id){
		props.setComponents(preData=>{
			return preData.map((c) => {
                return c.id === id && c.quantity !== 0 ? {...c, quantity: c.quantity-1} : c
            })
		})
	}

	props.components.sort(function(a, b) {
		return  a.priority - b.priority;
	  });

	const itemObj = props.components.map(i => {
		let p = 0;
		console.log(i.id,"out loop")
		for(let i=0; i<props.costDetails.length; i++){
			console.log(props.costDetails[i].costID,"in loop")
			console.log(typeof(props.costDetails[i].costID))
			console.log(typeof(Number(i.id)))
			let num1 = 0;
			let num2 = 0;
			num1 = props.costDetails[i].costID;
			num2 = i.id
			if(num1 === num2){
				p = props.costDetails[i].quantity;
				console.log(p,"its p")
			}
		}
        return (
			<div className="componentItem" key={i.id}>
				<div className="componentLeftItem">
					<img src={logo1} alt="Logo" />
				</div>
				<div className="componentCenerItem">
					<p>{i.name}</p>
					<p>{i.prince}€</p>
				</div>
				<div className="componentRightItem">
					<i className="fa fa-minus subtractQuantity" onClick={() => handleSubtractClick(i.id)} aria-hidden="true"></i>
					<p className='noMargin'>{p}</p>
					<i className="fa fa-plus addQuantity" onClick={() => handleAddClick(i.id)} aria-hidden="true"></i>
				</div>
			</div>
        )
    });
	

	return (
		<div className="componentsForm">
			{itemObj}
			<Link to={{
				pathname: "/add",
				state:{
					fromAddComponents: true
				}
			}} ><input className='submitBtn' type="button" value="CONFIRM"></input></Link>
		</div>
	);
}