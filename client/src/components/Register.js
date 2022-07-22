import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import UseAnimation from '../utils/UseAnimation'
import { useMutation } from "@apollo/client";
import { REGISTER } from "../endpoints";
import { Loader, authUser} from "../import";

import '../styles/Form.css'


const initialState = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

export default function Register() {
    //signup
    const [formData, setFormData] = useState(initialState)
    const { fullName, email, password, confirmPassword } = formData
    //password visibility
    const [show, setShow] = useState(false)
    const [pass, setPass] = useState(false)

    //switching btw login and signup
    const [visibleForm, showVisibleForm] = useState(false)
    const toggle = () => showVisibleForm(!visibleForm)

    //the form animation
    UseAnimation()


    let navigate = useNavigate()
    let dispatch = useDispatch()


    const [register, { loading, error, data }] = useMutation(REGISTER, {
        onCompleted() {
            dispatch(authUser())
            setFormData(initialState)
            navigate('/home')

        },
        onError(error){
            alert(error.message)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (confirmPassword !== password) {
            alert("password does not match")
            return;
        }

        register({
            variables: {
                addUserContent: {
                    fullName: formData.fullName,
                    password: formData.password,
                    email: formData.email
                }
            }
        })


    }

    // if (data) console.log({ data });
    // if (error) console.log({ error });


    // if (error) alert(error.message)



    return (
        <>
            {loading && <Loader />}
            <div className="form__container sign__up__form">

                <div className="img__box sign__up__imgbox">
                    <div className="sliding__link">
                        <p>Already a user?</p>
                        {/* <a href="!#" className='signup__btn' onClick={toggle}>Sign in</a> */}
                        <button className='signin__btn' onClick={toggle}>Sign in</button>

                    </div>
                    {/* <img src={image2} alt="" /> */}
                </div>

                <div className="form__box sign__up__box">
                    <h2>Sign up</h2>

                    <div className="login__with">
                        <div className="other__options">
                            {/* <a href="!#">
                                <img src={flower} alt="" />
                            </a>

                            <a href="!#">
                                <img src={motif} alt="" />
                            </a>

                            <a href="!#">
                                <img src={child} alt="" />
                            </a> */}
                        </div>
                        <p className='text'>Or sign up with ...</p>


                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <i className=''>👩</i>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full name"
                                value={fullName}
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                required
                            />

                        </div>

                        <div className="field">
                            <i className=''>@</i>
                            <input
                                type="email"
                                placeholder="Email ID"
                                name="email"
                                value={email}
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                required
                            />

                        </div>

                        <div className="field">
                            <i className=''>🔒</i>
                            <input
                                type={show ? "text" : "password"}
                                placeholder="Password"
                                name='password'
                                value={password}
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                required
                            />
                            <div className="eye__btn">
                                <i className='' onClick={() => setShow(!show)}>👁</i>
                            </div>

                        </div>

                        <div className="field">
                            <i className=''>🔒</i>
                            <input
                                type={pass ? "text" : "password"}
                                placeholder="Confirm password"
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                required
                            />
                            <div className="eye__btn">
                                <i className='' onClick={() => setPass(!pass)}>👁</i>
                            </div>


                        </div>

                        <button className='submit__btn'>Sign up</button>

                    </form>




                </div>



            </div>

        </>
    )

}