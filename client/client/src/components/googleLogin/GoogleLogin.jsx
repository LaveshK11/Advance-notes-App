import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

export default function GLogin() {

    const [responseSuccess, setResponseSuccess] = useState()
    const [resFailure, setResFailure] = useState()

    const clientId = "334230348450-0m7c64tcrrustt3n8euqd7608fkn8198.apps.googleusercontent.com";
    useEffect(() => {
        gapi.load("client:auth2", () => {
            gapi.auth2.init({
                clientId: clientId,
                cookie_policy: 'single_host_origin',
                scope : ""
            });
        });
    }, []);

    return (
        <>
            <div>
                <div className="googleLogin">
                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Sing in with google"
                        onSuccess={setResponseSuccess}
                        onFailure={setResFailure}
                        isSignedIn={true}
                        cookiePolicy={"single_host_origin"}
                        className="custom-google-button"
                    />
                </div>
            </div>
        </>
    );
};


// export default GLogin;