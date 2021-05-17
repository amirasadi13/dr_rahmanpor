import React from 'react';
import moment from 'jalali-moment';
import { useState } from 'react';
import  {ArrowRepeat, Calendar2Week, PersonBadgeFill, CreditCard} from 'react-bootstrap-icons';
import axios from "axios";


const MyBooksItems = ({date, patient_name, payment_method_title, status_title, id, status_key, setIsActive, setMyBooks}) => {

    const [monthName , setMonthName] = useState("");
    const today = new Date();
    const get_today_fa = moment(today, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
    const day = moment(date, 'YYYY/MM/DD').locale('fa').format('DD');
    const month_num = moment(date, 'YYYY/MM/DD').locale('fa').format('MM');
    const visit_date =  moment(date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');

    const token = localStorage.getItem("token")

    const cancel = (id) => {

        setIsActive(true);
        setMyBooks([]);
        const cancel_json = 'cancel'

        axios.put("https://drrahmatpour.com/api/book/" + id + "/cancel",
            JSON.stringify(cancel_json)
            , {
            headers: {
                'Authorization': 'Token ' + token
            }
        })
            .then(response => {
                console.log(response)
            })
            .catch(ex => console.log(ex))

    }


    const getMonthName = (month_number) =>{

        console.log(month_number)
        switch (month_number) {
            case '01':
                setMonthName("فروردین");
                break;
            case '02':
                setMonthName("اردیبهشت");
                break;
            case '03':
                setMonthName("خرداد");
                break;
            case '04':
                setMonthName("تیر");
                break;
            case '05':
                setMonthName("مرداد");
                break;
            case '06':
                setMonthName("شهریور");
                break;
            case '07':
                setMonthName("مهر");
                break;
            case '08':
                setMonthName("آبان");
                break;
            case '09':
                setMonthName("آذر");
                break;
            case '10':
                setMonthName("دی");
                break;
            case '11':
                setMonthName("بهمن");
                break;
            default :
                setMonthName("اسفند");
                break;                                        
            
        }

    }

    if(monthName === ""){
        getMonthName(month_num);
    }


    return(


        <div className="container" onClick={() => cancel(id)}>


            <div className="row shadow mt-3" style={{borderRadius:"1em"}}>


                <div className="col-4" style={ status_key === 'canceled' || visit_date < get_today_fa ?  { backgroundColor:"#999", height:"200px", width:"30%", borderRadius:"1em", paddingTop:"50px", textAlign:"center" } : { backgroundColor:"#6653A7", height:"200px", width:"30%", borderRadius:"1em", paddingTop:"50px", textAlign:"center" } }>

                    <p className="text-light">
                        {day}
                        <hr className="bg-light" />
                        {monthName}
                    </p>

                </div>

                <div className="col-8 pt-3">

                    <p className="small">
                    <Calendar2Week className="mx-1"/>
                       تاریخ مراجعه :
                       <small>
                            {visit_date}

                        </small>

                    </p>

                    <p className="small">
                        <PersonBadgeFill className="mx-1" />
                        بیمار :
                        <small>

                           {patient_name}

                        </small>

                    </p>

                    <p className="small">
                        <CreditCard className="mx-1"/>
                        وضعیت پرداخت :
                        <small>

                           {payment_method_title}
                        </small>

                    </p>

                    <p className="small">
                        <ArrowRepeat className="mx-1" />
                        وضعیت :
                        <small>

                           {status_title}
                        </small>

                    </p>
                    {status_key === 'canceled' || visit_date < get_today_fa ?
                        null
                        :
                        (
                            <button className="btn btn-danger btn-sm px-5 btn-block" style={{borderRadius: "1em"}}>
                                <small>
                                    لغو
                                </small>
                            </button>)
                    }

                </div>

            </div>


        </div>


    );

}

export default MyBooksItems;