import React, { useState, useRef } from 'react';
import axios from 'axios';
import SimpleReactValidator from "simple-react-validator";
import Countdown from 'react-countdown';
import {useToasts} from "react-toast-notifications";


const ReciveCode = ({history}) => {

    const { addToast } = useToasts();
    const [code , setCode] = useState("")
    const [isActive, setIsActive] = useState(false)
    const [,forceUpdate] = useState();
    const token = localStorage.getItem("token");
    const mobile_number = localStorage.getItem("mobile_number");
    const [resend, setResend] = useState(false);


    if (token === null || token === ''){
        console.log('hello')
    }else {
        history.replace('/index');
    }

    const validator = useRef(new SimpleReactValidator({
        messages:{
            required:"وارد کردن کد الزامی می باشد",
            min:"کد وارد شده صحیح نمی باشد",
            max:"کد وارد شده صحیح نمی باشد"
        },
        element: message => <small className="TextGray mt-2 small"> {message} </small>
    }));


    const handleSubmit = event =>{
        event.preventDefault();
        setIsActive(true);
        const re_code = localStorage.getItem("code");
        const mobile_number = localStorage.getItem("mobile_number");
        const otp_token = localStorage.getItem("otp_token");

        const login = { code, mobile_number, otp_token };
        if (re_code === code){
            if(validator.current.allValid()) {
                axios.post('https://drrahmatpour.com/api/login/', JSON.stringify(login))
                    .then(response => {
                        localStorage.setItem("token", response.data.token);
                        localStorage.setItem("is_logged_in", true);
                        setIsActive(false);
                        history.replace("/index");
                    }).catch(ex => console.log(ex))
            }else {
                validator.current.showMessages("code");
                forceUpdate(1)
            }
        }



    }

    const completeTime = () => {

        addToast('زمان شما به پایان رسید', {
            appearance: 'error',
            autoDismiss: true,
        })
        setResend(true);

    }

    const resend_code = () => {

        const mobile_number = localStorage.getItem("mobile_number");
        const mobile_number_org = { mobile_number }
        console.log(JSON.stringify(mobile_number_org))
        axios.post('https://drrahmatpour.com/api/send-code/', JSON.stringify(mobile_number_org))
            .then(response => {
                console.log(response)
                localStorage.setItem("code", response.data.code);
                localStorage.setItem("otp_token", response.data.otp_token);
                localStorage.setItem("mobile_number", mobile_number);
                setResend(false);
                addToast('کد مجددا ارسال گردید', {
                    appearance: 'success',
                    autoDismiss: true,
                })
                forceUpdate(1);

            })
            .catch(ex => {
            //     addToast(ex.response.data.message.error, {
            //     appearance: 'error',
            //     autoDismiss: true,
            // })
            })

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

                <header className="LoginHeader fixed-top">
                </header>
                <div className="container text-center">


                    <div className="LoginMargin">
                        <h3 className="mt-5">
                            دکتر رحمت پور
                        </h3>
                        <p className="text-dark mt-5">
                            کد به شماره
                            { mobile_number }
                            پیامک شد
                        </p>
                        <hr/>
                        <p className="text-mute small">کد دریافتی را وارد نمایید</p>
                        <div className="row">
                            <div className="col-11 col-md-6 mx-auto">
                                <form className="form" onSubmit={handleSubmit}>
                                    <input className="Font-16 form-control py-4 Inputs" type="number"
                                           placeholder="کد دریافتی"
                                           value={code}
                                           name="code"
                                           onChange={e => {
                                               setCode(e.target.value);
                                               validator.current.showMessageFor("code");
                                           }}
                                    />
                                    {validator.current.message("code", code, "required|min:4|max:4")}
                                    <br/>
                                    <p className="text-right small mx-5">
                                        <div className="text-center">
                                        <Countdown
                                            date={Date.now() + 120000}
                                            onComplete={completeTime}
                                        />
                                        <br/>
                                            <p onClick={resend ? resend_code : null} style={resend ? {color:"black"} : {color:"gray"}}>
                                        ارسال مجدد کد
                                            </p>
                                        </div>
                                    </p>
                                    <button className="btn buttonGreen Inputs px-5 py-2">
                                        ورود
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
                <header className="ResiveHeaderBottom fixed-bottom">
                </header>

            </div>

        );
    }
}

export default ReciveCode;