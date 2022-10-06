import React, {useState, useReducer, useEffect} from 'react'
import styles from '../Education/Education.module.css'
import Edit from '../../../assets/Buttons/Edit.svg'
import Pen from '../../../assets/Edit/Pen.svg'
import Trash from '../../../assets/Edit/Trash.svg'
import ModalEducation from '../Education/ModalEducation'
import UpdateEducation from '../Education/UpdateEducation'
import axios from 'axios'

export default function Education() {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [deleteId, setDeleteId] = useState(0)
  // console.log(data)
  const listEducation = async() => {
    try {
      const resp = await axios.get("http://127.0.0.1:8000/accounts/api/education/")
      .then((resp) => {setData(resp.data.Education.reverse())})
      // console.log(resp.data)
      setLoading(true)
    }
    catch(error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    listEducation();
  },[])

  useEffect (() => {
    axios.delete(`http://127.0.0.1:8000/accounts/api/education/${deleteId}`)
    .then(response => listEducation())
    .catch(error => {
        setErrorMessage(error.message);
        console.error( error);
    })
  }, [deleteId]) 
  
  
  const reducer = (state, action) => {
    switch (action.type) {
      case "toggleEdit":
        return{showEditIcons: state.showEditIcons = true, showEdit: !state.showEdit, showEditButtons: state.showEditButtons = true}
      case "closeEdit": 
        return{showEditIcons: !state.showEditIcons, showEdit: state.showEdit = true, showEditButtons: !state.showEditButtons}
      default: 
        return state;    
    }
  }

  const [modalShow, setModalShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  const [id, setId] = useState(0);
  const [state, dispatch] = useReducer(reducer, {showEditIcons:false, showEdit:true, showEditButtons:false })

  return (
    <div style={{position:'relative', bottom:'2rem'}}>
      {data.map((education) => {
        return (
        <div className={`${styles.educationTag}`} key={education.id}>
          <div className={`${styles.educationTitle}`}>
            <div className={`${styles.tagTitle}`}>
              <p>{education.grade}</p>
            </div>
            <div className={`${styles.tagDate}`}>
            <p>From {education.init_year}</p> <p>to {education.end_year} {education.still_studying && 'still studyin'}</p>
            </div>
          </div>
          {state.showEditIcons && <div style={{display: 'flex', justifyContent: 'flex-end', width: '28%', alignContent: 'center',
          position: 'relative', left: '72%', gap: '2rem', marginBottom:'-1rem', bottom:'0rem'}}><button style={{border:'none',background:'none'}} onClick={() => {setUpdateShow(true), setId(education)}}><img style={{backgroundColor:'white'}} src={Pen} /></button>
            <button style={{border:'none'}} onClick={() => {
            setDeleteId(education.id)
          }}><img style={{backgroundColor:'white'}} src={Trash} /></button></div> }
          <div>
            <div className={`${styles.subtitle}`}>
              <p>{education.institution}</p>
            </div>
            <div className={`${styles.text}`}>
              <p>{education.study}</p>
            </div>
          </div>
        </div>

        )
      })}
      <div className={`${styles.buttonSet}`}>
        {state.showEdit && <button variant="primary" style={{backgroundColor: '#ffff',
        border: 'none', background:'none'}}  onClick={() => dispatch({type:"toggleEdit"})}>
            <img className={`${styles.imgButton}`} src={Edit} alt="Chatbutton" /> 
        </button>}
        {state.showEditButtons && <div style={{position: 'fixed', top:'85%', width:'60%', left:'72%'}}>
        <button onClick={() => setModalShow(true)} style={{padding:'1rem', backgroundColor:'#142157', width:'140px', height:'52px', fontSize:'14px', fontWeight:'400', borderRadius:'3rem', lineHeight:'20px', color:'white'}}>ADD</button>
        <button style={{padding:'1rem', backgroundColor:'#F14281', width:'140px', height:'52px', fontSize:'14px', fontWeight:'400', borderRadius:'3rem', lineHeight:'20px', color:'white', marginLeft:'10px', border:'none'}} onClick={() => dispatch({type:"closeEdit"})} >SAVE</button>
        </div> }
          <ModalEducation show={modalShow} onHide={() => setModalShow(false)}/>
          <UpdateEducation show={updateShow} onHide={() => setUpdateShow(false)} id={id}/>
      </div>
    </div>
  )
}
