import React, { useState, useEffect } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Statistic } from 'antd';
import axios from 'axios';
import "./Admindashboard.css"
import Chart from '../../components/areaGraph';
import HeaderComp from '../../components/header';

function HomePage() {

  const [Data, setData] = useState([])
  const [Profit, setprofit] = useState(0)
  const [Monthname, setMonthname] = useState("")
  const [LastmProfit, setLastmprofit] = useState(0)
  const [LastordSold, setLastordSold] = useState(0)
  const [webrods, setwebrods] = useState(0)
  const [Tusers, setTusers] = useState(0)

  var currentDate = new Date();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var currentMonthName = months[currentDate.getMonth()];
  var lastMonthName = months[currentDate.getMonth() - 1];


  const FetchAnalytics = async () => {
    try {
      const webord = await axios.get("/w-vm-api/v1/analytics/get-order-analytics")
      const data = await axios.get("/api/v1/users/getall-users");
      setTusers(data.data["usersList"].length);

      setData(webord.data.length > 0 && webord.data.map((anlyct) => ({
        month: anlyct.monthname,
        Profit: anlyct.profit,
        Orders: anlyct.sold

      })))

      for (let i of webord.data) {
        if (i.monthname === currentMonthName) {
          setwebrods(i.sold)
          setprofit(i.profit)
        }
        if (i.monthname === lastMonthName) {
          setLastordSold(i.sold)
          setLastmprofit(i.profit)
        }
      }

    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {

    FetchAnalytics()
    setMonthname(currentMonthName)


  }, [])

  console.log(Data);

  return (
    <>
      
        <HeaderComp />

      <div >
      
        <div className='anmain'>
        {Data=== false ? 
        <div style={{display:"flex",justifyContent:"center" ,marginBottom:"-50px",marginTop:"-40px"}}>
        <img style={{width:"400px"}} src='https://static-vision.s3.ap-south-1.amazonaws.com/%E2%80%94Pngtree%E2%80%94404+not+found+or+page_5595003.png' />
        </div>
        :
        
          <div className='graphdiv'>
            <Chart Data={Data} />
          </div>}
          <div className='bottomstat'>
            <div className='stat'>
              {Profit > LastmProfit ?
                <Card bordered={false}>
                  <Statistic
                    title={`Profit Gained in ${Monthname}`}
                    value={"₹" + Profit + ".00"}
                    precision={2}
                    valueStyle={{
                      color: '#3f8600',
                    }}
                    prefix={<ArrowUpOutlined />}
                  />
                </Card> :
                <Card bordered={false}>
                  <Statistic
                    title={`Profit Gained in ${Monthname}`}
                    value={"₹" + Profit + ".00"}
                    precision={2}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<ArrowDownOutlined />}
                  />
                </Card>
              }

            </div>

            <div className='stat'>
              {webrods > LastordSold ?
                <Card bordered={false}>
                  <Statistic
                    title={`Clocks Sold in ${Monthname}`}
                    value={webrods}
                    valueStyle={{
                      color: '#3f8600',
                    }}
                    prefix={<ArrowUpOutlined />}
                    suffix="Clocks"
                  />
                </Card>
                :
                <Card bordered={false}>
                  <Statistic
                    title={`Clocks Sold in ${Monthname}`}
                    value={webrods}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<ArrowDownOutlined />}
                    suffix="Clocks"
                  />
                </Card>
              }

            </div>
            <div className='stat'>
              {webrods > LastordSold ?
                <Card bordered={false}>
                  <Statistic
                    title={`Website Orders in ${Monthname}`}
                    value={webrods}
                    valueStyle={{
                      color: '#3f8600',
                    }}
                    prefix={<ArrowUpOutlined />}
                    suffix="Orders"
                  />
                </Card>
                :
                <Card bordered={false}>
                  <Statistic
                    title={`Website Orders in ${Monthname}`}
                    value={webrods}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<ArrowDownOutlined />}
                    suffix="Orders"
                  />
                </Card>
              }
            </div>
            <div className='stat'>
            {Tusers===0?
                <Card bordered={false}>
                  <Statistic
                    title={"Total Users"}
                    value={Tusers}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<ArrowDownOutlined />}
                    
                    suffix="Users"
                  />
                </Card>
                :
                <Card bordered={false}>
                  <Statistic
                    title={"Total Users"}
                    value={Tusers}
                    valueStyle={{
                      color: '#3f8600',
                    }}
                    prefix={<ArrowUpOutlined />}
                    suffix="Users"
                  />
                </Card>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage