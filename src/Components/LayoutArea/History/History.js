import { Component } from "react";
import "./History.css";
import axios from 'axios'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';

class History extends Component {


    constructor() {
        super();
        this.state = {
           

            values: [],
            flag : 0

        }

        this.sortByDate = this.sortByDate.bind(this);
        
        this.sortByDateDescending = this.sortByDateDescending.bind(this);

        this.sortByHigh1 = this.sortByHigh1.bind(this);

        this.sortByHigh2 = this.sortByHigh2.bind(this);

        this.sortByLow1 = this.sortByLow1.bind(this);

        this.sortByLow2 = this.sortByLow2.bind(this);

        this.sortByOpen1 = this. sortByOpen1.bind(this);

        this.sortByOpen2 = this.sortByOpen2.bind(this);

        this.sortByClose1 = this.sortByClose1.bind(this);

        this.sortByClose2 = this.sortByClose2.bind(this);



       

        this.changeData = this.changeData.bind(this);

        this.changeData2 = this.changeData2.bind(this);

        this.changeData3 = this.changeData3.bind(this);

        this.changeData4 = this.changeData4.bind(this);


    }


    async componentDidMount() {
        try {
            const response = await axios.get(`https://www.fxempire.com/api/v1/en/crypto-coin/chart/candles/histominute?aggregate=1&e=CCCAGG&fsym=BTC&tsym=usd`);



            this.setState ({values: response.data.data})
           
            let array = this.state.values

            for(let one of array){
                let date = new Date(one.Date)
                date.setHours(date.getHours()+2)

                console.log(date)

                one.Date = date.toLocaleString()
            }

            this.setState({values: array})
          
          

            
        } catch (err) {
            console.log(err);
        }
    }



       async sortByDate(){


              let array = this.state.values

              array.sort((a, b) => new Date(a.Date) - new Date(b.Date))
  
              console.log(array);
  
              this.setState({values: array})
        }


        sortByDateDescending(){
            let array = this.state.values

            array.sort((a, b) => new Date(b.Date) - new Date(a.Date))

            console.log(array);

            this.setState({values: array})
        }


        sortByHigh1(){
            let newArray = this.state.values

            newArray.sort(function(a, b){return b.High-a.High});

            this.setState({values: newArray})
        }



        sortByHigh2(){
            let newArray = this.state.values

            newArray.sort(function(a, b){return a.High-b.High});

            this.setState({values: newArray})
        }



        sortByLow1(){
            let newArray = this.state.values

            newArray.sort(function(a, b){return b.Low-a.Low});

            this.setState({values: newArray})
        }


        sortByLow2(){
            let newArray = this.state.values

            newArray.sort(function(a, b){return a.Low-b.Low});

            this.setState({values: newArray})
        }


        sortByOpen1(){
            let newArray = this.state.values

            newArray.sort(function(a, b){return  b.Open-a.Open});

            this.setState({values: newArray})
        }

        sortByOpen2(){
            let newArray = this.state.values

            newArray.sort(function(a, b){return a.Open-b.Open});

            this.setState({values: newArray})
        }



        sortByClose1(){
            let newArray = this.state.values

            newArray.sort(function(a, b){return  b.Close-a.Close});

            this.setState({values: newArray})
        }

        sortByClose2(){
            let newArray = this.state.values

            newArray.sort(function(a, b){return  a.Close-b.Close});

            this.setState({values: newArray})
        }



        async changeData(){
            const response = await axios.get(`https://www.fxempire.com/api/v1/en/crypto-coin/chart/candles/histominute?aggregate=1&e=CCCAGG&fsym=BTC&tsym=usd`);

        


            this.setState({values: response.data.data})

            this.setState({flag:1})

            console.log(this.state.values);

            let d = new Date();
            let y = d.getDate() - 1
            let array = []

            
            for(let i of this.state.values){
                let f = new Date(i.Date);
                
               
                let diff = d.getTime() - f.getTime()
                let minutes = (diff / (1000 * 60)).toFixed(1);

      
                console.log(minutes)
      
                  if(minutes <= 121 && f.getDate() > y){
                    array.push(i);

                  }
                  

                 
            }

            for(let one of array){
                let date = new Date(one.Date)
                date.setHours(date.getHours()+2)

                console.log(date)

                one.Date = date.toLocaleString()
            }


            console.log(array);
            this.setState({values: array})
        }

        async changeData2(){
            const response = await axios.get(`https://www.fxempire.com/api/v1/en/crypto-coin/chart/candles/histominute?aggregate=1&e=CCCAGG&fsym=BTC&tsym=usd`);

            this.setState({values: response.data.data})

            this.setState({flag:2})

            let d = new Date();
            let y = d.getDate() - 1
            let array = []

            
            for(let i of this.state.values){
                let f = new Date(i.Date);
                
               
                let diff = d.getTime() - f.getTime()
                let minutes = (diff / (1000 * 60)).toFixed(1);
      
                console.log(minutes)
      
                  if(minutes <= 125 && f.getDate() > y){
                    array.push(i);

                  }
                  

            }


              for(let one of array){
                let date = new Date(one.Date)
                date.setHours(date.getHours()+2)

                console.log(date)

                one.Date = date.toLocaleString()
            }

            console.log(array);
            this.setState({values: array})
        }



