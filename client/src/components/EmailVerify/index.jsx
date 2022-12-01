import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import success from '../../images/success.png';
import styles from './styles.module.css';

const EmailVerify = () => {
    const [validUrl,setValidUrl] = useState(false);
    const param = useParams();
    useEffect(()=>{
        const verifyEmail = async() => {
            try{
                const url = `http://localhost:8080/api/users/${param.id}/verify/${param.token}`;
                const {data} = await axios.get(url);
                console.log(data);
                setValidUrl(true);
            }
            catch(error){
                console.log(error)
                setValidUrl(false)
            }
        };
        verifyEmail()
    },[param]);
    return(
        <Fragment>
            {validUrl ? (
                <div className={styles.container}>
                    <img src={success} alt="success_img" className={styles.success_img} />
                    <h1>Email verified successfully</h1>
                    <Link to="/login">
                        <button className={styles.green_btn}>Login</button>
                    </Link>
                </div>
            ):(
                <h1>404 not found</h1>
            )}
        </Fragment>
    )
};
export default EmailVerify;