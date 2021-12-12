import { Component } from "react";
import "./Header.css";
import axios from 'axios'
import logo from '../../../../src/btc.png';
import * as React from 'react';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { NavLink, Link } from "react-router-dom";





class Header extends Component {


  ws = new WebSocket(' wss://wstest.fxempire.com?token=btctothemoon')

  constructor() {
    super();
    this.state = {
      date: new Date(),

      values: [],

      currentValue: null,

      higher: true,

      gap: null,

      gapPercent: 0,

      flag: 1,


    }



  }




  async componentDidMount() {





    try {
      const response = await axios.get(`https://www.fxempire.com/api/v1/en/crypto-coin/chart/candles/histominute?aggregate=1&e=CCCAGG&fsym=BTC&tsym=usd`);

      const response1 = await axios.get(`https://www.fxempire.com/api/v1/en/crypto-coin/chart/candles/histoday?aggregate=6&e=CCCAGG&fsym=BTC&tsym=usd`);
      console.log(response1.data.data);

      this.setState({ values: response.data.data });

      let val = 0;
      let lastVal = 0;



      console.log(lastVal);

      let b = new Date();
      b.setDate(b.getDate() - 1);
      b.setHours(23);
      b.setMinutes(59);
      b.setSeconds(0);


      let time = b.toLocaleString();

      for (let i of this.state.values) {


        let c = new Date(i.Date);
        let time2 = c.toLocaleString();


        if (time === time2) {
          lastVal = i.Close;
          console.log(lastVal);
        }

        val = i.Close;


      }

      this.setState({ currentValue: val });





      this.ws.onopen = () => {
        // on connecting, do nothing but log it to the console
        const msg = { "type": "SUBSCRIBE", "instruments": ["cc-btc-usd-cccagg"] }
        this.ws.send(JSON.stringify(msg));
      }

      this.ws.onmessage = (event) => {


        let test = JSON.parse(event.data)

        let test2 = JSON.stringify(test)



        let test3 = JSON.parse(test2)

        let newVal = test3["cc-btc-usd-cccagg"].last

        this.setState({ currentValue: newVal })









        if (this.state.currentValue <= lastVal) {
          this.setState({ higher: false });
        }

        console.log(this.state.currentValue);


        {
          this.state.higher ? this.setState({ gap: (this.state.currentValue - lastVal).toFixed(2) }) :
            this.setState({ gap: (lastVal - this.state.currentValue).toFixed(2) });
        };



        { this.state.higher ? this.setState({ gapPercent: (lastVal / this.state.currentValue).toFixed(2) }) : this.setState({ gapPercent: (this.state.currentValue / lastVal).toFixed(2) }) };


        console.log(this.state.gapPercent);

      };





      this.intervalID = setInterval(
        () => this.tick(),
        1000
      );



    } catch (err) {
      console.log(err);
    }
  }



  tick() {
    this.setState({
      date: new Date().toLocaleString()
    });
  }

  



  render() {
    return (


      <div className="Header">

        <img src={logo} className="App" alt="logo" />
        <h1>Bitcoin</h1>

        <div>
          <h3> {this.state.date.toLocaleString()} </h3>
        </div>



        {this.state.higher ? <div> <h2 style={{ color: "black" }}>$ {this.state.currentValue}</h2> </div> : <h2 style={{ color: "black" }}>$ {this.state.currentValue}</h2>}

        <br />
        <br /><br /><br />

        {this.state.higher ? <div style={{ color: "green", float: "right" }}> <span> <ArrowDropUpOutlinedIcon ></ArrowDropUpOutlinedIcon> <br />
          <b> ${this.state.gap}  </b>  ||  <b> (+{this.state.gapPercent}%)  </b> </span> </div>

          : <div style={{ color: "red", float: "right" }}> <span> <ArrowDropDownOutlinedIcon></ArrowDropDownOutlinedIcon> <br />
            <b> ${this.state.gap} </b> ||  <b> (-{this.state.gapPercent}%)  </b> </span> </div>}





        <div className="buttom">
          <Stack spacing={2} direction="row">
            <Button variant="contained" component={Link} to={"/overview"}  >Overview</Button>
            <Button variant="contained" component={Link} to={"/history"} >History</Button>

          </Stack>

        </div>




      </div>




















    );
  }
}

export default Header;
