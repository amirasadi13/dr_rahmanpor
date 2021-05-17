import React, { useState, useRef } from 'react';
import axios from 'axios';
import SimpleReactValidator from "simple-react-validator";


const ReciveCode = ({history}) => {

    const [code , setCode] = useState("")
    const [isActive, setIsActive] = useState(false)
    const [,forceUpdate] = useState();
    const token = localStorage.getItem("token");

    if (token.length !== 0){
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

                <header className="LoginHeader">
                </header>
                <div className="container text-center">

                    <h3 className="mt-5">
                        دکتر رحمت پور
                    </h3>

                    <div className="LoginMargin">
                        <p className="text-dark">
                            کد به شماره 0912345678 پیامک شد
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
                                    <p className="text-right small mx-5">ارسال مجدد کد</p>
                                    <button className="btn buttonGreen Inputs px-5 py-2">
                                        ورود
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
                <header className="ResiveHeaderBottom">
                </header>

            </div>

        );
    }
}

export default ReciveCode;