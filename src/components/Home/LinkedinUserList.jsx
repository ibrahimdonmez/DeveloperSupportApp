import React from 'react'

export const LinkedinUserList = ({data:{userName,description,fullName}}) => {
    return (
        <div className="col-xlg-2 col-lg-3 col-md-4 col-sm-6">
            <div className="card text-center">
                <div className="card-body">
                    <h5 className="card-title">{fullName}</h5>
                    <p className="card-text">{description}</p>
                    <a href={`https://tr.linkedin.com/in/${userName}`} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                        Linkedin
                    </a>
                </div>
            </div>
        </div>
    )
}