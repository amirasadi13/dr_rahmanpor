import React, {useState} from 'react';
import axios from "axios";
import {Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";


const Profile = ({history}) => {

    const token = localStorage.getItem("token")
    const [profile, setProfile] = useState([]);
    const [fullName, setFullName] = useState('');


    const changeProfile = () => {

        const _fullName = { fullName }
        console.log(JSON.stringify(_fullName))
        axios.put("http://drrahmatpour.com/api/profile/", JSON.stringify(_fullName) ,{
            headers: {
                'Authorization': 'Token ' + token,
                'Content-Type':'application/json'
            }
        }).then(re => {
            console.log(re);
            setProfile(re.data);
            setFullName('');
        })
            .catch(ex => {
                if (ex.message === 'Request failed with status code 401') {
                    localStorage.setItem("token", "");
                    localStorage.setItem("is_logged_in", false);
                    history.replace('/');
                }
            })


    }


    if (profile.length === 0) {
        axios.get("http://drrahmatpour.com/api/profile/", {
            headers: {
                'Authorization': 'Token ' + token
            }
        }).then(re => {
            console.log(re);
            setProfile(re.data.data);
        })
            .catch(ex => {
                if (ex.message === 'Request failed with status code 401') {
                    localStorage.setItem("token", "");
                    localStorage.setItem("is_logged_in", false);
                    history.replace('/');
                }
            })
    }


    const logout = () => {

        axios.get("http://drrahmatpour.com/api/logout/", {
            headers:{
                'Authorization': 'Token ' + token
            }
        }).then(re => {
            localStorage.setItem("token","");
            localStorage.setItem("is_logged_in", false);
            history.replace('/');
        })
            .catch(ex => {
                if (ex.message === 'Request failed with status code 401'){
                    localStorage.setItem("token","");
                    localStorage.setItem("is_logged_in", false);
                    history.replace('/');
                }
            })


    }
    if (token === ''){
        history.replace('/')
    }


    const [isIphone , setIsIphone] = useState(false);
    if (window.navigator.platform === 'iPhone' && isIphone === false){

        setIsIphone(true);

    }

        return(
            <div>
                <div className="IndexHeader">
                    <p className="pt-4 px-4">
                        اطلاعات کاربری
                    </p>
                </div>

                <div className="IndexMainLayout">

                    <div className="container">
                        <div className="row">
                            <div className="col-11 col-md-6 mx-auto">
                                    <p className="mt-4 mx-3">
                                        <i className="fa fa-user-circle mr-3" aria-hidden="true"></i>
                                        اطلاعات کاربری
                                    </p>
                                    <hr className="mt-3"/>
                                <form className="form row">
                                    <input className="col-11 Inputs form-control py-4 mt-4 mx-auto" type="text"
                                           placeholder="نام و نام خانوادگی" value={fullName}
                                           onChange={e => setFullName(e.target.value)}/>
                                    <input className="col-11 Inputs form-control py-4 mt-4 mx-auto" type="number"
                                           placeholder="شماره موبایل" value={profile.phone} disabled                                                                    />
                                    <br/>
                                    <p onClick={changeProfile} className="btn buttonGreen px-5 Inputs col-11 col-md-3 mx-auto mt-4">
                                        ویرایش
                                    </p>
                                    <br/>
                                    <p onClick={logout} className="btn btn-secondary px-5 Inputs col-11 col-md-4 mx-auto mt-4">
                                        خروج از اکانت
                                    </p>
                                    { isIphone ?
                                    <NavLink className="btn btn-danger px-5 Inputs col-11 col-md-4 mx-auto mt-4" to="/install">
                                        نصب اپلیکیشن
                                    </NavLink>
                                        :
                                        null }

                                </form>
                            </div>
                        </div>
                    </div>


                </div>


            </div>


        );
}

export default Profile;
