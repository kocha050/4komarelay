import classes from "*.module.css";
import { Grid, Button, Paper, TextField, MenuItem, makeStyles, createStyles, Theme, Divider, IconButton, Container, Box } from "@material-ui/core";
import { CloudUpload, ContactSupportOutlined, PhotoCamera } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const currencies = [
    {
        value: 'action',
        label: 'アクション',
    },
    {
        value: 'gag',
        label: 'ギャグ',
    },
    {
        value: 'serious',
        label: 'シリアス',
    },
    {
        value: 'lovecome',
        label: 'ラブコメ'
    },
    {
        value: 'sports',
        label: 'スポーツ',
    },
    {
        value: 'free',
        label: 'フリー',
    }
];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
        input: {
            display: 'none',
        },
        button: {
            margin: theme.spacing(1),
        },
    }),
);


const Post = () => {
    const classes = useStyles();
    const [title, setTitle] = React.useState("");
    const [genre, setGenre] = React.useState("");
    const [image, setImage] = React.useState("");

    const handleChangeTitle = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setTitle(event.target.value);
        //console.log(event.target.value);
    };

    const handleChangeGenre = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setGenre(event.target.value);
    };

    const handleChangeImage = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setImage(event.target.value);
    }

    const url = 'http://localhost:3000/api/method/newupload';
    
    const postFetch = () => {
        console.log("title:" + title);
        console.log("genre:" + genre);
        console.log("image" + image);

        fetch(url, {
            method: "POST",
            body: title,
        });
    }

    return (
        <div>
            <div>
                <Navbar />
                <div>
                    <Grid container alignItems="center" justify="center">
                        <Divider></Divider>
                        <Box textAlign="center" m={1} fontSize={30} fontWeight="fontWeightLight">
                            新規作成
                        </Box>
                        <Divider></Divider>
                    </Grid>
                    <Container maxWidth="sm">
                        <Grid container>
                            <Grid item xs={4}>
                                タイトル
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    id="titleForm"
                                    label="タイトル"
                                    multiline
                                    rowsMax={5}
                                    value={title}
                                    onChange={handleChangeTitle}
                                    variant="outlined"
                                    style={{ width: 300 }}



                                    name="title"
                                />
                            </Grid>
                        </Grid>
                        <br></br>
                        <Divider variant="middle" />
                        <br></br>
                        <Grid container>
                            <Grid item xs={4}>
                                ジャンル
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="ジャンル"
                                    value={genre}
                                    onChange={handleChangeGenre}
                                    variant="outlined"
                                    style={{ width: 300 }}
                                >
                                    {currencies.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                        <br></br>
                        <Divider variant="middle" />
                        <br></br>
                        <Grid container>
                            <Grid item xs={4}>
                                画像をアップロード
                            </Grid>
                            <Grid item xs={8}>
                                <Button component="label">
                                    <input
                                        type="file"
                                        id="target"
                                        accept="image/*"
                                        value={image}
                                        onChange={handleChangeImage}
                                    />
                                </Button>
                            </Grid>
                        </Grid>
                        <br></br>
                        <Divider></Divider>
                        <br></br>
                        <Grid container alignItems="center" justify="center">
                            <Button
                                variant="contained"
                                color="default"
                                className={classes.button}
                                startIcon={<CloudUpload />}
                                onClick={postFetch}
                            >
                                作品を投稿
                            </Button>
                        </Grid>
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default Post;
