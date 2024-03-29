import React, { useEffect, useState } from "react";
import { AiFillStar } from 'react-icons/ai';
import { collection, updateDoc, doc, query, where, onSnapshot} from "firebase/firestore";
import { db } from "../../backend/firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { user } from "../../stores/UserSlice";
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

export const GithubLinkedinUserList = ({ data: { github, linkedin, starCount, userName, starEnabled } }) => {
  const { t } = useTranslation();

  const [gitData, setGitData] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [githubLinkedinInfo, setGithubLinkedinInfo] = useState({});

  const dispatch = useDispatch();
  const User = useSelector(state => state.user);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`https://api.github.com/users/${github}`);
      let response = await data.json();
      setGitData(response);
    };
    fetchData();
  }, [github]);

  const {
    avatar_url,
    name,
    bio,
    followers,
    following,
    location,
    company
  } = gitData;

  if (gitData.length === 0) {
    return <div></div>;
  }

  const userBio = (str) => {
    if (str) {
      const strLen = str.split("").length;
      if (strLen > 80) {
        return str.substring(0, 80) + "...";
      } else {
        return str;
      }
    }
  };

  function giveStar(e) {
    e.preventDefault();

    const q = query(collection(db, 'Users'),where("userName", "==", User.userName),where("mail", "==", User.mail));

    onSnapshot(q, (querySnapshot) => {
      setUserInfo(querySnapshot.docs[0]);
    });

    if(userInfo.data().starRemaining - 1 !== -1) {
      updateDoc(doc(db,"Users", userInfo.id), {
        starRemaining: userInfo.data().starRemaining - 1
      });  

      const q2 = query(collection(db, 'githubLinkedinUsers'),where("github", "==", github), where("linkedin", "==", linkedin));
      onSnapshot(q2, (querySnapshot) => {
        setGithubLinkedinInfo(querySnapshot.docs[0]);
      });

      let starCount = githubLinkedinInfo.data().starCount + 1;
      updateDoc(doc(db,"githubLinkedinUsers", githubLinkedinInfo.id), {
        starCount: starCount
      });

      localStorage.setItem('starRemaining', localStorage.getItem("starRemaining") - 1 < 0 ? 0 : localStorage.getItem("starRemaining") - 1);
      dispatch(user());
    }
    else{
      toast.error(t("HomePageRateErrorLimitExceeeded"));
    }

  }

  var errorText = "";
  
  if(User.userName === null){
    errorText = t("HomePageRateError1") ;
  }
  else if(userName === User.userName) {
    errorText = t("HomePageRateError2") ;
  }
  else if (starEnabled === false) {
    errorText = t("HomePageRateError3") ;
  }

  return (
    <div className="col-xlg-2 col-lg-3 col-md-6 col-sm-12"> 
      <ToastContainer position="top-right" autoClose={3000}/>
      <div className="card">
        {User.userName !== null && userName !== User.userName && starEnabled === true ? 
          <span className="starIconSpan" onClick={giveStar}>
            <AiFillStar className="starIcon" color="#26c933" fontSize="2em" /> <b>{starCount}</b>
          </span>
          :
          <span className="starIconSpan">
            <AiFillStar className="starIcon" color="gray" fontSize="2em" onClick={() => toast.warn(errorText)} /> <b>{starCount}</b>
          </span>
        }
        <img className="card-img-top" src={avatar_url} alt={name}/>
        <div className="card-body text-center">
          <h5 className="card-title">{name}</h5>
          <p className="card-text bio">Bio: {userBio(bio)}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><b>{t("HomePageList1CardInfo1")}</b> {followers} {t("HomePageList1TitleLowerInfo")}</li>
          <li className="list-group-item"><b>{t("HomePageList1CardInfo2")}</b> {following} {t("HomePageList1TitleLowerInfo")}</li>
          <li className="list-group-item"><b>{t("HomePageList1CardInfo3")} {location}</b></li>
          <li className="list-group-item card-company"><b>{t("HomePageList1CardInfo4")}  {company}</b></li>
        </ul>
        <div className="card-body text-center">
          <a href={`https://github.com/${github}`} className="card-link btn btn-primary" target="_blank" rel="noopener noreferrer">Github</a>
          <a href={`https://www.linkedin.com/in/${linkedin}`} className="card-link btn btn-primary" target="_blank" rel="noopener noreferrer">Linkedin</a>
        </div>
      </div>
    </div>
  );
};
