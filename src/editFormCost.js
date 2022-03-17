import './addComponents.css';
import logo1 from './cost1.png';
import React from 'react';
import { Link } from 'react-router-dom';
export default function AddComponents(props) {

	function handleAddClick(id){
		props.seteditComponents(preData=>{
			return preData.map((c) => {
                return c.id === id ? {...c, quantity: c.quantity+1} : c
            })
		});

		props.setcostDetails(preData=>{
			return preData.map((c) => {
                return c.id === id ? {...c, quantity: c.quantity+1} : c
            })
		});
	}

	function handleSubtractClick(id){
		props.seteditComponents(preData=>{
			return preData.map((c) => {
                return c.id === id && c.quantity !== 0 ? {...c, quantity: c.quantity-1} : c
            })
		});

		props.setcostDetails(preData=>{
			return preData.map((c) => {
                return c.costID === id ? {...c, quantity: c.quantity-1} : c
            })
		});
	}

	const itemObj = props.editComponents.map(i => {
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
					<p className='noMargin'>{i.quantity}</p>
					<i className="fa fa-plus addQuantity" onClick={() => handleAddClick(i.id)} aria-hidden="true"></i>
				</div>
			</div>
        )
    });
	

	return (
		<div className="componentsForm">
			{itemObj}
			<Link to={{
				pathname: "/edit",
				state:{
					fromAddComponents: true
				}
			}} ><input className='submitBtn' type="button" value="CONFIRM"></input></Link>
		</div>
	);
}