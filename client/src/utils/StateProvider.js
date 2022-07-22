import { createContext, useContext, useState } from "react";
import { useDarkMode } from "./useDarkMode";
import { DarkTheme, LightTheme } from '../styles/globalStyles';


const StateContext = createContext()

const initialState = {
    title: "",
    description: "",
    date: "",
    completed: false
}

function StateProvider({ children }) {
    const [alert, setAlert] = useState({ message: "", success: "" })
    const { theme, Toggle } = useDarkMode()
    const [post, setPost] = useState(initialState)
    const [postId, setPostId] = useState()
    const [edit, setEdit] = useState(false)

    const themeMode = (theme === "dark") ? DarkTheme : LightTheme
    



    return <StateContext.Provider value={{

        theme,
        themeMode,
        Toggle,
        alert,
        setAlert, 
        post,
        setPost,
        edit,
        setEdit,
        initialState, 
        postId,
        setPostId
       

    }}>
        {children}

    </StateContext.Provider>

}

export const useStateVal = () => useContext(StateContext)
export default StateProvider