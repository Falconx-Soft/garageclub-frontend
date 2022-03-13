import Item from './item'
import './getItems.css';
import React from "react"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import {TextField} from '@material-ui/core';

export default function GetItems(props) {

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    const [validation, setvalidation] = React.useState([]);
    const [temp, setTemp] = React.useState(validation);

    React.useEffect(function() {
        fetch("api/validations/")
            .then(res => res.json())
            .then(data => setTemp(data))
    }, [])

    React.useEffect(function() {
        fetch("api/validations/")
            .then(res => res.json())
            .then(data => setvalidation(data))
    }, [])
    
    if(props.sorting === "margin"){
        temp.sort(function(a, b) {
            return b.margin - a.margin;
          });
    }else if(props.sorting === "price"){
        temp.sort(function(a, b) {
            return b.amount_purchase - a.amount_purchase;
          });
    }else{
        temp.sort(function(a, b) {
            return new Date(b.created_at) - new Date(a.created_at);
          });
    }
    const itemObj = temp.map(i => {
        if(i){
            return <Item keyNumber={i.reference} detail={i.model} key={i.id} amount_purchase={i.amount_purchase} amount_sale={i.amount_sale} id={i.id} risk={i.risk} margin={i.margin} setvalidation={setvalidation} validation={validation} setTemp={setTemp} type={i.type} marginTemp={props.marginTemp} created_at={i.created_at} calculation_type={i.calculation_type} cost = {i.costs} tabData={props.tabData} settabData={props.settabData} costList={props.costList} setCostList={props.setCostList} />
        }
    })
    function handleChange(event) {
        const m = event.target.value;
        let hold = []
        if(m===""){
            setTemp(validation);
        }else{
            validation.map((c) => {
                var re = new RegExp(m, 'i');
                if(c && c.reference.match(re)){
                    hold.push(c);
                }else if(c && c.model.match(re)){
                    hold.push(c);
                }
            })
            setTemp(hold);
        }
    }

    function selectSort(name){
        props.setSorting(name)
    }
    
    return (
        <div className='main-div'>
            {/* <div className="searchDiv">
                <TextField id="standard-basic" label="Search" variant="standard" onChange={handleChange} />
            </div> */}
            <div className='sliderDiv'>
                <div className='filterOption' onClick={()=> selectSort("date")}>By Date</div>
                <div className='filterOption' onClick={()=> selectSort("margin")}>By Margin</div>
                <div className='filterOption' onClick={()=> selectSort("price")}>By Selling Price</div>
            </div>

            {itemObj}

            <Link to={{
				pathname: "/add",
				state:{
					fromAddComponents: false
				}
			}}><div className='addDiv'>+ Create New</div></Link>
        </div>
    )
}