import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './mystyles.css'
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);
  const [agents, setAgents] = useState([1, 2, 3]);
  const [customers, setCustomers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [customers2, setCustomers2] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState([1, 2, 3]); // initial value
  const [listPointer, setListPointer] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getUsersData = () => {

      axios.get('http://localhost:3000/listofcustomers2')  /**  axios.get('http://localhost:3000/listofcustomers') */
        .then(response => {
          console.log(response.data);
          

          setData(response.data);
          
          console.log("response.data.length=" + response.data.length);


          setCustomers2([]);
          for (let i = 0; i < response.data.length; i++) {
            setCustomers2(customers2 => [...customers2, response.data[i].customer_id]);
            console.log("Inside for loop =" + response.data[i].customer_id);
          }
          console.log("Inside useEffect, customers2.length=" + customers2.length);
        
          
        })
        .catch(error => {
          console.error(error);
        });
    };

    getUsersData();

  }, []);

  /**
   * 
   */
  console.log("data.length=" + data.length);
  console.log("Outside customers2.length=" + customers2.length);
  
  const changeAgentQueue = () => {
    
    console.log("Inside changeAgentQueue");
    if (listPointer < 7) {
      setListPointer(listPointer + 3);

    }
    if (listPointer > 7) {
      setListPointer(listPointer + 1);
    }

    console.log("Inside listPointer" + listPointer);

  }

  const resetPointer = () => {
    setListPointer(0);
  }


  return (
    <>
      <div className='main_heading'>Round Robin - Chat support</div>
      <div>
        <hr className='slash-1'/>
        <div className="flex-container">
          <div className="flex-child color1">
            Agent {agents[0]}
          </div>
          <div className="flex-child color2">
            Currently serving customer = {customers2[listPointer]}
          </div>
        </div>
        <hr className='slash-1'/>
        <div className="flex-container">
          <div className="flex-child color1">
            Agent {agents[1]}
          </div>
          <div className="flex-child color2">
            Currently serving customer =   {customers2[listPointer + 1]}
          </div>
        </div>
        <hr className='slash-1'/>
        <div className="flex-container">
          <div className="flex-child color1">
            Agent {agents[2]}
          </div>
          <div className="flex-child color2">
            Currently serving customer =  {customers2[listPointer + 2]}
          </div>
        </div>
        <hr className='slash-1'/>
      </div>

      <button className='button-63' onClick={changeAgentQueue}>Next</button>
      <br /> <br />
      <button className='button-63' onClick={resetPointer}>Reset</button>

    </>
  )
}

export default App
