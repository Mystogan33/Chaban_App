import React from 'react';
import '../styles/app.css';
import {Row, Button, Icon, ProgressBar , Table} from 'react-materialize';
import {config} from '../config.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class SinglePage extends React.Component {

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
    .then(res => {
      this.setState({ info: res, isLoading:false });
    })
    .catch(function(error) {
      toast.error("Oh ! 🙁 Il semble qu'un soucis se soit produit");
      console.log(error);
    });
  }

  isPreviousable(id) {

    if (id > 1) {
      return <Button node="a" className="previous-button" href={"/"+ (id-1) } waves='light'>Précédent<Icon left>chevron_left</Icon></Button>;
    } else if(id === 0) {
      return 0;
    } else {
      return null;
    }
  }

  isNextable(id) {

    if(id < this.state.max) {
      return <Button node="a" className="next-button" href={"/"+(parseInt(this.props.match.params.id,10)+1)} waves='light'>Suivant<Icon right>chevron_right</Icon></Button>
    } else if(id > this.state.max) {
      return 0;
    } else {
      return null;
    }
  }

  showDetails(url) {
    window.open(url);
  }

  render(){

    const id = parseInt(this.state.id , 10);

    let previousButton = this.isPreviousable(id);

    if(previousButton === 0) {
      toast.info("Never do that again ! 😡");
      setTimeout(function() { window.location = "/" }, 8000);
    }

    let nextButton = this.isNextable(id);

    if(nextButton === 0) {
      toast.info("Never do that again ! 😡");
      setTimeout(function() { window.location = "/" }, 8000);
    }

    return (
      <div className="content">
        <div className="title"><h1>Chaban App</h1></div>
        {this.state.isLoading ? <ProgressBar/> :
          <div>
            <Row>
              <Button node="a"  className="button-home" href="/" waves='light'>Revenir au horaires<Icon left>keyboard_arrow_left</Icon></Button>
            </Row>
            <Row>
              <Table centered hoverable className="margin-top">
                <thead>
                  <tr>
                    <th data-field="date">Date</th>
                    <th data-field="start">Debut</th>
                    <th data-field="end">Fin</th>
                    <th data-field="reason">Motif</th>
                    <th data-field="totale">Totale ?</th>
                    <th data-field="link">Plus d'infos</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>{this.state.info.date}</td>
                    <td>{this.state.info.start}</td>
                    <td>{this.state.info.end}</td>
                    <td>{this.state.info.reason}</td>
                    <td>{this.state.info.totale ? "Oui" : "Non"}</td>
                    <td><Button waves='light' node='a' href={this.state.info.link}><Icon>language</Icon></Button></td>
                  </tr>

                </tbody>
              </Table>
            </Row>
            <Row className="nav" id={id}>
              { previousButton }
              { nextButton }
            </Row>
          </div>}

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
          />
        </div>
      );
    }
  }

  export default SinglePage;
