import React, { Component } from 'react';
import '../styles/app.css';
import Search from '../components/search';
import List from '../components/list';
import {ProgressBar} from 'react-materialize';
import {config} from '../config.js';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mylist: [],
      myCurrentList : [],
      from: null,
      to: null
    };
  }

  componentDidMount() {
    this.infoList();
  }

  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
  }

  infoList() {
    fetch(config.apiUrl)
    .then(this.handleErrors)
    .then(res => res.json())
    .then(res => {
      this.setState({ mylist: res, myCurrentList: res});
      localStorage.setItem('results_max' , res.length);
    })
    .catch(function(error) {
      toast.error("Oh ! 🙁 Il semble qu'un soucis se soit produit");
        console.log(error);

    });
  }

  infoListWithFilter(start, end) {
      this.setState({ from: start, to: end });
      let mylist = this.state.mylist;
      mylist = mylist.filter(this.searchDate,this);
      this.setState({ 'myCurrentList' : mylist });
  }

  searchDate(row){
    let rowDate = moment(row.date, "DD/MM/YYYY");
    let fromDate = moment(this.state.from, "DD/MM/YY");
    let toDate = moment(this.state.to, "DD/MM/YY");


    if(rowDate.diff(fromDate,'days') >= 0 && (!this.state.to || toDate.diff(rowDate,'days') >= 0)) {
      return row;
    }

    if(toDate.diff(rowDate,'days') >= 0 && (!this.state.from || rowDate.diff(fromDate,'days') >= 0)) {
        return row;
    }

    if(!this.state.from && !this.state.to) {
      return row;
    }

    return null
  }

  render() {
    return (
      <div className="content">
        <div className="title"><h1>Chaban App</h1></div>
        <Search datechange={this.infoListWithFilter.bind(this)}/>
        {!this.state.myCurrentList.length ? <ProgressBar/> : <List infos={this.state.myCurrentList}/>}
      </div>
    );
  }
}

export default HomePage;
