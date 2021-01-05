import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Button, TextField, Container } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      backgroundColor: "#FFB549",
      color: "#FFFFFF",
      borderLeftColor: "#FFB549",
      marginBottom: "8px",
      margin: theme.spacing(2),
      width: "40ch",
      "&:hover": {
        backgroundColor: "#FFF",
        color: "#FFB549",
      },
    },
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "40ch",
      },
    },
  })
);

const Login = (props: any) => {
  const classes = useStyles();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const getAuthentication = async () => {
    console.log(userEmail);
    console.log(userPassword);

    const url =
      "http://localhost:3000/api/method/login?id=" +
      userEmail +
      "&pwd=" +
      userPassword;
    // 入力したidとパスワードをapiに送信
    const res = await fetch(url)
      .then((res) => {
        console.log("通信に成功しました");
        return res.json();
      })
      .catch((error) => {
        console.error("通信に失敗しました", error);
        return null;
      });

    console.log(res);
    if (res) {
      //console.log("true");
      console.log(isLogin);
      setIsLogin(true);
      console.log(isLogin);
      handleToHomePage();
    } else {
      console.log("false");
    }

    return true;
  };
  //trueの時ページ遷移
  const handleToHomePage = () => {
    props.history.push("/");
  };

  return (
    <div>
      <Container maxWidth="xs">
        <Grid container spacing={1} alignItems="center" justify="center">
          <h1>ログイン</h1>
        </Grid>
        <Grid container spacing={2} alignItems="center" justify="center">
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <TextField
                id="outlined-required"
                label="id(メールアドレス)"
                defaultValue=""
                variant="outlined"
                onChange={(id) => setUserEmail(id.target.value)}
              />
            </div>
            <div>
              {" "}
              <TextField
                id="outlined-password-input"
                label="パスワード"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                onChange={(pass) => setUserPassword(pass.target.value)}
              />
            </div>
          </form>
        </Grid>
        <Grid container spacing={2} alignItems="center" justify="center">
          <div>
            <Button
              className={classes.button}
              variant="contained"
              onClick={() => getAuthentication()}
            >
              ログイン
            </Button>
          </div>
        </Grid>
        <Grid container spacing={4} alignItems="center" justify="center">
          <p>
            <Link to="/">アカウントをお持ちでない方はこちら</Link>
          </p>
        </Grid>
      </Container>
    </div>
  );
};
export default Login;
