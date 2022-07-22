import { Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/globalStyles";
import {
  SharedLayout, Home, Index, Login, About, Notfound, ProtectedRoute, useStateVal
} from './import'
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { REFRESHTOKEN } from './endpoints'

export default function App() {
  const { themeMode } = useStateVal()
  const { isAuthenticated } = useSelector(state => state.auth)
  const { loading, error, data } = useQuery(REFRESHTOKEN, {
    pollInterval: 1000 * 60 * 60
  })

  // console.log({data});

  // console.log("app");
  return <>
    <GlobalStyles />
    <ThemeProvider theme={themeMode}>
      <Routes>
        <Route path="/" element={<SharedLayout />} >
          <Route index element={<Index />} />
          <Route path="home" element={
            <ProtectedRoute>
              <Home />

            </ProtectedRoute>
          } />
          <Route path="register" element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />} />
          <Route path="about" element={<ProtectedRoute>
            <About />

          </ProtectedRoute>} />
          <Route path="*" element={<Notfound />} />


        </Route>

      </Routes>
    </ThemeProvider>
  </>
}