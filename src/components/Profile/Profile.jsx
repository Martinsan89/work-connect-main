import { useReducer, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { dataUser } from '../../helpers/dataUser'
import Edit from '../../assets/Profile/Edit.svg'
import styles from './Profile.module.css'
import PersonalDataModal, { objetoUser } from './PersonalDataModal'
import phone from '../../assets/Profile/phone.svg'
import mail from '../../assets/Profile/mail.svg'
import website from '../../assets/Profile/website.svg'
import linkedin from '../../assets/Profile/Linkedin.svg'

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

const Profile = () => {

  const [modalShow, setModalShow] = useState(false);
  const [state, dispatch] = useReducer(reducer, {showEditIcons: false, showEdit: true, showEditButtons: false })

  return (
    <div style={{width:'100%'}}>
      <div className={ `${ styles.userCard }` } style={ { backgroundColor: '#FFFF' } } >
          <div className={ `text-start card-header ${ styles.userCardHeader_modifier }` }>
              <p className={`${ styles.userName }`}>
                  { `${ objetoUser.name } ${ objetoUser.lastName} | Profile View `} 
              </p>

                <div className={`${styles.buttonSet}`}>

                  {
                    state.showEdit && 
                    
                    <Button 
                      className={ styles.buttonWrapper } 
                      variant="primary" 
                      onClick={() => setModalShow(true)}
                    >
                        <span className='me-2'>Edit</span>
                        <img className = {`${ styles.imgButton }`} src = { Edit } alt="Edit Button" /> 
                    </Button>
                  }

                    <PersonalDataModal show = { modalShow } onHide={ () => setModalShow(false) }/>
                    
                </div>

          </div>
          <div className='text-start ms-3 mt-0'>
              <img className={ styles.userCardImage } src={ dataUser[0].img } alt="User Image" />
          </div>

            <div className={ `${ styles.professionText }` }>
              <p>{`${ objetoUser.profession } | ${ objetoUser.profession2 } | ${ objetoUser.profession3 }`}</p>
            </div>

            <div className={`${ styles.divPersonalData }`} >
                <p className={ `${ styles.paragraphPersonalData }` }>
                  Name: 
                  <span className={ `${ styles.spanPersonalData }` }> { `${ objetoUser.name }` }</span>
                </p>
                <p className={ `${ styles.paragraphPersonalData }` }>
                  Last Name: 
                  <span className={ `${ styles.spanPersonalData }` }> { `${ objetoUser.lastName }` }</span>
                </p>
                <p className={ `${ styles.paragraphPersonalData }` }>
                  Company: 
                  <span className={ `${ styles.spanPersonalData }` }> { `${ objetoUser.company }` }</span>
                </p>
            </div>
            <hr className={`${ styles.divLine }`}></hr>

          <div className={ `${ styles.contactMainDiv }` }>
            <div className={ `d-flex { styles.contactDiv }` }>
              <img className= { `${ styles.contactIcon }` } src={ phone } alt="" />
              <p className={`mt-3 ms-4 ${ styles.contactInfo }`}>{ `${ objetoUser.phone }` }</p>
            </div>
            <div className={ `d-flex { styles.contactDiv }` }>
              <img className= { `${ styles.contactIcon }` } src={ mail } alt="" />
              <p className={`mt-3 ms-4 ${ styles.contactInfo }`}>{ `${ objetoUser.mail }` }</p>
            </div>
            <div className={ `d-flex { styles.contactDiv }` }>
              <img className= { `${ styles.contactIcon }` } src={ website } alt="" />
              <p className={`mt-3 ms-4 ${ styles.contactInfo }`}>{ `${ objetoUser.website }` }</p>
            </div>
            <div className={ `d-flex { styles.contactDiv }` }>
              <img className= { `${ styles.contactIcon }` } src={ linkedin } alt="" />
              <p className={`mt-3 ms-4 ${ styles.contactInfo }`}>{ `${ objetoUser.linkedin }` }</p>
            </div>
          </div>
          <hr className={`${ styles.divLine }`}></hr>

          <div>
            <p className={ `${styles.paragraphIntroduction}` }>
              Introduction: <span className={ `${ styles.spanIntroduction }` }>{ objetoUser.introduction }</span>
            </p>
          </div>
      </div>
    </div>
  )
}

export default Profile