        async changeData3(){
            const response = await axios.get(`https://www.fxempire.com/api/v1/en/crypto-coin/chart/candles/histominute?aggregate=1&e=CCCAGG&fsym=BTC&tsym=usd`);

            this.setState({values: response.data.data})


            this.setState({flag:3})

            let d = new Date();
            let y = d.getDate() - 1
            let array = []

            
            for(let i of this.state.values){
                let f = new Date(i.Date);
               
                
               
                let diff = d.getTime() - f.getTime()
              
                let hours = (diff / (1000 * 60 * 60)).toFixed(1);


                let minutes = (diff / (1000 * 60)).toFixed(1);
                
      
                console.log(hours);
      
                  if(minutes<= 180 && f.getDate() > y){
                    array.push(i);

                  }
                  

            }

            for(let one of array){
                let date = new Date(one.Date)
                date.setHours(date.getHours()+2)

                console.log(date)

                one.Date = date.toLocaleString()
            }

           

            console.log(array);
            this.setState({values: array})
        }




        async changeData4(){
            const response = await axios.get(`https://www.fxempire.com/api/v1/en/crypto-coin/chart/candles/histohour?aggregate=1&e=CCCAGG&fsym=BTC&tsym=usd`);

            this.setState({values: response.data.data})

            this.setState({flag:4})

            let array = this.state.values

            for(let one of array){
                let date = new Date(one.Date)
                date.setHours(date.getHours()+2)

                console.log(date)

                one.Date = date.toLocaleString()
            }

            
            this.setState({values: array})

            
        }






     render(){


      

        return (
            



            <div className="History">
				
                <Stack spacing={2} direction="row">

                
      <Button variant="contained" color={this.state.flag === 1 ? "secondary" : "primary"} onClick={this.changeData}>1 Minute</Button>
      <Button variant="contained" color={this.state.flag === 2 ? "secondary" : "primary"} onClick={this.changeData2}>5 Minuts</Button>
      <Button variant="contained" color={this.state.flag === 3 ? "secondary" : "primary"} onClick={this.changeData3}>1 Hour</Button>
      <Button variant="contained" color={this.state.flag === 4 ? "secondary" : "primary"} onClick={this.changeData4}>1 Week</Button>
    </Stack>

<br/>

                <table border="1px" width="100%">
                <tbody>
                <tr>

                    <th> 
                        Date
                       
                        <ArrowDropDownOutlinedIcon className="pointer" style={{ color: "red" }} onClick={this.sortByDate}></ArrowDropDownOutlinedIcon>
                      
                        <ArrowDropUpOutlinedIcon className="pointer" style={{ color: "green" }} onClick={this.sortByDateDescending}></ArrowDropUpOutlinedIcon>
                   
                    </th>
                    <th> 
                         High

                         <ArrowDropDownOutlinedIcon className="pointer" style={{ color: "red" }} onClick={this.sortByHigh1}></ArrowDropDownOutlinedIcon>
                      
                      <ArrowDropUpOutlinedIcon className="pointer" style={{ color: "green" }} onClick={this.sortByHigh2}></ArrowDropUpOutlinedIcon>

                        
                    </th>
                    <th> 
                        Low
                        <ArrowDropDownOutlinedIcon className="pointer"  style={{ color: "red" }} onClick={this.sortByLow1}></ArrowDropDownOutlinedIcon>
                      
                      <ArrowDropUpOutlinedIcon className="pointer" style={{ color: "green" }} onClick={this.sortByLow2}></ArrowDropUpOutlinedIcon>
                    </th>
                    <th> 
                        Open

                        <ArrowDropDownOutlinedIcon className="pointer" style={{ color: "red" }} onClick={this.sortByOpen1}></ArrowDropDownOutlinedIcon>
                      
                      <ArrowDropUpOutlinedIcon className="pointer" style={{ color: "green" }} onClick={this.sortByOpen2}></ArrowDropUpOutlinedIcon>

                        
                    </th>
                    <th> 
                        Close

                        <ArrowDropDownOutlinedIcon className="pointer" style={{ color: "red" }} onClick={this.sortByClose1}></ArrowDropDownOutlinedIcon>
                      
                      <ArrowDropUpOutlinedIcon className="pointer" style={{ color: "green" }} onClick={this.sortByClose2}></ArrowDropUpOutlinedIcon>
                    </th>

                 </tr>

                    {this.state.values.map(data =>

                    

                        <tr>

                            <td> 
                                {data.Date}
                               
                            </td>
                            <td> 
                                {data.High}
                            </td>
                            <td> 
                                {data.Low}
                            </td>
                            <td> 
                                {data.Open}
                            </td>
                            <td> 
                                {data.Close}
                            </td>

                        </tr>
                    )}
                </tbody>
                </table>
            </div>
        );
    }
}

export default History;
