import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import Nav from './nav';
import Nav2 from './nav2';
import GetItems from './getItems';
import AddForm from './addForm';
import EditForm from './editForm';
// import Data from './componentsData';
import ResultsContent from './resultsContent';
import Sorting from './sorting';
import React from "react"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin } from  'react-loader-spinner'
import './spinner.css';
export default function Setup() {

	const [inputIcion, setinputIcion] = React.useState({"purchase":false,"sell":false});

	const [sorting, setSorting] = React.useState("date");

	const [marginTemp, setMarginTemp] = React.useState([]);

	React.useEffect(function() {
        fetch("http://35.180.210.115:8002/api/profitability/", {
			headers : { 
			  'Content-Type': 'application/json',
			  'Accept': 'application/json'
			 }
	  
		  })
            .then(res => res.json())
            .then(data =>{
				let temp = [];
				data.map(i => {
					let temp2 = {"id":i.id, "min_purchase_range":i.min_purchase_range, "max_purchase_range":i.max_purchase_range, "typeA":i.typeA, "typeB":i.typeB, "typeC":i.typeC};
					temp.push(temp2);
				})
				setMarginTemp(preValues => {
                    return{
                        ...preValues,
                        temp
                    }
                } 
            );
				
			})
    }, [])
	const [components, setComponents] = React.useState([]);
	
	const [editComponents, seteditComponents] = React.useState([]);
	React.useEffect(function() {
        fetch("http://35.180.210.115:8002/api/costs/", {
			headers : { 
			  'Content-Type': 'application/json',
			  'Accept': 'application/json'
			 }
	  
		  })
            .then(res => res.json())
            .then(data =>{
				let temp = [];
				data.map(i => {
					let temp2 = {"id":i.id, "quantity":0, "name":i.description, "prince":i.amount,"priority":i.priority,"icon":i.icon};
					temp.push(temp2);
				})
				setComponents(temp);
				seteditComponents(temp);
			})
    }, [])
	const [formData, setFormData] = React.useState({reference:"", makeNmade: "", purchase: "", selling: "", type:0, risk:""});
	const [valoracion, setValoracion] = React.useState("REBU");
	const [totalAmount, setTotalAmount] = React.useState(0);

	const [tabData, settabData] = React.useState({
		margin: 0,
		valoracion: "none",
		purchase: 0,
		selling: 0,
		type: "none",
		risk: "none",
		reference: "none",
		makeNmade: "none",
	  });
	
	const [costList, setCostList] = React.useState([]);
	const [costDetails, setcostDetails] = React.useState([]);
	const [validation, setvalidation] = React.useState([]);
    const [temp, setTemp] = React.useState(validation);

	return (
		<Router>
			<Switch>
				{Object.keys(marginTemp).length>0?
					<>
					<Route exact path="/" >
						<Nav url="/" validation={validation} setvalidation={setvalidation} temp={temp} setTemp={setTemp}/>
						<GetItems sorting={sorting} marginTemp={marginTemp}  setSorting={setSorting} tabData={tabData} settabData={settabData} costList={costList} setCostList={setCostList} validation={validation} setvalidation={setvalidation} temp={temp} setTemp={setTemp} costDetails={costDetails} setcostDetails={setcostDetails} />
					</Route>

					<Route exact path="/edit" >
						<EditForm tabData={tabData} settabData={settabData} costList={costList} setCostList={setCostList} costDetails={costDetails} setcostDetails={setcostDetails} editComponents={editComponents} seteditComponents={seteditComponents} />
					</Route>

					<Route exact path="/result" >
						<Nav2 url="/result" />
						<ResultsContent components={components} setComponents={setComponents} formData={formData} setFormData={setFormData} setTotalAmount={setTotalAmount} totalAmount={totalAmount} inputIcion={inputIcion} setinputIcion={setinputIcion} valoracion={valoracion} marginTemp={marginTemp}/>
					</Route>

					<Route exact path="/sorting" >
					<Sorting url="/sorting" sorting={sorting} setSorting={setSorting}/>
					</Route>

					<Route exact path="/add" >
						<Nav2 url="/add" />
						<AddForm components={components} setComponents={setComponents} formData={formData} setFormData={setFormData} setTotalAmount={setTotalAmount} inputIcion={inputIcion} setinputIcion={setinputIcion} valoracion={valoracion} setValoracion={setValoracion}/>
					</Route>
					</>
				:
			
					<div className="spinner">
						<TailSpin
							height="100"
							width="100"
							color='orange'
							ariaLabel='loading'
						/>
					</div>
				}

			</Switch>
		</Router>
	);
}