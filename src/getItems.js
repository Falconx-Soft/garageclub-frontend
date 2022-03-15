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

    

    React.useEffect(function() {
        fetch("api/validations/")
            .then(res => res.json())
            .then(data => props.setTemp(data))
    }, [])

    React.useEffect(function() {
        fetch("api/validations/")
            .then(res => res.json())
            .then(data => props.setvalidation(data))
    }, [])
    
    if(props.sorting === "margin"){
        props.temp.sort(function(a, b) {
            return b.margin - a.margin;
          });
    }else if(props.sorting === "price"){
        props.temp.sort(function(a, b) {
            return b.amount_purchase - a.amount_purchase;
          });
    }else{
        props.temp.sort(function(a, b) {
            return new Date(b.created_at) - new Date(a.created_at);
          });
    }
    const itemObj = props.temp.map(i => {
        if(i){
            return <Item keyNumber={i.reference} detail={i.model} key={i.id} amount_purchase={i.amount_purchase} amount_sale={i.amount_sale} id={i.id} risk={i.risk} margin={i.margin} setvalidation={props.setvalidation} validation={props.validation} setTemp={props.setTemp} type={i.type} marginTemp={props.marginTemp} created_at={i.created_at} calculation_type={i.calculation_type} cost = {i.costs} tabData={props.tabData} settabData={props.settabData} costList={props.costList} setCostList={props.setCostList} costDetails={props.costDetails} setcostDetails={props.setcostDetails} />
        }
    })

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