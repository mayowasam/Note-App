export {default as Index} from "./pages/Index";
export {default as  Login} from "./pages/Login";
export {default as  Home} from './pages/Home'
export {default as About} from "./pages/About";
export {default as Notfound} from "./pages/Notfound";
export {default as SharedLayout} from "./components/SharedLayout";
export {default as  Navbar} from "./components/Navbar";
export {default as Register} from "./components/Register";
export {default as Loader} from "./components/Loader";
export {default as AddNote} from './components/AddNote'
export {default as ProtectedRoute} from './utils/ProtectedRoute'
export {useStateVal } from './utils/StateProvider'
export {Moon , Sun} from  './utils/svg'
export {Logo} from './components/logo'

//reducers
export {authUser, removeAuth} from './redux/reducers/authReducer'
export {addPost, updatePost,removePost, removeAllPost} from './redux/reducers/postReducer'
export {addUser, removeUser} from './redux/reducers/userReducer'

