import React, {useState, useEffect} from 'react'
import styles from './chat.module.css'
import man from '../../assets/Img/imageman.png'
import woman from '../../assets/Img/imagewoman.png'
import lupa from '../../assets/Img/Search.svg'
import logo from '../../assets/Img/Logo.png'
import send from '../../assets/Img/Send.svg'
import report from '../../assets/Img/Report.svg'
import axios from 'axios'

const  url = 'ws://127.0.0.1:8000/ws/messenger/room/1'
const chatSocket = new WebSocket(url)
console.log(chatSocket)

const Chat = () => {
  const [data, setData] = useState([])
  const [msg, setMsg] = useState([])
  const [username, setUsername] = useState('')
  const [datetime, setDateTime] = useState('')  

  const sendMsj = () => {
    // message = document.querySelector("#message")
        if (msg.trim() !== "") {
            chatSocket.send(JSON.stringify({ 'message': msg.trim() }))
            setMsg('')
        }
    }
    
    chatSocket.onopen = (e) =>{
    console.log("WS open")
    }
    chatSocket.onmessage = function (data) {
        console.log(data)
        const user = 3;
    
        setData(JSON.parse(data.data))
        setMsg(data.message)
        setUsername(data.username)
        setDateTime(data.datetime)
        
        
        // var customBox = "box1"
        // if (user != username){
        //   customBox = "box2"
    }
        
        // document.querySelector("#boxMsj").innerHTML += 
        // `<div class=' ${customBox}' id='scroll'>
        //   <small><i><b> ${username} </b></i></small>
        //   <div>
        //   ${msj}
        //   </div> 
        //     <div>
              
        //       <div style='text-align:right'>
        //       <small>${datetime}</small>
        //       </div>
        //       </div>
        // </div>`
        // document.getElementById('message').appendChild(show_messages);
        // console.log(msj)
    
        chatSocket.onclose = function (e){
            console.log(e)
        }
    
   
  
//   const listMsg =  () => {
//     try {
//      const res = axios.post("http://127.0.0.1:8000/messenger/api/", {
//         content : "Hola, prueba",
//         user_id : 3
//      })
//     .then(res => {console.log('mensaje enviado')})
//     .catch(err => console.log(err))
//     }
//     catch (err){console.log(err)}
//   }

//   useEffect(()=>{
//     listMsg();
//   },[data])
  return (
    <div className={styles.flex}>
        <div className={styles.divOne}>
            <div className={styles.title}>
                <p>Messages</p>
            </div>
            <div className={styles.search}>
                <input className={styles.inputMessage} type="text" placeholder='Search in messages' />
                <img src={lupa} alt="" className={styles.buscar} />
            </div>
            <div style={{backgroundColor:'white', boxShadow: '4px 4px 16px rgba(0, 0, 0, 0.06)', height:'77.5vh'}}>
        
                    <div className={styles.flexMessages}> 
                    <div>
                        <img src={man} alt="" className={styles.image} />
                    </div>
                    <div>
                        <div className={styles.flexName}>
                            <p className={styles.name}>{username}</p>
                            <p className={styles.date}>{datetime}</p>
                        </div>
                        <div>
                            <p className={styles.message}>{msg}</p>
                        </div>
                    </div>
                </div>
               
                
            </div>
        </div>


        <div className={styles.divTwo}>
            <div className={styles.flex}>
                <img src={woman} alt="" className={styles.image} />
                <p>Martin Sanchez</p>
            </div>
            <div>
                <div>
                    <div className={styles.message}>
                        <p className={styles.one}>ascdacfadcfsdcsdcsdc dcsdacdcsdcsdcsd</p>
                        <p className={styles.two}>22:47</p>
                    </div>
                </div>
                <div className={styles.divInput}>
                    <input className={styles.inputTwo} type="text" onChange={(e)=>{setMsg(e.target.value)}} />
                    <button onClick={sendMsj}><img src={send} alt="" className={styles.image} /></button>
                </div>
            </div>
        </div>

        <div className={styles.flexColumn}>
            <div className={styles.divThree}>
                <div className={styles.divImg}>
                    <img src={woman} alt="" className={styles.image} />
                </div>
                <div className={styles.divName}>
                    <p className={styles.name}>Walter James</p>
                    <p className={styles.job}>IT Recruiter</p>
                </div>
                <div className={styles.divLogo}>
                    <img src={logo} alt="" className={styles.logo} />
                </div>
                <div className={styles.divButton}>
                    <button>VIEW PROFILE</button>
                </div>
            </div>
            <br />
            <div className={styles.flex}>
                <img src={report} alt="" />
                <a href='#'>Report abuse of scam</a>
            </div>
        </div>
        
    </div>
  )

}
export default Chat