import { useEffect, useRef } from "react";

export default function UseAnimation(){
    let onceRef = useRef(false)

    useEffect(() => {
        if(onceRef.current) return;
        const inputs = document.querySelectorAll("input")
        // console.log('inputs', inputs);

        const signUpBtn = document.querySelector('.signup__btn')
        const signInBtn = document.querySelector('.signin__btn')
        const signUpForm = document.querySelector('.sign__up__form')
        const signInForm = document.querySelector('.sign__in__form')


        inputs.forEach(input => {
            input.addEventListener("focus", () => {
                // console.log(input);
                let parent = input.parentNode
                parent.classList.add("active")

            })

            input.addEventListener("blur", () => {
                let parent = input.parentNode
                parent.classList.remove("active")

            })

        })



        signUpBtn.addEventListener("click", (e) => {
            signInForm.classList.add("hide")
            signUpForm.classList.add("show")
            signInForm.classList.remove("show")

        })

        signInBtn.addEventListener("click", (e) => {
            signInForm.classList.remove("hide")
            signUpForm.classList.remove("show")
            signInForm.classList.add("show")


        })

       return () => onceRef.current = true


    }, [])


}