import React from 'react';
import '../styles/app.css';
import {Row, Col, Button, Icon, ProgressBar} from 'react-materialize'
import {config} from '../config.js'

class SinglePage extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      info: {},
      isLoading: true,
      id: this.props.match.params.id,
      max: localStorage.getItem('results_max')
    };
  }

  componentDidMount(){
    this.info();
  }

  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
  }

  info() {
    fetch(config.apiUrl+this.state.id)
    .then(this.handleErrors)
    .then(res => res.json())
    .then(res => this.setState({ info: res, isLoading:false }))
    .catch(function(error) {
        console.log(error);
    });
  }

  render(){

    let prevButton = null;
    let nextButton = null;
    const id = parseInt(this.state.id , 10);

    if (id > 1) {
      prevButton = <Button node="a" className="previous-button" href={"/"+ (id-1) } waves='light'>Précédent<Icon left>chevron_left</Icon></Button>;
    } else if(id === 0) {
      window.location="/";
    } else {
      prevButton = null;
    }

    if(id < this.state.max) {
      nextButton = <Button node="a" className="next-button" href={"/"+(parseInt(this.props.match.params.id,10)+1)} waves='light'>Suivant<Icon right>chevron_right</Icon></Button>
    } else if(id > this.state.max) {
      window.location="/";
    } else {
      nextButton = null;
    }

    return (
      <div className="content">
        <div className="title"><h1>Chaban App</h1></div>
        {this.state.isLoading && <ProgressBar/>}
        <Row>
          <Button node="a"  className="button-home" href="/" waves='light'>Liste des événements<Icon left>home</Icon></Button>
        </Row>
        <Row clasName="margin-top">
          <Col s={12} className='grid-example'>Date : {this.state.info.date}</Col>
        </Row>
        <Row className="margin-top">
          <Col s={4} className='grid-example'>Début : {this.state.info.start}</Col>
          <Col s={4} className='grid-example'>Fin : {this.state.info.end}</Col>
          <Col s={4} className='grid-example'>Motif: {this.state.info.reason}</Col>
        </Row>
        <Row className="nav" id={id}>
            { prevButton }
            { nextButton }
        </Row>
      </div>
    );
  }
}

export default SinglePage;
