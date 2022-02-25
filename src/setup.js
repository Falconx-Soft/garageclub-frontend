import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import Nav from './nav';
import Nav2 from './nav2';
import Header from './header';
import GetItems from './getItems';
import AddForm from './addForm';
import AddComponents from './addComponents';
// import Data from './componentsData';
import ResultNav from './resultNav';
import ResultsContent from './resultsContent';
import Sorting from './sorting';
import React from "react"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin } from  'react-loader-spinner'
import './spinner.css';
export default function Setup() {

	const [inputIcion, setinputIcion] = React.useState({"purchase":false,"sell":false});

	const [sorting, setSorting] = React.useState("price");

	const [marginTemp, setMarginTemp] = React.useState([]);
	React.useEffect(function() {
        fetch("api/profitability/")
            .then(res => res.json())
            .then(data =>{
				let temp = [];
				data.map(i => {
					let temp2 = {"id":i.id, "min_purchase_range":i.min_purchase_range, "max_purchase_range":i.max_purchase_range, "typeA":i.typeA, "typeB":i.typeB, "typeC":i.typeC};
					temp.push(temp2);
				})
				// console.log(temp);
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
	React.useEffect(function() {
		console.log("Featch components");
        fetch("api/costs/")
            .then(res => res.json())
            .then(data =>{
				let temp = [];
				console.log("data",data);
				data.map(i => {
					let temp2 = {"id":i.id, "quantity":0, "name":i.description, "prince":i.amount,"priority":i.priority};
					temp.push(temp2);
				})
				console.log(temp);
				setComponents(temp);
			})
    }, [])
	const [formData, setFormData] = React.useState({reference:"", makeNmade: "", purchase: "", selling: "", type:0, risk:""});
	const [valoracion, setValoracion] = React.useState("REBU");
	const [totalAmount, setTotalAmount] = React.useState(0);
	console.log( typeof marginTemp,marginTemp,"&&&&&&&&&&&&&&&&&&&&&&&")
	return (
		<Router>
			<Switch>
				{Object.keys(marginTemp).length>0?
					<>
					<Route exact path="/" >
						<Nav url="/" />
						<Header title="GET YOUR CAR" />
						<GetItems sorting={sorting} marginTemp={marginTemp}/>
					</Route>

					<Route exact path="/result" >
						<ResultNav/>
						<ResultsContent components={components} setComponents={setComponents} formData={formData} setFormData={setFormData} setTotalAmount={setTotalAmount} totalAmount={totalAmount} inputIcion={inputIcion} setinputIcion={setinputIcion} valoracion={valoracion} marginTemp={marginTemp}/>
					</Route>

					<Route exact path="/sorting" >
					<Sorting url="/sorting" sorting={sorting} setSorting={setSorting}/>
					</Route>

					<Route exact path="/add" >
						<Nav2 url="/add" />
						<Header title="ADD DATA" />
						<AddForm components={components} setComponents={setComponents} formData={formData} setFormData={setFormData} setTotalAmount={setTotalAmount} inputIcion={inputIcion} setinputIcion={setinputIcion} valoracion={valoracion} setValoracion={setValoracion}/>
					</Route>

					<Route exact path="/addComponents" >
						<Nav2 url="/addComponents"/>
						<Header title="ADD Components" />
						<AddComponents components={components} setComponents={setComponents}/>
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