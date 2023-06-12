/* eslint-disable prettier/prettier */
import axios from 'axios';

export const getAll = async (index, dispatch) => {
    try {
        dispatch({type:"CHANGE_LOADING_POST"});
        const res = await axios({
            url: index.messageId ? `/api/getAllPaging?page=${index.page}&messageId=${index.messageId}` : `/api/getAllPaging?page=${index.page}`,
            method: "GET",
          });
        dispatch({type:"SET_POSTS", payload: res.data})
    } catch {
        return [];
    }
}

export const getOne = async (index) => {
    try {
        const res = await axios({
            url: index.id ? `/api/posts?messageId=${index.messageId}&id=${index.id}` : `/api/posts?messageId=${index.messageId}`,
            method: "GET",
          });
        return res.data;
    } catch {
        return [];
    }
}

export const getHotPosts = async (dispatch) => {
    try {
        dispatch({type:"CHANGE_LOADING_HOTPOST"})
        const res = await axios({
            url: "/api/hotposts",
            method: "GET",
          });
        dispatch({type:"SET_HOTPOSTS", payload: res.data?.hotposts})
    } catch {
        return [];
    }
}

export const deletePost = async (index) => {
    try {
        const res = await axios({
            url: `/api/posts?id=${index.id}&messageId=${index.messageId}`,
            method: "DELETE",
          });
        return res.data;
    } catch {
        return false;
    }
}

export const addPost = async (index) => {
    try {
        const res = await axios({
            url: `/api/upload?id=${index.id}`,
            method: "POST",
            data: index?.formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
          });
        return res.data;
    } catch {
        return false;
    }
}

export const editPost = async (index) => {
    try {
        const res = await axios({
            url: `/api/edit/post?id=${index.id}&messageId=${index.messageId}`,
            method: "POST",
            data: index?.formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
          });
        return res.data;
    } catch {
        return false;
    }
}
