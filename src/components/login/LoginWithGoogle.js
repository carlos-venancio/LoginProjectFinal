import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from './login';

export default function LoginWithGoogle({ setIsLoggedIn }){
    return (
        <GoogleOAuthProvider clientId="484620940572-eqao4bhgsnatnqt912kikknp6sah8r2f.apps.googleusercontent.com">
            <Login setIsLoggedIn={setIsLoggedIn} />
        </GoogleOAuthProvider>
    )
}