import './Form.css';
import Input from '../../Components/Input/Input';
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Form({ type, onRegisterSuccess }) {
    const [teamNameInput, setTeamNameInput] = useState("");
    const [memberNameInput1, setMemberNameInput1] = useState("");
    const [memberNameInput2, setMemberNameInput2] = useState("");
    const [memberNameInput3, setMemberNameInput3] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [phoneInput, setPhoneInput] = useState("");

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const toastIdsRef = useRef([]);
    const navigate = useNavigate();

    const BASE_URL = "https://fdb9-223-227-118-0.ngrok-free.app";

    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['ngrok-skip-browser-warning'] = true;

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validatePhone = (phone) => {
        const cleanedPhone = phone.replace(/\D/g, '');
        return cleanedPhone.length === 12;
    };

    const showToast = (message, type) => {
        if (toastIdsRef.current.length >= 2) {
            toast.dismiss(toastIdsRef.current.shift());
        }

        const id = toast[type](message, {
            onClose: () => {
                toastIdsRef.current = toastIdsRef.current.filter(toastId => toastId !== id);
            }
        });

        toastIdsRef.current.push(id);
    };

    const refreshPage = () => {
        navigate(window.location.pathname, { replace: true });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (type === "register") {
            let emptyFields = [];
            if (!teamNameInput) emptyFields.push("Team Name");
            if (!memberNameInput1) emptyFields.push("Member Name 1");
            if (!emailInput) emptyFields.push("Email");
            if (!passwordInput) emptyFields.push("Password");
            if (!phoneInput) emptyFields.push("Phone");

            if (emptyFields.length > 0) {
                showToast(`Please fill in the following fields: ${emptyFields.join(', ')}`, "error");
                return;
            } else if (!validateEmail(emailInput)) {
                showToast("Please enter a valid email address. Eg. bi0s@example.com", "error");
                return;
            } else if (!validatePhone(phoneInput)) {
                showToast("Please enter a valid 10-digit phone number.", "error");
                return;
            }

            try {
                const response = await axios.post(`${BASE_URL}/api/register`, {
                    teamName: teamNameInput,
                    memberName1: memberNameInput1,
                    memberName2: memberNameInput2,
                    memberName3: memberNameInput3,
                    email: emailInput,
                    password: passwordInput,
                    phone: phoneInput
                });

                if (response.status === 201) {
                    showToast("Registration successful!", "success");
                    setTeamNameInput("");
                    setMemberNameInput1("");
                    setMemberNameInput2("");
                    setMemberNameInput3("");
                    setEmailInput("");
                    setPasswordInput("");
                    setPhoneInput("");

                    if (onRegisterSuccess) {
                        onRegisterSuccess();
                    }

                    refreshPage();
                } else {
                    showToast("Registration failed, please try again.", "error");
                }
            } catch (error) {
                console.error("Error during registration:", error);
                if (error.response) {
                    console.error("Response data:", error.response.data);
                    console.error("Response status:", error.response.status);
                    showToast("Registration failed, please try again.", "error");
                } else if (error.request) {
                    console.error("Request data:", error.request);
                } else {
                    console.error("Error message:", error.message);
                    showToast("An error occurred while submitting the form. Please try again.", "error");
                }
            }
        } else if (type === "login") {
            if (!loginEmail || !loginPassword) {
                showToast("Please fill in both email and password fields.", "error");
                return;
            } else if (!validateEmail(loginEmail)) {
                showToast("Please enter a valid email address. Eg. bi0s@example.com", "error");
                return;
            }
    
            try {
                const response = await axios.post(`${BASE_URL}/api/login`, {
                    email: loginEmail,
                    password: loginPassword
                });
    
                if (response.status === 200) {
                    showToast("Login successful!", "success");
    
                    setLoginEmail("");
                    setLoginPassword("");
    
                    if (onRegisterSuccess) {
                        onRegisterSuccess();
                    }
    
                    refreshPage();
                } else {
                    showToast("Login failed, please try again.", "error");
                }
            } catch (error) {
                console.error("Error during login:", error);
                if (error.response) {
                    if (error.response.status === 401) {
                        showToast("Login failed, Invalid Credentials.", "error");
                    }
                    console.error("Response data:", error.response.data);
                    console.error("Response status:", error.response.status);
                } else if (error.request) {
                    console.error("Request data:", error.request);
                } else {
                    console.error("Error message:", error.message);
                }
            }
        }
    };

    return (
        <form className="Form" onSubmit={handleSubmit}>
            {type === "register" && (
                <>
                    <Input
                        type="teamName"
                        placeholder="Team Name"
                        value={teamNameInput}
                        onChange={(e) => setTeamNameInput(e.target.value)}
                    />
                    <Input
                        type="memberName"
                        placeholder="Member Name 1"
                        value={memberNameInput1}
                        onChange={(e) => setMemberNameInput1(e.target.value)}
                    />
                    <Input
                        type="memberName"
                        placeholder="Member Name 2"
                        value={memberNameInput2}
                        onChange={(e) => setMemberNameInput2(e.target.value)}
                    />
                    <Input
                        type="memberName"
                        placeholder="Member Name 3"
                        value={memberNameInput3}
                        onChange={(e) => setMemberNameInput3(e.target.value)}
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                    />
                    <Input
                        type="phone"
                        placeholder="Phone"
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                    />
                </>
            )}
            {type === "login" && (
                <>
                    <Input
                        type="email"
                        placeholder="Email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                    />
                </>
            )}
            <button className="submit" type="submit">Submit</button>
        </form>
    );
}

export default Form;
