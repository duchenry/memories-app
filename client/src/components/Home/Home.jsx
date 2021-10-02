import React, { useEffect, useState } from "react";
import { Container, Grid, Grow } from "@mui/material";
import { useDispatch } from "react-redux";
import { getPosts } from "../../action/posts.js";
import { Posts, Form } from "../../components";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid container justify="space-between" align="stretch" spacing={3}>
          <Grid xs={12} sm={7} item>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid xs={12} sm={4} item>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
