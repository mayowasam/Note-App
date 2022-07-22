import { useMemo } from "react";
import { useState } from "react";

export function useDarkMode() {
    const [theme, setTheme] = useState("light")

    const setMode = (mode) => {
        localStorage.setItem("theme", mode)
        setTheme(mode)
    }

    const Toggle = () => (theme === "dark") ? setMode("light") : setMode("dark")

    useMemo(() => {
        const themeVal = localStorage.getItem("theme")
        themeVal ? setTheme(themeVal) : setMode("light")

    }, [])




    return {
        theme,
        Toggle
    }

}