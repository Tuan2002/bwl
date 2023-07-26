/* eslint-disable prettier/prettier */
import './style.scss';
import React from 'react';
import { formatDay } from '../../util/formatDay';
import { useStore } from '../../store';
import CommentInput from '../CommentInput';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Delcomment from '../delcomment';
import FeedbackComment  from "../FeedbackComment";
import { postComment, postCommentLike, editComment, postPinComment  } from '../../api/apiComment';
import {showToast}  from "../../util/showToast";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import PushPinIcon from '@mui/icons-material/PushPin';
import EditIcon from '@mui/icons-material/Edit';

const CommentItem = (props) => {
  const { state, dispatch } = useStore();
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [input, setInput] = React.useState('');

  React.useEffect(() => {
    if (props?.content) {
      setInput(props?.content);
    }
  }, [props?.content]);
  const handleClickComment = async () => {
    if(input !== ""){
      if (state.author?.id) {
        await editComment({
          id: props?._id,
          content: input,
          messageId: state.author?.id,
        });
      } else {
        showToast("warning", 'Bạn cần đăng nhập để bình luận!');
      }
    } else{
      showToast("warning", "Không để trống");
    }
    setOpenEdit(false);
  };

  const handledit = () => {
    setOpenEdit(!openEdit);
    setOpen(false);
  };

  const handleMoreIconClick = () => {
    setOpen(!open);
  };

  const handleContainerMouseLeave = () => {
    setOpen(false);
  };
  const [openFeedback , setOpenFeedback ] = React.useState(false);
  const [feedback , setFeedback ] = React.useState("");
  const handleClickFeedback =() => {
    setOpenFeedback(!openFeedback);
  } 

  const handleClickCommentFeedback = async (index) => {
    if(feedback !== ""){
      if (state.author?.id) {
        await postComment({
          authorId: state.author?.id,
          content: feedback,
          messageId: props?.messageId,
          id: index,
        })
        setFeedback('');
        setOpenFeedback(false);
      } else {
        showToast("warning", 'Bạn cần đăng nhập để bình luận!');
      }
    }else{
      showToast("warning", "Không để trống");
    }
  };

  const handleClickLikeComment =(index)=>{
    if(state.author?.id){
      if(state.author?.id !==props?.author[0]?.id){
        postCommentLike({
          messageId: props?.messageId, 
          id: state.author?.id, 
          onLike: index, 
          commentId: props?._id,
        })
      } else{
        showToast("warning", "Gian lận không tốt đâu!")
      }
    } else{
      showToast("warning", "Bạn nên đăng nhập!");
    }
  }
  const handlePinComment =(id, onPin)=>{
    postPinComment({id: id, onPin: !onPin});
  }

  return (
    <div className="comment-item">
      <div className="author-avatar">
        <div className="author-image">
          <img
            src={`https://cdn.discordapp.com/avatars/${props?.author[0].id}/${props?.author[0].avatar}`}
            className="img-people"
            alt="avatar"
          />
        </div>
        <div className="author-boxcontent">
          <div    
            className="author-name"
            style={{
              backgroundColor: state.background ? '#282829f7' : '#ebedf0',
              color: '#6C7588',
            }}
          >
            <div className="author-name-item">
              <p className="name">{props?.author[0]?.username}</p>
              <div className="comment-time">
                {formatDay(
                  props?.createdTimestamp
                    ? props?.createdTimestamp
                    : props?.comment?.createdTimestamp,
                )}
              </div>
              {props?.onPin && 
              <p className="comment-pin-icon">
                <PushPinIcon sx={{fontSize: "14px"}}/>
              </p>
            }
            </div>
            {!openEdit && <p className="comment">{props?.content}</p>}
            {openEdit && (
              <CommentInput
                handleClickComment={handleClickComment}
                input={input}
                setInput={setInput}
              />
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px',  marginLeft: "15px" }}>
            <div className="comment-like-div">
              <p onClick={()=>handleClickLikeComment(true)}>
                {props.likeComment}
                {props?.authorLike=== true?
                  <ThumbUpAltIcon sx={{fontSize: "15px"}}/>
                  :
                  <ThumbUpOffAltIcon sx={{fontSize: "15px"}}/>
                }
              </p>
              <p onClick={()=>handleClickLikeComment(false)}>
                {props.dislikeComment}
                {props?.authorLike === false?
                  <ThumbDownAltIcon sx={{fontSize: "15px"}}/>
                  :
                  <ThumbDownOffAltIcon sx={{fontSize: "15px"}}/>
                }
              </p>
              {props?.type==="true" && (
                <p 
                  style={{ fontSize: '11px' }}
                  onClick={handleClickFeedback}
                >
                  Reply
                </p>
              )}
            </div>
            {props?.onEdit && <p style={{ fontSize: '8px' }}>đã chỉnh sửa</p>}
          </div>
        </div>
        {state.author?.id && (props?.author[0]?.id === state.author?.id || props?.authorMessage === state.author?.id) && (
          <div
            className="delete-comment-btn"
            onMouseLeave={handleContainerMouseLeave}
          >
            <div className="delete-icon" onClick={handleMoreIconClick}>
              <MoreHorizIcon />
            </div>
            {open ? (
              <div className={state.background ? "dialog-form-dark" : "dialog-form-light"}>
                {props?.authorMessage === state.author?.id && (
                  <div className="content" onClick={()=> handlePinComment(props?._id, props?.onPin)}>
                    <PushPinIcon sx={{fontSize: "13px"}}/>
                    <p>{props?.onPin ? "Unpin" : "Pin"}</p>
                  </div>
                )}
                {props?.author[0]?.id === state.author?.id && (
                  <div>
                    <div className="content" onClick={handledit}>
                      <EditIcon sx={{fontSize: "13px"}}/>
                      <p>Edit</p>
                    </div>
                    <div className="content">
                      <Delcomment id={props?._id}/>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
      <div>
        {openFeedback && (
          <CommentInput 
            handleClickComment={() => handleClickCommentFeedback(props?._id)}
            input={feedback}
            setInput={setFeedback}
          />
        )}
        <FeedbackComment 
          length={props?.length} 
          item={props?.itemList}
          id={props?._id}
          messageId={props?.messageId}
          page={props.page}
          size={props.size}
          authorMessage={props?.authorMessage}
          loading={props?.loading}
        />
      </div>
    </div>
  );
};
export default CommentItem;
