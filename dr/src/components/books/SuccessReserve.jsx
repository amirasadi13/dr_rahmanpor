import React, {useState} from "react";
import {ArrowRepeat, Calendar2Week, CreditCard, PersonBadgeFill} from "react-bootstrap-icons";
import axios from "axios";
import moment from "jalali-moment";
import {NavLink} from "react-router-dom";


const SuccessReserve = ({history}) => {

    const [newVisit, setNewVisit] = useState({});
    const [data, setData] = useState(false);
    const token = localStorage.getItem('token');
    const id = localStorage.getItem("saved_visit");
    const [visitDateFa,setVisitDateFa] = useState('');

    axios.get("https://drrahmatpour.com/api/book/" + id, {
        headers: {
            'Authorization': 'Token ' + token,
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (data === false) {
            setNewVisit(response.data.data[0]);
            setVisitDateFa(moment(response.data.data[0].visit_date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'));
            setData(true);
            // setData(true);
        }
        console.log(visitDateFa);
    })
        .catch(ex => {
            if (ex.message === 'Request failed with status code 401') {
                localStorage.setItem("token", "")
                localStorage.setItem("is_logged_in", false)
                history.replace('/')
            } else {

            }
        })

    // console.log(newVisit)

    return(

        <div>
            <div className="IndexHeader">
                <p className="pt-4 px-4">

                    رسید تعیین نوبت

                </p>
            </div>

            <div className="IndexMainLayout">

                <div className="container pt-3">

                    <div className="row">

                        <div className="col-md-6 mx-auto">

                            <div className="alert alert-success mt-2 py-5 text-center text-light">

                                دریافت نوبت شما با موفقیت انجام شد.

                            </div>

                            <div className="shadow rounded mt-2">

                                <div className="p-3">

                                    <p className="small">
                                        <Calendar2Week className="mx-1"/>
                                        تاریخ مراجعه :
                                        {visitDateFa}
                                    </p>

                                    <p className="small">
                                        <PersonBadgeFill className="mx-1" />
                                        بیمار :
                                        {newVisit.patient_name}

                                    </p>

                                    <p className="small">
                                        <CreditCard className="mx-1"/>
                                        وضعیت پرداخت :
                                        {newVisit.payment_method_title}
                                    </p>

                                    <p className="small">
                                        <ArrowRepeat className="mx-1" />
                                        وضعیت :
                                        {newVisit.status_title}
                                    </p>

                                </div>

                            </div>

                            <NavLink to="/index" className="buttonGreen px-5 mt-3 btn btn-block Inputs mb-5">
                                بازگشت
                            </NavLink>


                        </div>

                    </div>

                </div>
            </div>


        </div>



    );

}
export default SuccessReserve;