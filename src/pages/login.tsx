import type { NextPage } from "next";
import styles from "../styles/login.module.css";
import { useState } from "react";
import Router from "next/router";
import { Button, TextField, Typography } from "@mui/material";
import { authenticate } from "../services/authService";

const Login: NextPage = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleInputData = (event: any) => {
        if (event.target.name === "password") {
            setPassword(event.target.value);
        }
        if (event.target.name === "email") {
            setEmail(event.target.value);
        }
    };

    function handleLogin() {
        console.log("Logindata:", email, password)
        authenticate(email, password).then((success) => {
        if (success) {

            console.log("Authentication successful");

            const userString = localStorage.getItem('user');
            const user = userString ? JSON.parse(userString) : null;

            console.log(user.isCoach)

            if(!user?.isCoach) {
                window.open("http://localhost:3000/courses", "_blank");
                console.log("Open in new tab")
            } else {
                Router.push("/courses")
            }
        } else {
            console.log("Authentication failed");
            // Display an error message or take action for failed authentication
        }
        })
        .catch((error) => {
            console.error("Error during authentication:", error);
            // Handle other potential errors during the authentication process
        });

    }

    return (
        <div className={styles.page}>
            <img className={styles.image} 
                alt="Man holding baby" 
                src='/loginImage.png' 
            />
            <form className={styles.form}>
                <img className={styles.logo} 
                    alt="Logo" 
                    src='/BetterParentLogo.png' 
                />
                <Typography 
                    className={styles.label}
                    variant="h5"
                    >Als Coach anmelden
                </Typography>
                <TextField
                    className={styles.formElements}
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleInputData}
                    label="E-Mail"
                />
                <TextField
                    className={styles.formElements}
                    name="password"
                    type="password"
                    value={password}
                    onChange={handleInputData}
                    label="Passwort"
                />

                <Button 
                    variant="contained"
                    className={styles.button}
                    onClick={() => handleLogin()}
                    >Anmelden
                </Button>
            </form>
        </div>
    );
};

export default Login;




