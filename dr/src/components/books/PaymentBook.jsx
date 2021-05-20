import React, {useState} from "react";
import chash from '../images/icons8-receive_euro.svg';
import online from '../images/icons8-check_for_payment.svg';
import axios from "axios";
import { useToasts } from 'react-toast-notifications';
import {ArrowLeftShort} from "react-bootstrap-icons";
import {NavLink} from "react-router-dom";


const PaymentBook = ({history}) => {

    const { addToast } = useToasts();

    const cost = localStorage.getItem("cost")
    const token = localStorage.getItem("token")
    const hasOnlinePayment = localStorage.getItem("hasOnlinePayment");
    const hasOfflinePayment = localStorage.getItem("hasOfflinePayment");
    const [ hasOfflinePaymentSelected , setHasOfflinePaymentSelected] = useState(false);

        if (token === ''){
            history.replace('/')
        }

    const setPaymentMethod = (id) =>{

        if (id === 1) {
            document.getElementById(id).style.backgroundColor = "#6653A7";
            document.getElementById(id).style.color = "#fff";
            document.getElementById("2").style.backgroundColor = "#fff";
            document.getElementById("2").style.color = "#000";
            localStorage.setItem("payment_method", id);
            setHasOfflinePaymentSelected(true);

        } else if (id === 2) {
            document.getElementById("1").style.backgroundColor = "#fff";
            document.getElementById("1").style.color = "#000";
            document.getElementById(id).style.backgroundColor = "#6653A7";
            document.getElementById(id).style.color = "#fff";
            localStorage.setItem("payment_method", id);
            setHasOfflinePaymentSelected(false);
        }

    }

    const submitVisitRequest = () => {

        const category = Number(localStorage.getItem("category"));
        const patient_name = localStorage.getItem("patient_name");
        const visit_date = localStorage.getItem("visit_date");
        const visit_time = Number(localStorage.getItem("visit_time"));
        const payment_method = Number(localStorage.getItem("payment_method"));
        const token = localStorage.getItem("token");
        const book = { category, patient_name , visit_date, visit_time, payment_method}

        console.log(JSON.stringify(book))

        if (payment_method) {
            axios.post("https://drrahmatpour.com/api/books/", JSON.stringify(book), {
                headers: {
                    'Authorization': 'Token ' + token,
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.status === 200) {
                    localStorage.setItem("saved_visit",response.data.data.id);
                    history.replace('/success')
                } else {
                    console.log(response.status)
                }
            })
                .catch(ex => {
                    if (ex.message === 'Request failed with status code 401') {
                        localStorage.setItem("token", "")
                        localStorage.setItem("is_logged_in", false)
                        history.replace('/')
                    } else {
                        console.log(ex.response.data.message.error)
                        addToast(ex.response.data.message.error, {
                            appearance: 'error',
                            autoDismiss: true,
                        })
                    }
                })
        }else {
            addToast('لطفا روش پرداخت را انتخاب نمایید', {
                appearance: 'error',
                autoDismiss: true,
            })
        }

    }

    return(

        <div>
            <div className="IndexHeader d-flex justify-content-between">
                <p className="pt-4 px-4">
                   پرداخت
                </p>
                <NavLink to="/book-categories" className="mt-4 mx-3 text-decoration-none text-dark">
                    <ArrowLeftShort className="bg-light text-dark rounded-circle" size={32}/>
                </NavLink>
            </div>

            <div className="IndexMainLayout">

                <div className="container pt-3">

                    <div className="row">

                        <div className="col-md-6 mx-auto">

                            <p>

                                پرداخت

                            </p>

                            <hr/>

                            <div className="row">

                                { hasOnlinePayment ? ( <div className="col-5 mx-auto shadow pt-4 HomeButtons" id="1" onClick={() => setPaymentMethod(1)}>
                                    <div className="py-4 rounded">
                                        <img className="d-block mx-auto py-3" src={online} alt=""/>
                                    </div>
                                    <p className="text-center mt-3 small">
                                        پرداخت انلاین
                                    </p>
                                </div>) : null}

                                { hasOfflinePayment ? (<div className="col-5 mx-auto shadow pt-4 HomeButtons" id="2" onClick={() => setPaymentMethod(2)}>
                                    <div className="py-4 rounded">
                                        <img className="d-block mx-auto py-3" src={chash} alt=""/>
                                    </div>
                                    <p className="text-center mt-3 small">
                                        پرداخت در هنگام مراجعه
                                    </p>
                                </div>) : null}

                            </div>

                            { hasOfflinePaymentSelected ? (
                                <div className="d-block text-center mt-4">

                                    <p>

                                        مبلغ پیش پرداخت

                                    </p>
                                    <p>
                                        {cost.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                        <small className="mx-1">
                                            تومان
                                        </small>
                                    </p>
                                </div>
                            ) : <div className="d-block text-center mt-4">


                                <p className="small">
                                    شما هرینه را در هنگام مراجعه پرداخت خواهید کرد. برای نهایی کردن نوبت دکمه زیر را فشار دهید.
                                </p>
                            </div>}

                            <button className="buttonGreen px-5 mt-5 btn btn-block Inputs" onClick={submitVisitRequest}>
                                پرداخت
                            </button>



                        </div>

                    </div>

                </div>

            </div>


        </div>

    );


}

export default PaymentBook;
