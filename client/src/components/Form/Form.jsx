import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from "react-file-base64";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createPost,updatePost } from "../../action/posts";

const Form = ({setCurrentId, currentId}) => {
  const classes = useStyles();
  const post = useSelector((state) => currentId ? state.posts.find((post) => post._id === currentId) : null);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    if(post) setPostData(post);
  }, [post]);

  const [postData, setPostData] = useState({ title: "", message: "", tags: "", selectedFile: ""});
  
  const clear = () => {
    setCurrentId(null);
    setPostData({title: "", message: "", tags: "", selectedFile: ""});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(currentId) {
      dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
    } else {
      dispatch(createPost({...postData, name: user?.result?.name}));
    }
    clear();
  };

  if(!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please sign in or sign up to create your fantastic memories and react to people'memories
        </Typography>
      </Paper>
    )
  }
  return (
    <Paper>
      <form autoComplete="off" className={classes.form} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? "Editing" : "Creating"} a Memory</Typography>
        <TextField name="title" variant="outlined" fullWidth label="Title" value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
        <TextField name="message" variant="outlined" fullWidth multiline rows={3} label="Message" value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
        <TextField name="tags" variant="outlined" fullWidth label="Tags" value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })}/>
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth >Submit</Button>
        <Button variant="contained" color="secondary" size="large"  onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
