import { useParams } from "react-router";
import OTPVerification from "../components/OTPVerification";

const EmailVerification = () => {
    const {email}=useParams();
    return ( 
        <OTPVerification email={email}/>
     );
}
 
export default EmailVerification;