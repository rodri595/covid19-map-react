import React from 'react';
import {Navbar, Nav} from 'react-bootstrap'

import instagram from './img/instagram.svg'
import credomatic from './img/credomatic.png'
import email from './img/email.svg'
import paypal from './img/paypal.svg'
import github from './img/github.svg'



import 'bootstrap/dist/css/bootstrap.min.css';


export default class Header extends React.Component {
  render(){
      return(
        <Navbar className="navbarrod" bg="dark" variant="dark">
          <Navbar.Brand href="">Covid-19 Map</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="https://www.instagram.com/rodri595/"  target="_blank"><img src={instagram} alt={"instagram"} height={20} /></Nav.Link>
            <Nav.Link href="https://github.com/rodri595"  target="_blank"><img src={github} alt={"github"} height={20} /></Nav.Link>
            <Nav.Link href="https://paypal.me/rodrigoerazo595"  target="_blank"><img src={paypal} alt={"paypal"} height={20} /></Nav.Link>
            <Nav.Link href="mailto:rodri.595@hotmail.com"  target="_blank"><img src={email} alt={"email"} height={20} /></Nav.Link>
            <Nav.Link href="https://www1.sucursalelectronica.com/ebac/module/transfer/requestLocalTransfer.go" target="_blank"><img src={credomatic} alt={"bac"} height={20} /> <strong>Cuenta : 742514681</strong></Nav.Link>
          </Nav>
      </Navbar>

      )
  }
}



/* TODO
--------------
-AGREGAR CUENTA DE BAC
-USAR ICONOS




-SUBIRLO A NETIFLY
*/