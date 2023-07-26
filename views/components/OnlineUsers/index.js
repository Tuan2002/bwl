/* eslint-disable prettier/prettier */
import './style.scss';
import { useStore } from '../../store';
import React from 'react';
import {getSearchUsers} from "../../api/apiUser";
import {getChannel} from "../../api/apiPosts";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function OnlineUsers(props){
    const {state, dispatch}=useStore();
    React.useEffect(()=> {
        if(props?.type=== "channelList" && state.channelList?.length === 0){
            getChannel(dispatch);
        } 
        if(props?.type=== "searchUsers" && state.pageUsers !== -1 && state.searchUsersPosts === ""){
            getSearchUsers(state.search, state.pageUsers, dispatch)
        } 
    },[state.search, state.pageUsers, props?.type, state.channelList]);

    const handleClickChangeChannel =(index)=>{
        dispatch({type: "SET_CHANNEL", payload: index})
    }    

    return(
        <div className="container-list-users" style={{ backgroundColor: state.background ? "rgb(36, 37, 38)": "white"}}>
            {props?.type=== "searchUsers" && (
                <div>
                    {state.users ? state.users?.map(item =>{
                        return(
                            <div key={Number(item?.id)} className="list-user">                       
                                <div className="list-user-author">
                                    <img
                                        src={`https://cdn.discordapp.com/avatars/${item?.id}/${item?.avatar}`}
                                    />
                                    <p>{item?.username}</p>
                                </div>
                                <p  
                                    className="post-onclick-p"
                                    onClick={() => {
                                        if(item?.total){
                                            dispatch({type: "CHANGE_PAGE_USERS_POST", payload: item?.id});
                                        }
                                    }}
                                >
                                    {item?.total ? item?.total + " Posts" : " 0 Posts"}
                                </p>
                            </div>
                        )
                    })
                    : null}
                </div>
            )}
            {props?.type=== "channelList" && (
                <div>
                    {state.channelList ? state.channelList?.map(item =>{
                        return(
                            <div key={Number(item?.id)} 
                                className="list-channel"
                                onClick={()=> {
                                    if(item?.id !== state.channel){
                                        handleClickChangeChannel(item?.id);
                                    }
                                }}
                            >                       
                                <div 
                                    className="list-channel-icon" 
                                    style={{color: item?.id === state.channel ? "rgb(25, 118, 210" : "#6C7588"}}
                                >
                                    {item?.id === state.channel ? <NavigateNextIcon sx={{color: "rgb(25, 118, 210"}}/> : <NavigateBeforeIcon sx={{color: "#6C7588"}}/>}
                                    <p>{item?.icon}</p>
                                    <p>{item?.name}</p>
                                </div>
                                <p 
                                    className="list-channel-total" 
                                    style={{color: item?.id === state.channel ? "rgb(25, 118, 210" : "#6C7588"}}
                                >
                                    {item?.total + " Posts"} 
                                </p>
                            </div>
                        )
                    })
                    : null}
                </div>
            )}
        </div>
    )
}
export default OnlineUsers;