import React, {useRef, useState} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import {useToasts} from "react-toast-notifications";


const SendCode = ({history}) => {

    const { addToast } = useToasts();
    const [mobile_number, setMobileNumber] = useState("")
    const [isActive, setIsActive] = useState(false)
    const [,forceUpdate] = useState();
    const token = localStorage.getItem("token");

    const validator = useRef(new SimpleReactValidator({
        messages:{
            required:"وارد کردن شماره تماس الزامی می باشد",
            min:"شماره وارد شده صحیح نمی باشد"
        },
        element: message => <small className="TextGray mt-2 small"> {message} </small>
    }));

    if (token === null || token === ''){
        console.log('hello')
    }else {
        history.replace('/index');
    }

    const handleSubmit = event =>{
        event.preventDefault();
        setIsActive(true);
        const mobile_number_org = { mobile_number };

        if(validator.current.allValid()) {
            axios.post('https://drrahmatpour.com/api/send-code/', JSON.stringify(mobile_number_org))
                .then(response => {
                    localStorage.setItem("code", response.data.code);
                    localStorage.setItem("otp_token", response.data.otp_token);
                    localStorage.setItem("mobile_number", mobile_number);
                    setIsActive(false);
                    history.push("/recive-code")
                })
                .catch(ex => {
                    // addToast(ex.response.data.message.error, {
                    //     appearance: 'error',
                    //     autoDismiss: true,
                    // })
                })
        }else {
            validator.current.showMessages("phone");
            forceUpdate(1)
        }
    }

    if (isActive === true){
        return(
        <div className="LoadingBackground text-center">
                <div className="spinner-grow h5 text-center" role="status">
                    <span className="sr-only d-block">Loading...</span>
                </div>
                <div className="spinner-grow h5 text-center" role="status">
                    <span className="sr-only d-block">Loading...</span>
                </div>
                <div className="spinner-grow h5 text-center" role="status">
                    <span className="sr-only d-block">Loading...</span>
                </div>
        </div>
        );
    }else {
        return (

            <div>
                <div className="HeaderGrayBackground">
                    <header className="LoginHeader fixed-top">
                    </header>
                </div>


                <div className="container text-center mt-5">
                    <div className="LoginMargin">
                        <h3 className="Title mt-5">
                            دکتر رحمت پور
                        </h3>
                        <p className="text-mute mt-3">برای ورود شماره موبایل خود را وارد کنید</p>
                        <div className="row">
                            <div className="col-11 col-md-6 mx-auto">
                                <form className="form" onSubmit={handleSubmit}>
                                    <input className="Font-16 form-control py-4 Inputs" type="number"
                                           placeholder="شماره موبایل"
                                           name="phone"
                                           value={mobile_number}
                                           onChange={e => {
                                               setMobileNumber(e.target.value);
                                               validator.current.showMessageFor("phone");
                                           }}/>
                                    {validator.current.message("phone", mobile_number, "required|min:11|max:11|phone")}
                                    <br/>
                                    <button className="btn Inputs px-5 py-2 buttonGreen">
                                        ورود / ثبت نام
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <header className="LoginHeaderBottom fixed-bottom">
                </header>

            </div>
        );
    }

}

export default withRouter(SendCode);