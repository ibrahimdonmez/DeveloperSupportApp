import React from 'react'

export const LinkedinUserList = ({data:{userName,description,fullName}}) => {
    return (
        <div className="col-md-3">
            <div className="card text-center">
                <div className="card-body">
                    <h5 className="card-title">{fullName}</h5>
                    <p className="card-text">{description}</p>
                    <a href={`https://tr.linkedin.com/in/${userName}`} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                        Profili Görüntüle
                    </a>
                </div>
            </div>
        </div>
    )
}