
import { useState } from "react";
import actions from "../../../context/dispatch/actions";
import dispatch from "../../../context/dispatch/dispatch";
import formDispatch, { formStates } from "../../../context/dispatch/formStatus";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../../context/auth/actions";

export const useLogin = () => {
    const navigate = useNavigate();
    const authDisapatch=useDispatch();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [formState, setFormState] = useState("");
    const [message, setMessage] = useState("")
    const [payload, setPayload] = useState(null)
    const [disabled, setDisabled] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        formDispatch(formStates.loading, setFormState, setPayload);
        setMessage("")
        console.log(formData);
        setDisabled(true)

        const response = await dispatch(actions.login, {
            email: formData.email,
            password: formData.password
        });
        console.log(response);
        if (response?.status === "success") {
            setDisabled(false)
            formDispatch(formStates.success, setFormState, setPayload);
            setMessage("Login successful!");
            authDisapatch(setToken(response.token));
            window.location.reload();
        } else {
            setDisabled(false)
            formDispatch(formStates.failed, setFormState, setPayload);
            setMessage("Login failed!")
        }
    };

    return { handleInputChange, handleSubmit, formData, disabled, formState, message, payload };

}