import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from 'react';
import styled from "styled-components";
import {Nav} from "react-bootstrap"


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
    let [tab, setTab] = useState(0);
    let [fade, setFade] = useState('');

    useEffect(() => {
      setTimeout(() => {
        setAlert(false)
      }, 2000)
    }, [])

    useEffect(()=>{
      isNaN(msg) ? setVeri(false) : setVeri(true);
    },[msg])
  
    useEffect(()=>{
      setTimeout(()=>{
        setFade('last');
      })
      return(()=>{
        setFade('');
      })
    }, [])



    return(
      <div className={`container first ${fade}`}>
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
        <Nav variant="tabs" defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link onClick={()=>{
              setTab(0);
            }}>Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={()=>{
              setTab(1);
            }}>Link</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={()=>{
              setTab(2);
            }}>Link</Nav.Link>
          </Nav.Item>
        </Nav>
            <TabContent tab={tab}/>
      </div> 
    )
  }

function TabContent({tab}){
  let [fade, setFade] = useState('')
  useEffect(()=>{
    setTimeout(()=>{setFade('end');}, 100)
    return () => {
      setFade('');
    }
  }, [tab])
  return (<div className={`start ${fade}`}>{[<div>내용0</div>,<div>내용1</div>,<div>내용2</div>][tab]}</div>)
}

export default Detail