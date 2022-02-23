import React from 'react';
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
						<p>{i.name}</p>
					</div>
					<div className="cosatItemRight">
						<p><b>${i.prince * i.quantity}</b></p>
					</div>
					</div>
				</>
			)
		}
        
    });

  return (
	<>
		<div className="coastDiv">
			<h1>COSTES</h1>
			{itemObj}
		</div>

		<div className="cosatItemTotal">
			<div className="cosatItemTotalLeft">
			<p>TOTAL COASTES</p>
			</div>
			<div className="cosatItemTotalRight">
			<p><b>${totalAmount}</b></p>
			</div>
		</div>
	</>
  );
}