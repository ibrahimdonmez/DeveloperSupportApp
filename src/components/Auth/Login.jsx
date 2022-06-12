import {React, useState} from 'react';
import { collection, where, query, onSnapshot  } from "firebase/firestore";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { validationSchema4 } from "../../helper";
import { db } from "../../backend/firebase";
import { user } from "../../stores/UserSlice";
import { useDispatch } from 'react-redux';
import "./Auth.css";

export const Login = () => {

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { handleSubmit, handleChange, handleBlur, touched, values, errors } =
  useFormik({
    initialValues: {
      mail: "",
      password: "",
    },
    validationSchema: validationSchema4,
    onSubmit: (values) => {
      const mail = values.mail;
      const password = values.password;
      
      try {

        const q = query(collection(db, 'Users'),where("mail", "==", mail), where("password", "==", password))
        
        onSnapshot(q, (querySnapshot) => {
          if (querySnapshot.size === 1) {
            localStorage.setItem('userName', querySnapshot.docs[0].data().userName);
            localStorage.setItem('mail', querySnapshot.docs[0].data().mail);
            localStorage.setItem('starRemaining', querySnapshot.docs[0].data().starRemaining);
            dispatch(user());
            setShowErrorMessage(false);
            navigate("/");
          }
          else {
            setShowErrorMessage(true);
          }
        });


      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="container AuthContainer">
      <form onSubmit={handleSubmit} className="">
        <div className="form-group">
          <label>Mail</label>
          <input
            className="form-control w-50"
            type="text"
            name="mail"
            onChange={handleChange}
            value={values.mail}
            autoComplete="off"
            onBlur={handleBlur} 
          />
          {errors.mail && touched.mail && (
            <span className="text-danger">{errors.mail}</span>
          )}
        </div>
        <br/>
        <div className="form-group">
          <label>Şifre</label>
          <input
            className="form-control w-50"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            autoComplete="off"
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (
            <span className="text-danger">{errors.password}</span>
          )}
        </div>
        <br/>
        {showErrorMessage && <h6 className='text-danger'> Hesap Bulunamadı! </h6>}
        <button type="submit" className="btn btn-primary"> Giriş Yap </button>
      </form> 
      <div className="infoText">
        <div>
          Eğer Hesabın Yoksa
          <Link to="/Register" className="AuthLink">
            <span> Kayıt Ol </span>  
          </Link>
        </div>
      </div>
    </div>  
  );
}