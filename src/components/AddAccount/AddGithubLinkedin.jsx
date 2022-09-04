import {React, useState} from "react";
import { collection, addDoc, Timestamp, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../backend/firebase";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { validationSchema2 } from "../../helper";
import "./AddAccount.css";
import { MdNotificationImportant } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export const AddGithubLinkedin = () => {
  const { t } = useTranslation();

  let navigate = useNavigate();
  const User = useSelector(state => state.user);

  const [showGithubErrorMessage,setShowGithubErrorMessage] = useState(false);
  const [showLinkedinErrorMessage,setShowLinkedinErrorMessage] = useState(false);

  const { handleSubmit, handleChange, handleBlur, touched, values, errors } =
    useFormik({
      initialValues: {
        linkedin: "",
        github: "",
        userName: User.userName == null ? "" : User.userName,
        starEnabled: User.userName == null ? false : true,
        starCount: 0
      },
      validationSchema: validationSchema2,
      onSubmit: (values) => {
        const comIndex = values.linkedin.indexOf("com/in/");
        const linkedin = values.linkedin.slice(comIndex + 7);
        const comIndex2 = values.github.indexOf("github.com/");
        const github = values.github.slice(comIndex2 + 11);
        const userName = values.userName;
        const starEnabled = values.starEnabled;
        const starCount = values.starCount;

        try {
          setShowGithubErrorMessage(false);
          setShowLinkedinErrorMessage(false);
  
          const q = query(collection(db, 'githubLinkedinUsers'),where("linkedin", "==", linkedin));
          const q2 = query(collection(db, 'githubLinkedinUsers'),where("github", "==", github));
  
          onSnapshot(q, (querySnapshot) => {
            if (querySnapshot.size === 1) {
              setShowLinkedinErrorMessage(true);
            }
            else{
              onSnapshot(q2, (querySnapshot) => {
                if (querySnapshot.size === 1) {
                  setShowGithubErrorMessage(true);
                }
                else{
                  setShowLinkedinErrorMessage(false);
                  setShowGithubErrorMessage(false);
                  addDoc(collection(db, "githubLinkedinUsers"), {
                    linkedin,
                    github,
                    userName,
                    starEnabled,
                    starCount,
                    created: Timestamp.now(),
                  });
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
    <div className="container AccountContainer">
      <form onSubmit={handleSubmit} className="">
        <div className="form-group">
          <label>{t("AddGithubLinkedinPageInput1Title")}</label>
          <input
            className="form-control w-50"
            type="text"
            name="linkedin"
            placeholder={t("AddGithubLinkedinPageInput1Info")}
            onChange={handleChange}
            value={values.linkedin && values.linkedin}
            values={values.linkedin}
            autoComplete="off"
            onBlur={handleBlur} 
          />
          {errors.linkedin && touched.linkedin && (
            <span className="text-danger">{errors.linkedin}</span>
          )}
        </div>
        <br/>
        <div className="form-group">
          <label>{t("AddGithubLinkedinPageInput2Title")}</label>
          <input
            className="form-control w-50"
            type="text"
            name="github"
            placeholder={t("AddGithubLinkedinPageInput2Info")}
            onChange={handleChange}
            value={values.github && values.github}
            values={values.github}
            autoComplete="off"
            onBlur={handleBlur}
          />
          {errors.github && touched.github && (
            <span className="text-danger">{errors.github}</span>
          )}
        </div>
        {User.userName === null && 
          <div>
            <h6 className="text-danger"><MdNotificationImportant color="gray"/>
              {t("AddGithubLinkedinPageFormWarningText")}
              <Link to="/Register" className="AuthLink">
                <span> {t("AddGithubLinkedinPageFormWarningLinkText")} </span>  
              </Link>
            </h6>               
          </div>
        }
       <br/>
        {showGithubErrorMessage && <h6 className="text-danger"> {t("AddGithubLinkedinPageFormError1")} </h6>}
        {showLinkedinErrorMessage && <h6 className="text-danger"> {t("AddGithubLinkedinPageFormError2")} </h6>}
        <button type="submit" className="btn btn-primary"> {t("AddGithubLinkedinPageFormButtonText")} </button>
      </form>

      <div className="infoText">
        <div>
          {t("AddGithubLinkedinPageFormLowerInfo")}
          <Link to="/add-linkedin" className="addAccountLink">
             <span> {t("AddGithubLinkedinPageFormLowerLinkText")} </span>  
          </Link>
          {t("AddGithubLinkedinPageFormLowerInfoMore")}
        </div>
      </div>
    </div>
  );
};
