import React from 'react';
import { Link } from 'react-router-dom';
import logo1 from './cost1.png';
export default function CoastItems(props) {

	var totalAmount = 0;
	const itemObj = props.components.map(i => {
		if(i.quantity !== 0){
			totalAmount += (i.prince * i.quantity)
			props.setTotalAmount(totalAmount)
			return(
				<>
					<div className="cosatItem">
						<div className="cosatItemLeft">
							<img src={logo1} alt="Logo" />
							<p>{i.name}</p>
						</div>
						<div className="cosatItemRight">
							<p><b>€{i.prince * i.quantity}</b></p>
						</div>
					</div>
				</>
			)
		}
    });

  return (
	<>
		
		{itemObj}
		
	</>
  );
}