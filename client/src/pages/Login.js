import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { LOGIN } from "../endpoints";
import UseAnimation from '../utils/UseAnimation'
import { Register, Loader, authUser } from "../import";
import '../styles/Form.css'

const initialState = {
    email: "",
    password: "",
}



export default function Login() {
    const [formData, setFormData] = useState(initialState)
    const { email, password } = formData

    //password visiblity
    const [show, setShow] = useState(false)

    //switching btw login and signup
    const [visibleForm, showVisibleForm] = useState(false)
    const toggle = () => showVisibleForm(!visibleForm)

    //the form animation
    UseAnimation()

    let navigate = useNavigate()
    let dispatch = useDispatch()
    //graphql call
    const [login, { loading, error, data }] = useLazyQuery(LOGIN, {
        onCompleted( {loginUser} ) {
            if (loginUser) {
                // console.log(loginUser);
                setFormData(initialState)
                dispatch(authUser())
                navigate('/home')

            }

        },
        onError(error){
            alert(error.message)
        }
    })





    const handleSubmit = (e) => {
        e.preventDefault()
        login({
            variables: {
                content: formData
            }
        })


    }

    // if (called) console.log({ called });
    // if (error) console.log({ error });
    // if (data) console.log({ data });

    // if (error) alert(error.message) ;

    return (
        <>
            {loading && <Loader />}
            {/* <Alert/> */}
            {/* {
                !loading && ! error
            } */}
            <div className="main__div">
                <div className="form__container sign__in__form">
                    <div className="form__box sign__in__box">
                        <h2>Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <i className=''>@</i>
                                <input
                                    type="email"
                                    name='email'
                                    placeholder="Email ID"
                                    value={email}
                                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                    required
                                />

                            </div>

                            <div className="field">
                                <i className=''>🔒</i>
                                <input
                                    type={show ? "text" : "password"}
                                    name="password" placeholder="Password"
                                    value={password}
                                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                    required
                                />
                                <div className="eye__btn">
                                    <i className='' onClick={() => setShow(!show)}>👁</i>
                                </div>

                            </div>

                            <div className="forgot__link">
                                <a href="!#">Forgot Password?</a>

                            </div>

                            <button className='submit__btn'>Submit</button>

                        </form>
                        <div className="login__with">
                            <p className='text'>Or login with ...</p>
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


                        </div>



                    </div>

                    <div className="img__box sign__in__imgbox">
                        <div className="sliding__link">
                            <p>Don't have an account?</p>
                            {/* <a href="!#" className='signup__btn' onClick={toggle}>Sign up</a> */}
                            <button className='signup__btn' onClick={toggle}>Sign up</button>

                        </div>
                        {/* <img src={image1} alt="" /> */}
                    </div>

                </div>


                {/* signup form */}

                <Register />



            </div>
        </>
    )

}