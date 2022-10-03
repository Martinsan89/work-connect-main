import React from 'react'
import { NavLink } from 'react-router-dom'
import Inbox from '../Sidebar/icons/Notifications'
import Icon from './Icons/Work'
import eye from '../../assets/Img/PinkEye.png'
import styles from './notifications.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Notifications = () => {

  const [dataMsg, setDataMsg] = useState([])
  // console.log(dataMsg)
  const getMsg = async () => {
    try{
       const response = await axios.get('http://127.0.0.1:8000/messenger/api/message/')
            .then(resp => setDataMsg(resp.data.messages))
            .catch(err => console.log(err))
    } catch(err){
        console.log(err)
    }
    
  }

  useEffect(()=>{
    getMsg();
  },[])
  return (
    <div style={{width:'100%'}}>
        <div className={styles.flexTitle}>
            <Inbox fill='white' />
            <h5>Notifications</h5>
        </div>
        <div style={{backgroundColor:'white', boxShadow: '4px 4px 16px rgba(0, 0, 0, 0.06)', height:'85.5vh'}}>
          {dataMsg.map((i) => (
            <div className={styles.flexItems} key={i.id}>
            <div className={styles.flex}>
            <Inbox fill='black' />
                <div className={styles.description}>
                    {/* <p className={styles.pOne}>The advertisments has been updated</p> */}
                    <p className={styles.pTwo}>{i.content}</p>
                </div>
            </div>
            <div className={styles.flexItems2}>
                <div className={styles.flex}>
                    <img src={eye} className={styles.eye} />
                    <p>VIEW</p>
                </div>
                <div>
                    <p>{i.created_at}</p>
                </div>
            </div>
        </div>
          ))} 
        </div>
    </div>
  )
}

export default Notifications