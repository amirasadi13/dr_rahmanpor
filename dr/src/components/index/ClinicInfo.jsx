import React, {useState} from 'react';
import GoogleMapReact from 'google-map-react';
import axios from "axios";
 

const ClinicInfo = ({history}) =>{


    const [clinicInfo, setClinicInfo] = useState([])
    const token = localStorage.getItem("token")

    if (token === ''){
        history.replace('/')
    }

    if(clinicInfo.length === 0) {

        axios.get("https://drrahmatpour.com/api/clinic-info/", {
            headers: {
                'Authorization': 'Token ' + token
            }
        })
            .then(response => {
                console.log(response);
                setClinicInfo(response.data.data);
            })
            .catch(ex => {
                if (ex.message === 'Request failed with status code 401') {
                    localStorage.setItem("token", "")
                    localStorage.setItem("is_logged_in", false)
                    history.replace('/')
                }
            })

    }



    const defaultProps = {
        center: {
          lat: 59.95,
          lng: 10.33
        },
        zoom: 20
      };


    return(

        <div>
            <div className="IndexHeader">
                <p className="pt-4 px-4">
                    اطلاعات کلینیک
                </p>
            </div>

            <div className="IndexMainLayout">
                <div className="container">

                    <div className="row">
                    
                        <div className="col-md-7 mx-auto">
                        
                            <p className="pt-3">

                            <i class="fas fa-search-location"></i>

                                آدرس کلینیک

                            </p>
                            <p className="TextGray">
                                
                                {clinicInfo.address}

                            </p>

                            <div style={{ height: '40vh', width: '100%' }}>
                                <GoogleMapReact
                                bootstrapURLKeys={{ key: ''}}
                                defaultCenter={defaultProps.center}
                                defaultZoom={defaultProps.zoom}
                                >
                                </GoogleMapReact>
                            </div>
                            <div className="mt-5 mx-5">
                                <a href={'tel:'+clinicInfo.phone} className="ClinicCall px-5 py-3 text-light mt-5 d-block text-center text-decoration-none">
                                    تماس با کلینیک 
                                </a>
                            </div>
                        </div>
                    
                    </div>

                </div>
            </div>
        </div>


    );


}

export default ClinicInfo;