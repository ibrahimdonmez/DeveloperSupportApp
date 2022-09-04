import {React, useState} from "react";
import { collection, addDoc, Timestamp, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../backend/firebase";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { validationSchema } from "../../helper";
import { useTranslation } from 'react-i18next';

export const AddLinkedin = () => {
  const { t } = useTranslation();

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
          <span className="">{t("AddLinkedinPageInput1Title")}</span>
          <input
            className="form-control w-50"
            type="text"
            name="fullName"
            placeholder={t("AddLinkedinPageInput1Info")}
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
          <span className="">{t("AddLinkedinPageInput2Title")}</span>
          <input
            className="form-control w-50"
            type="text"
            name="userName"
            placeholder={t("AddLinkedinPageInput2Info")}
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
          <span className="">{t("AddLinkedinPageInput3Title")}</span>
          <input
            className="form-control w-25"
            type="text"
            name="description"
            placeholder={t("AddLinkedinPageInput3Info")}
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
        {showLinkedinErrorMessage && <h6 className="text-danger"> {t("AddLinkedinPageFormError1")} </h6>}
        <button type="submit" className="btn btn-primary"> {t("AddLinkedinPageFormButtonText")} </button>
      </form>

      <div className="infoText">
        <div>
          {t("AddLinkedinPageFormLowerInfo")}
          <Link to="/add-github-linkedin" className="addAccountLink">
            <span> {t("AddLinkedinPageFormLowerLinkText")} </span>
          </Link>
          {t("AddLinkedinPageFormLowerInfoMore")}
        </div>
      </div>
    </div>
  );
};
