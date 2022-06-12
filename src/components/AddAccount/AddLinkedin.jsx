import {React, useState} from "react";
import { collection, addDoc, Timestamp, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../backend/firebase";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { validationSchema } from "../../helper";

export const AddLinkedin = () => {
  let navigate = useNavigate();

  const [showLinkedinErrorMessage,setShowLinkedinErrorMessage] = useState(false);

  const { handleSubmit, handleChange, handleBlur, touched, values, errors } =
    useFormik({
      initialValues: {
        fullName: "",
        description: "",
        userName: "",
      },
      validationSchema,
      onSubmit: (values) => {
        const comIndex = values.userName.indexOf("com/in/");
        const newUserName = values.userName.slice(comIndex + 7);
        try {
          setShowLinkedinErrorMessage(false);
  
          const q = query(collection(db, 'linkedinUsers'),where("userName", "==", newUserName));
  
          onSnapshot(q, (querySnapshot) => {
            if (querySnapshot.size === 1) {
              setShowLinkedinErrorMessage(true);
            }
            else{
              setShowLinkedinErrorMessage(false);
              addDoc(collection(db, "linkedinUsers"), {
                userName: newUserName,
                description: values.description,
                fullName: values.fullName,
                created: Timestamp.now(),
              });
              navigate("/");
            }
          });
        } catch (err) {
          console.log(err);
        }
      },
    });

  return (
    <div className="container AccountContainer">
      <form onSubmit={handleSubmit} className="">
        <div className="">
          <span className="">Ad Soyad</span>
          <input
            className="form-control w-50"
            type="text"
            name="fullName"
            placeholder=""
            onChange={handleChange}
            values={values.fullName}
            autoComplete="off"
            onBlur={handleBlur}
          />
          {errors.fullName && touched.fullName && (
            <span className="text-danger">{errors.fullName}</span>
          )}
        </div>
        <br/>
        <div className="">
          <span className="">Profil linkin</span>
          <input
            className="form-control w-50"
            type="text"
            name="userName"
            placeholder="Profil linkin (Örn: www.linkedin.com/in/profile/)"
            onChange={handleChange}
            value={values.userName && values.userName}
            values={values.userName}
            autoComplete="off"
            onBlur={handleBlur}
          />
          {errors.userName && touched.userName && (
            <span className="text-danger">{errors.userName}</span>
          )}
        </div>
        <br/>
        <div className="">
          <span className="">İlgi Alanın</span>
          <input
            className="form-control w-25"
            type="text"
            name="description"
            placeholder="Örn: Front-End Developer"
            onChange={handleChange}
            values={values.description}
            autoComplete="off"
            onBlur={handleBlur}
          />
          {errors.description && touched.description && (
            <span className="text-danger">{errors.description}</span>
          )}
        </div>
        <br/>
        {showLinkedinErrorMessage && <h6 className="text-danger"> Bu Linkedin Hesabı Sistemde Zaten Kayıtlı </h6>}
        <button type="submit" className="btn btn-primary"> Kaydet </button>
      </form>

      <div className="infoText">
        <div>
          Eğer Github Hesabın da Varsa:
          <Link to="/add-github-linkedin" className="addAccountLink">
            <span> Github </span>
          </Link>
          Hesabını Kaydet
        </div>
      </div>
    </div>
  );
};
