import React from 'react'
import Register from './Register';
import Generate from './Generate';

function EmailGenerate() {
    return (
        <>
        <div className="myemailcard"> 
            <div className="card email_card">
                <div className="computer">
                    <img src="https://media.giphy.com/media/l0HlNaQ6gWfllcjDO/giphy.gif" alt="computer" width="350px" height="500px"/>
                </div>
                <div className="div_tabs">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="generate-tab" data-toggle="tab" href="#generateEmail" role="tab" aria-controls="home" aria-selected="true">Generate Email</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="register-tab" data-toggle="tab" href="#register" role="tab" aria-controls="profile" aria-selected="false">New Employee</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade" id="register" role="tabpanel" aria-labelledby="register-tab">
                            <Register/>
                        </div>
                        <div className="tab-pane fade show active " id="generateEmail" role="tabpanel" aria-labelledby="generate-tab">
                            <Generate/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default EmailGenerate


