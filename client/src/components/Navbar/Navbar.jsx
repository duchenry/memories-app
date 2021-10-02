import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom"
import { AppBar, Typography, Toolbar, Button, Avatar} from "@mui/material";
import useStyles from "./styles";
import { Link } from "react-router-dom"
import decode from "jwt-decode"
import { useDispatch } from "react-redux"
const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const logout = () => {
    dispatch({ type: "LOGOUT"});

    history.push("/");

    setUser(null);
  }

  useEffect(() => {
    const token = user?.token;
    if(token) {
      const decodedToken = decode(token);
      if(decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location])

  return (
    <AppBar position="static" color="inherit" className={classes.appBar}>
      <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
        Memories
      </Typography>
      <img className={classes.image} src="https://www.incimages.com/uploaded_files/image/1920x1080/getty_129714169_970647970450099_67857.jpg" alt="memories" height="60"/>
        <Toolbar className={classes.toolbar}>
            {user?.result ? (
                <div className={classes.profile}>
                    <Avatar alt={user?.result.name} src={user?.result.imageUrl} className={classes.avatar}>{user?.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>
            ) : (
                <Button component={Link} to="/auth" variant="contained" color="primary">Login</Button>
            )}
        </Toolbar>
    </AppBar>
  );
};

export default Navbar;
