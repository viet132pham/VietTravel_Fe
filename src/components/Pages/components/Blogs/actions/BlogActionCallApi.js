import { BASE_URL } from "../../../../../contains/config";
import callApi from "../../../../../ulti/callApi";

export const getListBlog = () => dispatch => {
  const options = {
    method: 'GET'
  }

  const url =  `${BASE_URL}/api/blog/get`;

  return callApi(url, options).then(res => {
    if(res?.data){
      dispatch({
        type: 'ADD_LIST_BLOG',
        data: res.data
      });
    }
  });
}


export const getListBlogCategory = () => dispatch => {
  const options = {
    method: 'GET'
  }

  const url =  `${BASE_URL}/api/blogcategory/list`;

  return callApi(url, options).then(res => {
    if(res?.data){
      dispatch({
        type: 'ADD_LIST_BLOG_CATEGORY',
        data: res.data
      });
    }
  });
};

export const getListFilterBlog = () => (dispatch, getState) => {
  
  const {
    blog: {
      filter: {
        page,
        limit,
        category
      }
    }
  } = getState();

  const options = {
    method: 'GET'
  }

  const url =  `${BASE_URL}/api/blog/filter?pageNumber=${page}&pageSize=${limit}&category=${category}`;
  return callApi(url, options).then(res => {
    if(res?.data?.content){
      dispatch({
        type: 'ADD_LIST_BLOG',
        data: res.data?.content
      });
    }
  });
};

export const getBlogDetailItem = (id) => dispatch => {
  const options = {
    method: 'GET'
  }

  const url =  `${BASE_URL}/api/blog/${id}`;

  return callApi(url, options).then(res => {
    if(res?.data){
      return res.data;
    }
  });
};

export const getCommentsByBlogItem = (id) => dispatch => {
  const options = {
    method: 'GET'
  }

  const url =  `${BASE_URL}/api/comment/get/${id}`;

  return callApi(url, options).then(res => {
    if(res?.data){
      dispatch({
        type: 'ADD_LIST_BLOG_COMMENTS',
        data: res.data
      });
    }
  });
};

export const postComment = (model) => dispatch => {
  const options = {
    method: 'POST',
    data: JSON.stringify(model),
  }

  const url =  `${BASE_URL}/api/comment/post`;

  return callApi(url, options).then(res => {
    if(res?.data){
      return res.data;
    }
  });
}