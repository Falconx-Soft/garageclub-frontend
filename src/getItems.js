import Item from './item'
import './getItems.css';
import React from "react"
import 'react-multi-carousel/lib/styles.css';
import SideBar from './sideBar.png';
import { Link } from 'react-router-dom';


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
        fetch("http://35.180.210.115:8002/api/validations/", {
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
          })
            .then(res => res.json())
            .then(data => props.setTemp(data))
    }, [])

    React.useEffect(function() {
        fetch("http://35.180.210.115:8002/api/validations/", {
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
          })
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
    const [noOfElement, setnoOfElement] = React.useState(7);
    const slice = props.temp.slice(0, noOfElement);
    
    function loadMoredata(){
      setnoOfElement(noOfElement+noOfElement);
    }

    const itemObj = slice.map((i,index) => {
        if(i){
            return <Item keyNumber={i.reference} detail={i.model} key={i.id} amount_purchase={i.amount_purchase} amount_sale={i.amount_sale} id={i.id} risk={i.risk} margin={i.margin} setvalidation={props.setvalidation} validation={props.validation} setTemp={props.setTemp} type={i.type} marginTemp={props.marginTemp} created_at={i.created_at} calculation_type={i.calculation_type} cost = {i.costs} tabData={props.tabData} settabData={props.settabData} costList={props.costList} setCostList={props.setCostList} costDetails={props.costDetails} setcostDetails={props.setcostDetails} />
        }
    })

    function handleChange(event) {
      const m = event.target.value;
      let hold = []
      if(m===""){
          props.setTemp(props.validation);
      }else{
        props.validation.map((c) => {
              var re = new RegExp(m, 'i');
              if(c && c.reference.match(re)){
                  hold.push(c);
              }else if(c && c.model.match(re)){
                  hold.push(c);
              }
          })
          props.setTemp(hold);
      }
    }

    function selectSort(name){
        props.setSorting(name)
    }
    
    return (
        <div className='main-div'>
          <div className='desktop-sidebar'>
              <div className='desktop-sidebar-item'>
                <img src={SideBar}></img>
                <p>Valoraciones</p>
              </div>
          </div>
          <div className='desktop-itemArea'>
            <div className='itemArea'>
              <div className='search-bar-div'>
                  <h1>Todas Las Valoranions</h1>
                
                <div className='desktop-search-div'>
                  <div className='search-bar-input-div'>
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input type="text" placeholder="Search" onChange={handleChange} />
                  </div>

                  <Link className="noLine"
                      to={{
                      pathname: "/add",
                      state:{
                        fromAddComponents: false
                      }
                    }}><div className='desktop-create-btn'>+ Create New</div></Link>
                </div>
              </div>

              <div className='sliderDiv'>
                  <div className='filterOption' onClick={()=> selectSort("date")}>By Date</div>
                  <div className='filterOption' onClick={()=> selectSort("margin")}>By Margin</div>
                  <div className='filterOption' onClick={()=> selectSort("price")}>By Selling Price</div>
              </div>

                {itemObj}
            </div>
            <Link to={{
              pathname: "/add",
              state:{
                fromAddComponents: false
              }
            }}><div className='addDiv'>+ Create New</div></Link>
            {noOfElement < props.temp.length ? <button className='loadMoreButton' onClick={loadMoredata}>Load more</button> : <button className='loadMoreButtonComplete'></button> } 
          </div>
        </div>
    )
}