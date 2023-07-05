import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container, Nav, Row, Col, Spinner } from 'react-bootstrap';
import './App.css';
import Detail from './routes/Detail.js'
import { useState } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet, useHref } from 'react-router-dom'
import axios from 'axios'


function App() {

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  return (
    <div className="App">

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home" style={{color:'orange'}}>Carrot Market</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => {navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={() => {navigate('/detail')}}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <Main shoes={shoes} setShoes={setShoes} />
        }/>
        <Route path="*" element={<div>404 Not Found</div>}/>
        <Route path="/about" element = {<About/>}>
          <Route path="member" element = {<div>멤버임</div>} />
          <Route path="location" element = {<div>위치정보임</div>} />
        </Route>
        <Route path="/event" element={
          <>
            <h4>오늘의 이벤트</h4>
            <Outlet></Outlet>
          </>
        } >
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
        </Route>
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        
      </Routes>

      
    </div>
  );
}

function Module(props){

  return(
            <Col md={4}>
              <Link to={"/detail/" + (props.i)}>
                <img src={process.env.PUBLIC_URL + "/img/shoes" + (props.i + 1)  + ".jpg"} width="80%"/>
              </Link>
              <h4>{props.shoes[props.i].title}</h4>
              <p>{props.shoes[props.i].price}</p>
            </Col>
  )
}

function Main(props){
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  return(
    <>
      <div className='main-bg'></div>
      <Container>
        <Row>
        {
          props.shoes.map(function(a,i){
            return(
              <Module shoes={props.shoes} key={i} i={i}/>
            )
          })
        }     
        </Row>
        <Row id='loading'>
          {
          loading ? <Loading /> : null 
          }
        </Row>
        
        <button onClick={()=>{
          setLoading(true)
          if(count == 1){
            axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((result)=>{
              let copy = [...props.shoes, ...result.data]
              props.setShoes(copy);
              setCount(count+1);
              setLoading(false);
            }).catch(()=>{
              console.log('실패함 ㅅㄱ')
            })
          }else if(count == 2){
            axios.get('https://codingapple1.github.io/shop/data3.json')
            .then((result)=>{
              let copy = [...props.shoes, ...result.data]
              props.setShoes(copy);
              setCount(count+1)
              setLoading(false);
            }).catch(()=>{
              console.log('실패함 ㅅㄱ')
            })
          }else{
            alert('더이상 데이터가 없습니다.');
            setLoading(false);
          }
        }}>더보기</button>
      </Container>
    </>
  )
}

function About(){
  return(
    <div>
      <h4>회사정보임</h4>
      <Outlet />
    </div>
  )
}
function Loading(){
  return(
    <div>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}

export default App;
