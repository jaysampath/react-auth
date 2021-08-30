import { useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';
import { useHistory } from 'react-router-dom';
const ProfileForm = () => {
const history = useHistory();
  const newPasswordInputRef = useRef();
   const authCtx =  useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBjbQQ4QwnD1AZXdogkIX6QfGbwUypXZ40',{
       method:'POST',
       body:JSON.stringify({
         idToken : authCtx.token,
         password: enteredNewPassword,
         returnSecureToken:false
       }),
       headers:{
         'Content-Type':'application/json'
       }
    }).then(res => {
    
      if(res.ok){

        history.replace('/');

      }else{
        throw new Error('password change failed');
      }
    })
  }
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef} minLength="6" />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
