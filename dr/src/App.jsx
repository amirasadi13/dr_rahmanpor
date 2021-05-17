import './App.css';
import SendCode from './components/authenticate/SendCode';
import ReciveCode from './components/authenticate/ReciveCode';
import Index from './components/index/Index';
import BookCategories from './components/book-categories/BookCategories';
import ClinicInfo from './components/index/ClinicInfo';
import NewBook from './components/books/NewBook';
import MyBooks from './components/books/MyBooks';
import PaymentBook from "./components/books/PaymentBook";
import { Switch, Route} from 'react-router-dom';
import BottomMenu from "./components/index/BottomMenu";
import React from "react";
import Profile from "./components/commans/Profile";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import SuccessReserve from "./components/books/SuccessReserve";
import {ToastProvider} from "react-toast-notifications";
import Main from "./components/index/Main";

function App() {

    const is_active = localStorage.getItem("is_logged_in")
    let is_show = true

    if (is_active === 'false'){
        is_show = false
    }
    console.log(is_show)

    return (
        <ToastProvider>
            <div className = "rtl mb-5 pb-3">
                <Switch >
                    <Route path = "/" exact component = { SendCode }/>
                    <Route path = "/recive-code" component = { ReciveCode }/>
                    <Main/>
                </Switch>
            </div>
        </ToastProvider>
    );
}
export default App;