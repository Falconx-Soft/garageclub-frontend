import './item.css';
import React from "react"
import 'reactjs-popup/dist/index.css';

// import SwipeToDelete from 'react-swipe-to-delete-component';
import SwipeToDelete from 'react-swipe-to-delete-ios';
// Import styles of the react-swipe-to-delete-component
import 'react-swipe-to-delete-component/dist/swipe-to-delete.css';

export default function Item(props) {

	let colorOfBaner = "green";
	if(props.margin > 0){
	if(props.amount_purchase < 1000){
	  if(props.type === 0){
		if(props.margin< 100){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  } else if(props.type === 1){
		if(props.margin< 170){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  }else{
		if(props.margin< 250){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  }
	}else if(props.amount_purchase > 1000 && props.amount_purchase < 2000){
	  if(props.type === 0){
		if(props.margin< 43){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  } else if(props.type === 1){
		if(props.margin< 74){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  }else{
		if(props.margin< 108){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  }
	}else if(props.amount_purchase > 2000 && props.amount_purchase < 4000){
	  if(props.type === 0){
		if(props.margin< 28){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  } else if(props.type === 1){
		if(props.margin< 48){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  }else{
		if(props.margin< 71){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  }
	}else if(props.amount_purchase > 4000 && props.amount_purchase < 6000){
	  if(props.type === 0){
		if(props.margin< 24){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  } else if(props.type === 1){
		if(props.margin< 41){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  }else{
		if(props.margin< 60){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  }
	}else if(props.amount_purchase > 6000 && props.amount_purchase < 8000){
	  if(props.type === 0){
		if(props.margin< 21){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  } else if(props.type === 1){
		if(props.margin< 36){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  }else{
		if(props.margin< 54){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  }
	}else if(props.amount_purchase > 8000 && props.amount_purchase < 10000){
	  if(props.type === 0){
		if(props.margin< 19){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  } else if(props.type === 1){
		if(props.margin< 33){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  }else{
		if(props.margin< 49){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  }
	}else if(props.amount_purchase > 10000 && props.amount_purchase < 12500){
	  if(props.type === 0){
		if(props.margin< 18){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  } else if(props.type === 1){
		if(props.margin< 30){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  }else{
		if(props.margin< 44){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  }
	}else if(props.amount_purchase > 12500 && props.amount_purchase < 15000){
	  if(props.type === 0){
		if(props.margin< 17){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  } else if(props.type === 1){
		if(props.margin< 28){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  }else{
		if(props.margin< 42){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  }
	}else if(props.amount_purchase > 15000 && props.amount_purchase < 20000){
	  if(props.type === 0){
		if(props.margin< 15){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  } else if(props.type === 1){
		if(props.margin< 25){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  }else{
		if(props.margin< 37){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  }
	}else if(props.amount_purchase > 20000 && props.amount_purchase < 25000){
	  if(props.type === 0){
		if(props.margin< 16){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  } else if(props.type === 1){
		if(props.margin< 26){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  }else{
		if(props.margin< 39){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  }
	}else if(props.amount_purchase > 25000 && props.amount_purchase < 30000){
	  if(props.type === 0){
		if(props.margin< 15){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  } else if(props.type === 1){
		if(props.margin< 25){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  }else{
		if(props.margin< 36){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  }
	}else{
	  if(props.type === 0){
		if(props.margin< 14){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  } else if(props.type === 1){
		if(props.margin< 24){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  }else{
		if(props.margin< 35){
		  colorOfBaner = "red";
		}else{
		  colorOfBaner = "green";
		}
	  }
	}
	}else{
		colorOfBaner = "black";
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
						<p>{parseFloat(props.margin).toFixed(2)}</p>
					</div>:
					colorOfBaner === "red" ?
					<div className="item-tag item-tag-red">
						<p>{parseFloat(props.margin).toFixed(2)}</p>
					</div>:
					<div className="item-tag item-tag-green">
						<p>{parseFloat(props.margin).toFixed(2)}</p>
					</div>
				}
				
			</div>
			<button className="deleteBtn hide">Delete</button>
		</div>
	</SwipeToDelete>
  );
}