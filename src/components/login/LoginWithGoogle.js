import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from './login';

export default function LoginWithGoogle(){
    return (
        <GoogleOAuthProvider clientId="484620940572-6kjm9ga1t6426lfi6557t07440o5tu9h.apps.googleusercontent.com">
            <Login />
        </GoogleOAuthProvider>
    )
}