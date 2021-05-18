import React, {useRef} from "react";
import axios from "axios";
import {PersonBoundingBox, Calendar2Week, Clock, ArrowLeftShort, ArrowRightShort} from 'react-bootstrap-icons';
import { useState } from "react";
import moment from "jalali-moment";
import SimpleReactValidator from "simple-react-validator";
import {useToasts} from "react-toast-notifications";




const NewBook = ({history}) => {

    const { addToast } = useToasts();

    const [days, setDays] = useState([]);
    const [activeHours, setActiveHours] = useState([])
    const [monthFaName, setMonthFaName] = useState("");
    const [,forceUpdate] = useState();
    const [isActive, setIsActive] = useState(true)
    const now_date = new Date();
    const fa_date = moment(now_date, 'YYYY/MM/DD').locale('fa').format('MM');
    const fa_year = moment(now_date, 'YYYY/MM/DD').locale('fa').format('YYYY');
    const [year, setYear] = useState(fa_year);
    const [thisMonth, setThisMonth] = useState(fa_date);
    const token = localStorage.getItem("token");
    const categoryName = localStorage.getItem("categoryName");
    const patient_name = localStorage.getItem("patient_name");
    localStorage.setItem("payment_method",'');

    const validator = useRef(new SimpleReactValidator({
        messages:{
            required:"وارد کردن نام و نام خانوادگی الزامی می باشد",
            min:"نام وارد شده صحیح نمی باشد"
        },
        element: message => <small className="text-danger mt-2 small"> {message} </small>
    }));

    const lastMonth = () => {

        if (thisMonth <= fa_date){
            console.log('this month is less than now ')
        }else {
            setIsActive(true)
            const now = Number(thisMonth);
            if (now === 1){
                const n = 12
                const y = Number(year) - 1 ;
                setThisMonth(n);
                setYear(y);
                setDays([]);
                console.log(thisMonth);
                console.log(year);
            }else {
                const n = now - 1
                setThisMonth(n);
                setDays([]);
                console.log(thisMonth);
            }
        }

    }


    const nextMonth = () => {
        setIsActive(true)
        const now_m = Number(thisMonth);
        if (now_m === 12){
            const n = 1
            const y = Number(year) + 1 ;
            setThisMonth(n);
            setYear(y);
            setDays([]);
            console.log(thisMonth);
            console.log(year);
        }else {
            const n = now_m + 1
            setThisMonth(n);
            setDays([]);
            console.log(thisMonth);
        }
    }


    if(days.length === 0) {
            // setThisMonth(fa_date);
            axios.get("https://drrahmatpour.com/api/active-book-days?month="+thisMonth+"&year="+year,
                {
                    headers: {
                        'Authorization': 'Token ' + token
                    }
                })
                .then(response => {
                    setDays(response.data.data.days);
                    setIsActive(false);
                    setMonthFaName(response.data.data.monthFaName);
                    setYear(response.data.data.year);
                })
                .catch(ex => {
                    if (ex.message === 'Request failed with status code 401') {
                        localStorage.setItem("token", "")
                        localStorage.setItem("is_logged_in", false)
                        history.replace('/')
                    }
                })
    }

    const changeBackground = (date) =>{

        for (let i = 0; i < days.length; i++) {

            const day = days[i]
            document.getElementById(day.date).style.backgroundColor = "";
            document.getElementById(day.date).style.color = "#000";

        }
        document.getElementById(date).style.backgroundColor = "#6653A7";
        document.getElementById(date).style.color = "#fff";
        localStorage.setItem("visit_date",date);
        axios.get("https://drrahmatpour.com/api/active-book-times?date=" + date,{
            headers:{
                'Authorization': 'Token ' + token
            }
        })
            .then(response => {
                setActiveHours(response.data.data.active_time);
            })
            .catch(ex => {
                if (ex.message === 'Request failed with status code 401'){
                    localStorage.setItem("token","")
                    localStorage.setItem("is_logged_in", false)
                    history.replace('/')
                }
            })

    }

    const selectTime = (time) => {

        for (let i = 0; i < activeHours.length; i++) {
            const active_time = activeHours[i]
            document.getElementById(active_time.time).style.backgroundColor = "";
            document.getElementById(active_time.time).style.color = "#000";
        }
        localStorage.setItem("visit_time",time);
        document.getElementById(time).style.backgroundColor = "#6653A7";
        document.getElementById(time).style.color = "#fff";

    }


    const submitDate = () => {
        const visit_time = localStorage.getItem("visit_time");
        const visit_date = localStorage.getItem("visit_date");
        if(validator.current.allValid()) {
            if (visit_time !== '' && visit_date){
                history.push('/book-payment')
            }else {
                addToast('لطفا روز و ساعت مراجعه را انتخاب نمایید', {
                    appearance: 'info',
                    autoDismiss: true,
                })
                console.log('choose a date')
            }
        }else {
            validator.current.showMessages("patient_name");
            forceUpdate(1)
        }
    }


    console.log(days)

    if (isActive === true){
        return(
            <div>
                <div className="IndexHeader">
                    <p className="pt-4 px-4">
                        نوبت گیری
                    </p>
                </div>

                <div className="IndexMainLayout">

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
                </div>
            </div>
        );
    }else {

        return (
            <div>
                <div className="IndexHeader">
                    <p className="pt-4 px-4">
                        نوبت گیری
                    </p>
                </div>

                <div className="IndexMainLayout">

                    <div className="container pt-4">

                        <div className="row">

                            <div className="col-md-6 mx-auto">

                                <p>
                                    <PersonBoundingBox className="mx-1"/>
                                    اطلاعات بیمار
                                </p>
                                <hr/>

                                <form className="form">

                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">نام و نام خانوادگی بیمار</label>
                                        <input className="py-3 form-control"
                                               style={{borderRadius: "1em"}}
                                               type="text"
                                               name="patient_name"
                                               placeholder="نام و نام خانوادگی"
                                               onChange={e =>
                                                   {
                                                       validator.current.showMessageFor("patient_name");
                                                       localStorage.setItem("patient_name", e.target.value);
                                                   }
                                               }
                                        />
                                        {validator.current.message("patient_name", patient_name, "required|min:5")}
                                    </div>

                                </form>

                                <p className="small TextGray">

                                    دلیل مراجعه :
                                    {categoryName}

                                </p>

                                <p>
                                    <Calendar2Week className="mx-2"/>
                                    تاریخ مراجعه
                                </p>
                                <hr/>

                                <p className="h5 text-center mt-2">
                                    <div className="d-flex justify-content-between">
                                        <h6 className="TextGray">
                                            <ArrowRightShort onClick={lastMonth} size={32}/>
                                        </h6>
                                        <h6>
                                            {monthFaName}
                                            -
                                            {year}
                                        </h6>
                                        <h6>
                                            <ArrowLeftShort onClick={nextMonth} size={32}/>
                                        </h6>
                                    </div>
                                </p>

                                <div className="scrolling-wrapper">

                                    {days.map(item =>
                                        <div id={item.date} key={item.id} className="card my-2 p-4 text-center mx-2"
                                             style={item.is_active ? {backgroundColor: "#fff"} : {backgroundColor: "#eee"}}>
                                            <div onClick={() =>
                                                changeBackground(item.date)}>
                                                <p>
                                                    {item.faDay}
                                                </p>
                                                <p>
                                                    {item.weekDay}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                </div>


                                <p className="mt-3">

                                    <Clock className="mx-1"/>
                                    ساعت مراجعه
                                    <hr/>
                                </p>


                                <div className="scrolling-wrapper">

                                    {activeHours.map(item =>
                                        <div id={item.time} onClick={() => selectTime(item.time)}
                                             className="card pt-2 px-3 text-center ml-2 w-25 my-2"
                                             style={item.is_active ? {backgroundColor: "#fff"} : {backgroundColor: "#eee"}}>
                                            <p>
                                                ساعت
                                                <br/>
                                                {item.time + 1}
                                                -
                                                {item.time}
                                            </p>
                                        </div>
                                    )}

                                </div>

                                <p className="buttonGreen px-5 mt-3 btn btn-block Inputs mb-5" onClick={submitDate}>
                                    بعدی
                                </p>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        );
    }

    
}

export default NewBook;