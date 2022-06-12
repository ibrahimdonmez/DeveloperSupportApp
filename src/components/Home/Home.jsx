import React, { useState, useEffect } from 'react'
import { GithubLinkedinUserList, LinkedinUserList } from '..'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { db } from '../../backend/firebase'
import ReactLoading from 'react-loading';
import "./Home.css"

export const Home = () => {
  const [linkedinUsers, setLinkedinUsers] = useState([]);
  const [githubLinkedinUsers, setGithubLinkedinUsers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'githubLinkedinUsers'), orderBy('starCount', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setGithubLinkedinUsers(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  }, [])

  useEffect(() => {
    const q = query(collection(db, 'linkedinUsers'), orderBy('created', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setLinkedinUsers(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  }, [])
  
  return (
    <div className='container'>
      {
        githubLinkedinUsers.length === 0 && linkedinUsers.length === 0 ? 
          <div className='h-full flex items-center justify-center'><ReactLoading type='spinningBubbles' color='black' height={50} width={50} /></div> 
          :
          <>
            <div className="Content">
              <h2 className=''>Github & Linkedin</h2>
              <span className=''><b className=''>{githubLinkedinUsers.length}</b> kişi</span>

              <div className='row'>
                {
                  githubLinkedinUsers.map((item, id) => <GithubLinkedinUserList key={id} {...item} />)
                }
              </div>
            </div>
            <div className="Content">
              <h2 className=''>Linkedin</h2> 
              <span className=''><b className=''>{linkedinUsers.length}</b> kişi</span>

              <div className='row'>
                {
                  linkedinUsers.map((item, id) => <LinkedinUserList key={id} {...item} />)
                }
              </div>
            </div>
          </>
      }
    </div>
  )
}

