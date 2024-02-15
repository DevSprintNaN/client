import { useState } from 'react';
import actions from '../../../context/dispatch/actions';
import dispatch from '../../../context/dispatch/dispatch';
import formDispatch, { formStates } from '../../../context/dispatch/formStatus';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../../context/auth/actions';
import { useDispatch } from 'react-redux';

export const useRegister=()=>{
    const navigate=useNavigate();
    const authDisapatch=useDispatch();
    const [formData, setFormData] = useState({
        username:"",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [disabled, setDisabled] = useState(false)
    const [formState, setFormState] = useState("");
    const [message, setMessage] = useState("")
    const [payload, setPayload] = useState(null)


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'password' || name === 'confirmPassword') {
            const password = document.getElementById('password').value
            const confirmPassword = document.getElementById('confirmPassword').value

            if (password.length < 8 || password.length > 20) {
                formDispatch(formStates.invalid, setFormState, setPayload);
                setDisabled(true)
                setMessage('Password must be between 8 and 20 characters long.');
                return
            }

            if (!/[A-Z]/.test(password) || !/\d/.test(password)) {
                formDispatch(formStates.invalid, setFormState, setPayload);
                setMessage('Password must contain at least one uppercase letter and one numeric character.');
                setDisabled(true)
                console.log(password)
                return
            }

            if (password === confirmPassword) {
                setDisabled(false)
                setMessage('')
                formDispatch(formStates.default, setFormState, setPayload);
            } else {
                setDisabled(true)
                formDispatch(formStates.invalid, setFormState, setPayload);
                setMessage("Password and confirm password values don't match!")
            }

            if(username==="" || email=="" || password==="" || confirmPassword===""){
                setDisabled(true)
                formDispatch(formStates.invalid, setFormState, setPayload);
                setMessage("All fields are required")
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        formDispatch(formStates.loading, setFormState, setPayload);
        setMessage("")
        console.log(formData);
        setDisabled(true)

        const response = await dispatch(actions.register, {
            username: formData.username,
            email: formData.email,
            password: formData.password
        });
        console.log(response);

        if (response?.message==="User created successfully") {
            setDisabled(false)
            authDisapatch(setToken(response.token));
            formDispatch(formStates.success, setFormState, setPayload);
            setMessage("Registration successful!")
            window.location.reload();
        } else {
            setDisabled(false)
            formDispatch(formStates.failed, setFormState, setPayload);
            setMessage("Registration failed!")
        }
    };

    return {handleInputChange,handleSubmit,formData,disabled,formState,message,payload}
}