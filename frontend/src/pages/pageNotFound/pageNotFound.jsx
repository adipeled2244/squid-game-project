import './pageNotFound.css'
import pageNotFoundImg from './404.png'
import React from 'react';

export function PageNotFound() {    
    return <section className="page-not-found">
                <div className="container">
                        <img src={pageNotFoundImg} alt="" />
                </div>
            </section> 
}

