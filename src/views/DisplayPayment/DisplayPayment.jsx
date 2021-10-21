import React, { useEffect, useState } from "react";
import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css";

import { headers, paymentTerms } from './constant'
import { Table } from '../../components/Table'
import { Button, Dropdown } from 'react-bootstrap';


const DisplayPayment = () => {

  const [paymentData, setPaymentData] = useState({})
  const [resultsarray, setResultsArray] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [isLoadMoreRequired, setIsLoadMoreRequired] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [nextPageIndex ,setNextPageIndex] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('')
  const [isDataFiltered ,setIsDataFiltered] = useState(false)
  


  const getPaymentData = async (nextIndex) => {
    await axios.get('http://localhost:9001/api/payments',{
      params: { 'pagelndex': nextIndex},
    }).then(function (response) {
      if(response.data){
        const updatedResponse = response.data;
        if(isLoadMoreRequired){
          updatedResponse.results.push(...resultsarray.results);
          setIsLoaded(true)
        }
        setResultsArray(updatedResponse)
        setNextPageIndex(updatedResponse.metaDatal.nextPageIndex)
      }
      setIsLoaded(true)
      setIsDataFiltered(false)
    })
  }



  useEffect(() => {
    getPaymentData()
  }, []);

  useEffect(() => {
   if(isLoaded){
     let loadmore = resultsarray.metaDatal.hasMoreElements
    if(loadmore){
      setIsLoadMoreRequired(loadmore)
    }
   }
   
  }, [isLoaded]);

  const handleSelect=(e)=>{
    const updatedData = resultsarray.results.filter(item => item.paymentStatus === e); 
    setFilteredData(updatedData)
    setIsDataFiltered(true)
  }

  const reset = () => {
    setIsDataFiltered(false)
  }

  return (
    <div>
      {
        resultsarray.results && (
        <> 
           <div className="row">
             <div className="col-xs-2 p-4">
             <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Select Payment Status
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {
                   Object.keys(paymentTerms).map((item, i) => (
                      <Dropdown.Item key={item} eventKey={item}>{paymentTerms[item]}</Dropdown.Item>
                   ))
                  }
                </Dropdown.Menu>
              </Dropdown>
              {' '}
              </div>
              <div className="col-xs-2 p-4">
                <Button variant="primary" size="xl" onClick={reset}>Reset</Button>
              </div>
           </div>
           <Table header={headers} row={isDataFiltered? filteredData : resultsarray.results} paymentTerms={paymentTerms} />
           {isLoadMoreRequired && <Button variant="primary" size="lg" onClick={()=>getPaymentData(nextPageIndex)}> Load More </Button>}
        </>
        )
      }
    </div>
  )
};

export default DisplayPayment;
