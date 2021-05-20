import React, { useState } from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../images/icons8-stethoscope.svg';
import appointment_scheduling from '../images/icons8-appointment_scheduling.svg';
import axios from 'axios';
import Carousel from 'nuka-carousel';
import {Button, Modal} from "react-bootstrap";
import darkLogo from '../images/logo-dark2.png';

const Home = ({history}) => {

    const [educations, setEducations] = useState([])
    const [isActive, setIsActive] = useState(true)
    const token = localStorage.getItem("token");
    const [isIphone, setIsIphone] = useState(false);


    if(educations.length === 0){
        // setIsActive(true);
        axios.get("https://drrahmatpour.com/api/blog/posts", {
            headers:{
                'Authorization': 'Token ' + token
            }
        })
        .then(response => {
            setEducations(response.data.data.posts);
            setIsActive(false);
            // setState(1)
            // history.replace('/index')
        })
        .catch(ex =>
        {
            if (ex.message === 'Request failed with status code 401'){
                localStorage.setItem("token","")
                localStorage.setItem("is_logged_in", false)
                history.replace('/')
            }
        })
    }else {
        // setIsActive(false);
        // setState(1)
    }


    if (window.navigator.platform === 'iPhone' && isIphone === false){

        setIsIphone(true);

    }else if (window.navigator.platform === 'iPad' && isIphone === false){

        setIsIphone(true);

    }

    const install = () => {

        history.push('/install');

    }


    const [show, setShow] = useState(true);
    const handleClose = () => setShow(true);
    const handleShow = () => setShow(false);




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

            <div className="pt-3 container">

                {isIphone ? (
                <Modal show={show} onHide={handleClose} animation={true} centered>
                    <Modal.Body>
                        <p className="text-center">
                            <img src={ darkLogo } alt="logo"/>
                            نصب نسخه ios
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="Inputs px-3" variant="secondary" onClick={handleShow}>
                            بعدا
                        </Button>

                        <Button className="Inputs btn-danger px-3" variant="primary" onClick={install}>
                            نصب
                        </Button>
                    </Modal.Footer>
                </Modal>
                ) : null }


                <div className="row d-none d-md-block">
                    <div className="col-11 mx-auto h-50">
                        <Carousel className="">
                                {educations.map(item =>
                                    <div key={item.id} className="my-3 text-center ml-2 pb-5">
                                        <div>
                                            <img src={item.image_url} className="BannerImages" alt=""/>
                                            <p className="text-center my-2 px-2">
                                                {item.title}
                                            </p>
                                        </div>
                                    </div>
                                )}
                        </Carousel>

                        {/*<div className="scrolling-wrapper">*/}


                        {/*</div>*/}

                    </div>

                </div>

                <div className="row">

                    <div className="col-11 mx-auto mt-3">


                        <NavLink to="/book-categories" className="text-light text-decoration-none">
                            <div className="BannerPattern mx-md-5">
                                <h5 className="mx-5">
                                    <img src={logo} className="px-5 pb-2" alt=""/>
                                    <br/>
                                    دریافت نوبت آنلاین
                                </h5>
                            </div>
                        </NavLink>

                    </div>

                </div>


                <div className="row mt-md-3 mx-md-5">
                    <div className="col-5 mx-auto shadow pt-4 HomeButtons">
                        <NavLink className="text-dark text-decoration-none" to="/clinic-info">
                            <div className="py-4 rounded">
                                <img className="d-block mx-auto" src={appointment_scheduling} alt=""/>
                            </div>
                            <p className="text-center mt-3">
                                اطلاعات کلینیک
                            </p>
                        </NavLink>
                    </div>

                    <div className="col-5 mx-auto shadow pt-4 HomeButtons">
                        <NavLink className="text-dark text-decoration-none" to="/my-books">
                            <div className="py-4 rounded">
                                <img className="d-block mx-auto" src={appointment_scheduling} alt=""/>
                            </div>
                            <p className="text-center mt-3">
                                نوبت های من
                            </p>
                        </NavLink>
                    </div>
                </div>


                <div className="d-block d-md-none">
                    <p className="mx-3 mt-3">
                        آموزش ها
                    </p>
                    <div className="scrolling-wrapper">

                        {educations.map(item =>
                            <div key={item.id} className="card2 my-2 text-center ml-2">
                                <div>
                                    <img src={item.image_url} className="BannerImages" alt=""/>
                                    <p className="text-center my-2 px-2">
                                        {item.title}
                                    </p>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

            </div>

        );
    }

}

export default Home;