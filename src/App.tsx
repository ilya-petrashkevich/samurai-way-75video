import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Route} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";

function App() {

    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <HeaderContainer/>

                <Navbar/>

                <div className="app-wrapper-content">

                    <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>

                    <Route path="/dialogs" render={() => <DialogsContainer/>}/>

                    <Route path="/users" render={() => <UsersContainer/>}/>

                    <Route path="/news" render={() => <News/>}/>

                    <Route path="/music" render={() => <Music/>}/>

                    <Route path="/settings" render={() => <Settings/>}/>

                    <Route path="/login" render={() => <Login/>}/>

                </div>
            </div>
        </BrowserRouter>)
}

// применять можно роут или с component со ссылкой на функцию component={Profile} (компонент) или render со ссылкой на компонент render={() => <Profile/>} стрелочная функция внутри {} обязательно

export default App;
