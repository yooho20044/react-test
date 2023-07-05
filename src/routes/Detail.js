import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from 'react';
import styled from "styled-components";


let YellowBtn = styled.button`
  background : ${ props => props.bg};
  color : ${props => props.bg == 'blue' ? 'white' : 'black'};
  padding : 10px;
`




function Detail(props){
    let [count, setCount] = useState(0);
    let {id} = useParams();
    //let choose = props.shoes.filter((shoes) => id == shoes.id);
    let choose = props.shoes.find((x) => {return x.id == id })
    let [alert, setAlert] = useState(true);
    let [veri, setVeri] = useState(true);
    let [msg, setMsg] = useState('');

    useEffect(() => {
      setTimeout(() => {
        setAlert(false)
      }, 2000)
    }, [])

    useEffect(()=>{
      isNaN(msg) ? setVeri(false) : setVeri(true);
    },[msg])
  



    return(
      <div className="container">
        {
          alert == true ?
          <div className="alert alert-warning">2초 이내 구매시 할인</div>
          : null
        }
        <div className="row">
          <div className="col-md-6">
          <img src={process.env.PUBLIC_URL + "/img/shoes" + (choose.id + 1)  + ".jpg"} width="100%"/>
          </div>
          <div className="col-md-6">
            {
              veri == false ?
              <div className="alert alert-danger dg">숫자만 입력하세요</div>
              : null
            }
            <input type="text" onChange={(e) => {
              setMsg(e.target.value);
            }}></input>
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{choose.title}</h4>
            <p>{choose.content}</p>
            <p>{choose.price}</p>
            <button className="btn btn-danger">주문하기</button> 
          </div>
        </div>
      </div> 
    )
  }

export default Detail