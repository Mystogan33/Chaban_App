import React, { Component } from 'react';
import '../styles/app.css';
import {Button, Row, Col} from 'react-materialize'

class Item extends Component {

  render() {
    return (
      <Row>
      	<Col s={2} className='grid-example margin-top'>{this.props.date}</Col>
      	<Col s={2} className='grid-example margin-top'>{this.props.start}</Col>
      	<Col s={2} className='grid-example margin-top'>{this.props.end}</Col>
      	<Col s={4} className='grid-example margin-top'>{this.props.reason}</Col>
      	<Col s={2} className='grid-example'><Button floating className="button-more" waves='light' icon='send' node='a' href={"/"+this.props.id}/></Col>
      </Row>
    );
  }
}

export default Item;
