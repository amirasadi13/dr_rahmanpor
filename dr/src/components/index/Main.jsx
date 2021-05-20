import Index from "./Index";
import BookCategories from "../book-categories/BookCategories";
import ClinicInfo from "./ClinicInfo";
import NewBook from "../books/NewBook";
import MyBooks from "../books/MyBooks";
import PaymentBook from "../books/PaymentBook";
import { Switch, Route } from 'react-router-dom';
import BottomMenu from "./BottomMenu";
import React from "react";
import Profile from "../commans/Profile";
import SuccessReserve from "../books/SuccessReserve";



const Main = () => {

    const is_active = localStorage.getItem("is_logged_in")
    let is_show = true

    if (is_active === 'false'){
        is_show = false
    }

    return (
        <div className = "rtl" >
            <switch >
                <Route path = "/index" exact component = { Index }/>
                <Route path= "/my-profile" component={ Profile }/>
                <Route path= "/book-categories" component={BookCategories}/>
                <Route path= "/clinic-info" component={ClinicInfo}/>
                <Route path= "/my-books" component={MyBooks}/>
                <Route path= "/new-book" component={NewBook}/>
                <Route path= "/book-payment" component={PaymentBook}/>
                <Route path= "/success" component={SuccessReserve}/>
            </switch >
            { is_show ? (<BottomMenu/>) : null}
        </div>
    );
}

export default Main;