import type { NextPage } from "next";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/login-form.module.css";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";

const LoginForm: NextPage = () => {
  const router = useRouter();

  const onButtonContainerClick = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const onSubmitLogin = () => {
    console.log("Login:")
    console.log(email)
    console.log(password)
  }

  return (
    <div className={styles.loginForm}>
      <div className={styles.logo}>
        <div className={styles.betterparentWrapper}>
          <div className={styles.betterparent}>BetterParent</div>
        </div>
        <img
          className={styles.weedyALogoOfAStylizedOfIcon}
          alt=""
          src="/weedy-a-logo-of-a-stylized-of-a-parent-holding-a-baby-minimalis-c6c03149042248e7b267c478ad56482e-3@2x.png"
        />
      </div>
      <div className={styles.header}>
        <b className={styles.signInTo}>Sign in to Minimal</b>
        <div className={styles.dontHaveAnContainer}>
          <span>{`New user? `}</span>
          <span className={styles.createAnAccount}>Create an account</span>
        </div>
      </div>
      <div className={styles.form}>
        <TextField 
          required 
          fullWidth
          value={email} 
          onChange={handleEmailChange}
          variant="outlined"
          label="E-Mail" />
        <TextField 
          required 
          fullWidth
          value={password}
          onChange={handlePasswordChange}
          variant="outlined"
          label="Password" />
        <Button
          variant="contained"
          fullWidth
          onClick={onSubmitLogin}
        >
          Anmelden
        </Button>
        <div className={styles.button} onClick={onButtonContainerClick}>
          <img className={styles.startIcon} alt="" src="/start-icon4.svg" />
          <b className={styles.label1}>Login</b>
          <img className={styles.startIcon} alt="" src="/start-icon4.svg" />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
