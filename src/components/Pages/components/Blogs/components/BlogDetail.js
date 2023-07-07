import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getBlogDetailItem,
  getCommentsByBlogItem,
} from "../actions/BlogActionCallApi";
import HeaderNav from "../../../../commons/HeaderNav/HeaderNav";
import Footer from "../../../../HomePage/Footer";
import "../styles/BlogDetail.scss";
import Comment from "./Comment";

function BlogDetail(props) {
  const [item, setItem] = useState("");

  const comments  = useSelector(state => state.blog.comments);

  console.log("check comments :",comments);
  
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    const path = history.location.pathname;
    const id = path?.split("/blog/detail/")?.[1];
    dispatch(getBlogDetailItem(id)).then((res) => {
      setItem(res);
    });
    dispatch(getCommentsByBlogItem(id));
  }, []);

  return (
    <div className="blog-detail-wrapper">
      <HeaderNav />
      <hr />
      <div className="blog-detail-content-wrapper">
        <div className="bread-scrum d-flex">
          <div className="text" onClick={() => history.push("/")}>
            Trang chủ >{" "}
          </div>
          <div className="text" onClick={() => history.push("/blog")}>
            Bài viết
          </div>
          <div className="text">> Chi tiết </div>
        </div>
        <hr />
        <div className="containers">
          <div className="row">
            <div className="col-lg-10 col-xl-9">
              <div className="product">
                <div className="d-block d-md-flex flex-center-between align-items-start mb-2">
                  <div className="w-100 d-flex justify-content-between">
                    <div className="mb-3">
                      <div className="d-block mb-2 mb-md-0">
                        <h4 className="font-size-23 font-weight-bold mb-1">
                          {item?.title}
                        </h4>
                        <div className="d-flex">
                          {item?.blogcategorie?.map((e) => {
                            return <div className="category">{e?.name}</div>;
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pb-4 mb-2">
                  <img src={item?.image}></img>
                </div>
                <div className="single-hotel__description border-bottom">
                  <h5 className="text-dark font-weight-bold description-title">
                    Mô tả
                  </h5>
                  <div className="description">
                    <div className="d-block d-md-flex flex-horizontal-center font-size-14 text-gray-1 sub-description">
                      <div>{item?.description}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="comment-list">
            <div className="total-comment">
              {comments?.length || 0} Comments
            </div>
            {comments?.length > 0
              ? comments?.map((comment, index) => {
                  return (
                    <div className="comment-item">
                      <div className="account">
                        <span className="icon">
                          <i className="fa-solid fa-user"></i>
                        </span>
                        <span className="user-name">{comment?.userDTO?.username}</span>
                      </div>
                      <div className="comment-content">{comment?.content}</div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
      <Comment blogId={item.id} />
      <hr />
      <Footer />
    </div>
  );
}
export default BlogDetail;
