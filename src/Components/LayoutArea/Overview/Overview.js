import { Component } from "react";
import "./Overview.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import axios from 'axios'

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';




class Overview extends Component {

  ws = new WebSocket(' wss://wstest.fxempire.com?token=btctothemoon')

  constructor() {
    super();
    this.state = {
      date: new Date(),

      values: [],

      valuesDaily: [],

      flag: 3

    }

    this.Show1MinuteGraph = this.Show1MinuteGraph.bind(this);
    this.Show5MinuteGraph = this.Show5MinuteGraph.bind(this);
    this.Show1HourGraph = this.Show1HourGraph.bind(this);
    this.Show1WeekGraph = this.Show1WeekGraph.bind(this);
  }



  async componentDidMount() {
    try {
      const response = await axios.get(`https://www.fxempire.com/api/v1/en/crypto-coin/chart/candles/histominute?aggregate=1&e=CCCAGG&fsym=BTC&tsym=usd`);

      const response1 = await axios.get(`https://www.fxempire.com/api/v1/en/crypto-coin/chart/candles/histohour?aggregate=1&e=CCCAGG&fsym=BTC&tsym=usd`);


      console.log(response1.data.data);

      this.setState({ values: response.data.data });
      this.setState({ valuesDaily: response1.data.data });

    } catch (err) {

    }
  }



  Show1MinuteGraph() {

    this.setState({ flag: 1 });



    let minute1 = document.getElementById("minutes1");
    minute1.className = "show";

    let hour = document.getElementById("hour");
    hour.className = "hide";

    let minutes = document.getElementById("minutes");
    minutes.className = "hide";

    let week = document.getElementById("week");
    week.className = "hide";
  }


  Show5MinuteGraph() {

    this.setState({ flag: 2 });

    let minutes = document.getElementById("minutes");
    minutes.className = "show";


    let hour = document.getElementById("hour");
    hour.className = "hide";

    let minutes1 = document.getElementById("minutes1");
    minutes1.className = "hide";

    let week = document.getElementById("week");
    week.className = "hide";
  }



  Show1HourGraph() {
    this.setState({ flag: 3 });

    let minutes = document.getElementById("minutes");
    minutes.className = "hide";


    let hour = document.getElementById("hour");
    hour.className = "show";

    let minutes1 = document.getElementById("minutes1");
    minutes1.className = "hide";

    let week = document.getElementById("week");
    week.className = "hide";
  }


  Show1WeekGraph() {

    this.setState({ flag: 4 });

    let week = document.getElementById("week");
    week.className = "show";

    let minutes = document.getElementById("minutes");
    minutes.className = "hide";


    let hour = document.getElementById("hour");
    hour.className = "hide";

    let minutes1 = document.getElementById("minutes1");
    minutes1.className = "hide";



  }



  render() {

    let array = [];

    var d = new Date();

    d.setHours(d.getHours() - 2);

    console.log(d);

    let y = d.getDate() - 1

    console.log(y);



    for (let i of this.state.values) {
      let f = new Date(i.Date);



      let diff = d.getTime() - 2 - f.getTime()


      let minutes = (diff / (1000 * 60)).toFixed(1);

      if (minutes <= 60 && f.getDate() > y) {

        f.setHours(f.getHours() + 2)

        let time = f.toLocaleString();
        array.push({
          date: time,
          close: i.Close
        })
      }
    }





    let array2 = [];
    let array3 = [];
    let array4 = [];

    for (let i of this.state.values) {
      let date = new Date(i.Date);


      let diff = d.getTime() - date.getTime();

      let minutes = (diff / (1000 * 60)).toFixed(1);



      if (minutes <= 5 && date.getDate() > y) {

        date.setHours(date.getHours() + 2)

        let time2 = date.toLocaleString();
        array2.push({
          date: time2,
          close: i.Close
        })
      }



      if (minutes <= 1 && date.getDate() > y) {



        let time2 = date.toLocaleString();

        array3.push({
          date: time2,
          close: i.Close
        })
      }


    }


    for (let one of this.state.valuesDaily) {
      let date1 = new Date(one.Date);

      date1.setHours(date1.getHours() + 2);

      let time3 = date1.toLocaleString();
     

      array4.push({
        date: time3,
        close: one.Close
      });

    }








    return (



      <div className="Overview">




        <   Stack spacing={2} direction="row">
          <Button id="1min" variant="contained" color={this.state.flag === 1 ? "secondary" : "primary"} onClick={this.Show1MinuteGraph}>1 Minute</Button>
          <Button variant="contained" color={this.state.flag === 2 ? "secondary" : "primary"} onClick={this.Show5MinuteGraph} >5 Minuts</Button>
          <Button variant="contained" color={this.state.flag === 3 ? "secondary" : "primary"} onClick={this.Show1HourGraph}>1 Hour</Button>
          <Button variant="contained" color={this.state.flag === 4 ? "secondary" : "primary"} onClick={this.Show1WeekGraph}>1 Week</Button>
        </Stack>





        <div id="minutes" className="hide" style={{
          width: "100%",
          height: "500px",
          backgroundColor: "white"
        }}>
          <ResponsiveContainer >

            <AreaChart

              data={array2}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="close"
                stackId="1"
                stroke="#ca8282"
                fill="#82abca"
                fillOpacity="0.4"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>





        <div id="minutes1" className="hide" style={{
          width: "100%",
          height: "500px",
          backgroundColor: "white"
        }}>
          <ResponsiveContainer >

            <AreaChart

              data={array3}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="close"
                stackId="1"
                stroke="#ca8282"
                fill="#82abca"
                fillOpacity="0.4"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>





        <div id="hour" className="show" style={{
          width: "100%",
          height: "500px",
          backgroundColor: "white"
        }}>
          <ResponsiveContainer >

            <AreaChart

              data={array}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="close"
                stackId="1"
                stroke="#ca8282"
                fill="#82abca"
                fillOpacity="0.4"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>








        <div id="week" className="hide" style={{
          width: "100%",
          height: "500px",
          backgroundColor: "white"
        }}>
          <ResponsiveContainer >

            <AreaChart
              // width={1400}
              // height={400}
              data={array4}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="close"
                stackId="1"
                stroke="#ca8282"
                fill="#82abca"
                fillOpacity="0.4"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>





      </div>



    );
  }
}

export default Overview;
