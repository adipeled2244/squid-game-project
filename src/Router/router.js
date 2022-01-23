import React from 'react';
import {Routes,Route} from 'react-router-dom';
import IdeasList from '../Components/IdeasList';
import MyIdeas from '../Components/MyIdeas';
import Header from '../Components/Header/header';

const ReactRouter=()=>{
    return(
        <React.Fragment>
           <Header/>
           <Routes>
                <Route exact path="/" element={<IdeasList/>}/>
                <Route  path="/MyIdeas" element={<MyIdeas/>}/>
            </Routes>
        </React.Fragment>
    )
}

export default ReactRouter;