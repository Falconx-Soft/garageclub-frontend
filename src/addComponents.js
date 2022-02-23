import './addComponents.css';
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

	const itemObj = props.components.map(i => {
        return (
			<div className="componentItem" key={i.id}>
				<div className="componentLeftItem">
					<i className="fa fa-minus subtractQuantity" onClick={() => handleSubtractClick(i.id)} aria-hidden="true"></i>
					<p className='noMargin'>{i.quantity}</p>
					<i className="fa fa-plus addQuantity" onClick={() => handleAddClick(i.id)} aria-hidden="true"></i>
				</div>
				<div className="componentCenerItem">
					<p>{i.name}</p>
				</div>
				<div className="componentRightItem">
					<p>${i.prince}</p>
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
			}} ><input className='submitBtn' type="button" value="Add"></input></Link>
		</div>
	);
}