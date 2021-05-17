import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import BookCategoriesItems from './BookCategoriesItems';



const BookCategories = ({history}) => {


    const [ bookCategoriess, setBookCategoriess ] = useState([])
    const [isActive, setIsActive] = useState(true)
    const token = localStorage.getItem("token");
    const visit_time = localStorage.getItem("visit_time");
    const visit_date = localStorage.getItem("visit_date");

    if (visit_date !== null && visit_time){
        localStorage.setItem("visit_time",'')
        localStorage.setItem("visit_date",'')
        localStorage.setItem("patient_name",'')
    }

    if (token === ''){
        history.replace('/')
    }

    if(bookCategoriess.length === 0){
        axios.get("http://drrahmatpour.com/api/book/categories", {
            headers:{
                'Authorization': 'Token ' + token
            }
        }).then(re => {
            setBookCategoriess(re.data.data.categories);
            setIsActive(false)
        })
        .catch(ex => {
            if (ex.message === 'Request failed with status code 401'){
                localStorage.setItem("token","")
                localStorage.setItem("is_logged_in", false)
                history.replace('/')
            }
        })
    }

    console.log(bookCategoriess)

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

                    <p className="py-3 px-3 TextGray"> لطفا دلیل مراجعه به کلینیک را انتخاب نمایید </p>
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            {bookCategoriess.map(item => <BookCategoriesItems
                                image_url={item.image_url}
                                title={item.title}
                                key={item.id}
                                id={item.id}
                                hasOfflinePayment={item.hasOfflinePayment}
                                hasOnlinePayment={item.hasOnlinePayment}
                                cost={item.cost}
                            />)}
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default BookCategories;