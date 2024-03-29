import {React, useState} from 'react';
import { collection, addDoc, Timestamp, query, where, onSnapshot} from "firebase/firestore";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { validationSchema3 } from "../../helper";
import { db } from "../../backend/firebase";
import { user } from "../../stores/UserSlice";
import { useDispatch } from 'react-redux';
import "./Auth.css";
import { useTranslation } from 'react-i18next';

export const Register = () => {
  const { t } = useTranslation();

  const [showMailErrorMessage, setShowMailErrorMessage] = useState(false);
  const [showuserNameErrorMessage, setShowUserNameErrorMessage] = useState(false);

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { handleSubmit, handleChange, handleBlur, touched, values, errors } =
  useFormik({
    initialValues: {
      userName: "",
      mail: "",
      password: ""
    },
    validationSchema: validationSchema3,
    onSubmit: (values) => {
      const userName = values.userName;
      const mail = values.mail;
      const password = values.password;
      const starRemaining = 5
      try {
        setShowMailErrorMessage(false);
        setShowUserNameErrorMessage(false);

        const q = query(collection(db, 'Users'),where("mail", "==", mail))
        const q2 = query(collection(db, 'Users'),where("userName", "==", userName))

        onSnapshot(q, (querySnapshot) => {
          if (querySnapshot.size === 1) {
            setShowMailErrorMessage(true);
          }
          else{
            onSnapshot(q2, (querySnapshot) => {
              if (querySnapshot.size === 1) {
                setShowUserNameErrorMessage(true);
              }
              else{
                setShowMailErrorMessage(false);
                setShowUserNameErrorMessage(false);
                addDoc(collection(db, "Users"), {
                  userName,
                  mail,
                  password,
                  starRemaining,
                  created: Timestamp.now(),
                });
                localStorage.setItem('userName', userName);
                localStorage.setItem('mail', mail);
                localStorage.setItem('starRemaining', starRemaining);
                dispatch(user());
                navigate("/");              
              }
            });
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
          <label>{t("RegisterPageFormInput1Title")}</label>
          <input
            className="form-control w-50"
            type="text"
            name="userName"
            value={values.userName}
            onChange={handleChange}
            autoComplete="off"
            onBlur={handleBlur} 
          />
         {errors.userName && touched.userName && (
            <span className="text-danger">{errors.userName}</span>
          )}
        </div>
        <br/>
        <div className="form-group">
          <label>{t("RegisterPageFormInput2Title")}</label>
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
          <label>{t("RegisterPageFormInput3Title")} </label>
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
        {showMailErrorMessage && <h6 className='text-danger'> {t("RegisterPageFormError1")}  </h6>}
        {showuserNameErrorMessage && <h6 className='text-danger'> {t("RegisterPageFormError2")}  </h6>}
        <button type="submit" className="btn btn-primary"> {t("RegisterPageFormButtonText")} </button>
      </form> 
      <div className="infoText">
        <div>
          {t("RegisterPageFormLowerInfo")}
          <Link to="/Login" className="AuthLink">
            <span> {t("RegisterPageFormLowerInfoLinkText")} </span>  
          </Link>
        </div>
      </div>
    </div>  
  );
}