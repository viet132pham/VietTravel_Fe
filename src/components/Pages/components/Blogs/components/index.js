import React from "react";
import { Radio } from "@material-ui/core";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import { useEffect } from "react";
import "../styles/index.scss";
import { useDispatch, useSelector } from "react-redux";
import { getListBlog, getListBlogCategory, getListFilterBlog } from "../actions/BlogActionCallApi";
import HeaderNav from "../../../../commons/HeaderNav/HeaderNav";
import { useHistory } from "react-router-dom";
import Footer from "../../../../HomePage/Footer";
import PaginationCommon from "../../../../commons/Pagination";

function Blog(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const blog = useSelector((state) => state.blog);

  const { items, categories, filter } = blog;

  useEffect(() => {
    dispatch(getListBlog());
    dispatch(getListBlogCategory());
  }, []);

  useEffect(() => {
    if(filter.category){
      dispatch(getListFilterBlog());
    } else {
      dispatch(getListBlog());
    }
  }, [filter.category]);

  const handleShowDetail = (id) => {
    history.push(`/blog/detail/${id}`);
  };

  const handleChangeFilter = (key, data) => {
    dispatch({
      type: "CHANGE_FILTER_BLOG",
      key,
      data,
    });
  };

  return (
    <div className="blog-wrapper">
      <HeaderNav />
      <hr />
      <div className="list-content">
        <div className="blogs">
          {items?.map((e, index) => {
            return (
              <div key={index} className="blog-item">
                <div className="image">
                  <img src={e?.image} />
                </div>
                <div className="title" onClick={() => handleShowDetail(e?.id)}>
                  {e?.title}
                </div>
                <div className="description">{e?.description}</div>
                <div
                  className="view-detail"
                  onClick={() => handleShowDetail(e?.id)}
                >
                  <span>Hiển thị chi tiết >>></span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="filters">
          <div className="title">Categories</div>
          <div className={`category-item`} key={99} onClick={() => handleChangeFilter('category', '')}>
            <span>>></span>
            <span>Tất cả bài viết</span>
          </div>
          {categories?.map((e, index) => {
            return (
              <div className={`category-item`} key={index} onClick={() => handleChangeFilter('category', e.name)}>
                <span>>></span>
                <span>{e.name}</span>
              </div>
            );
          })}
        </div>
      </div>
      <PaginationCommon filter={filter} type="blog" />
      <hr />
      <Footer />
    </div>
  );
}
export default Blog;
