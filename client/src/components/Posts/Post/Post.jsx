import React from "react";
import useStyles from "./styles";
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment"
import { useDispatch } from "react-redux" 
import { deletePost, likePost } from "../../../action/posts"
const Post = ({post, setCurrentId}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const Likes = () => {
    if(post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) 
      ? (
        <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`} </>
      ) : (
        <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        )
    }
    return <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;Like</>;
  }
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
      <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {/* _id is a currentId */}
      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}>
            <Button style={{color : "white"}} size="small" onClick={() => {
              setCurrentId(post._id);
              }}>
                <MoreHorizIcon fontSize="default"/>
            </Button>
        </div>
      )}
      <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" >{post.tags?.map((tag) => `#${tag} `)}</Typography>
      </div>
      <CardContent>
            <Typography className={classes.title} variant="body2" gutterBottom>{post.title}</Typography>
            <Typography color="textSecondary" component="p" className={classes.title} variant="body2">{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions} >
        <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}>
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" />
            Delete
        </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
