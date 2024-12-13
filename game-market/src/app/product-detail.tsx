import { AppSidebar } from "@/components/app-sidebar";
import React, { useState } from "react";
import StarRating from "@/components/rating";
import ProductData from "@/app/data/product-detail.json";
import {
  Breadcrumb,
  BreadcrumbItem, 
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"


export default function ProductDetail() {
  const noti = () => {
    alert("Success");
  };

  const sendCmt = () =>{
    alert('Sent');
  };

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyingCommentId, setReplyingCommentId] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");

  // Add a new comment
  const getCurrentDateTime = ()=>{
    const now = new Date();
    const min = now.getMinutes();
    const hour = now.getHours();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    return {min,hour,day,month,year};
  }

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    const {min,hour,day,month,year} = getCurrentDateTime();
    const comment: Comment = {
      id: Date.now(),
      content: newComment,
      likes: 0,
      replies: [],
      timestamp: {min,hour,day,month,year},
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  // Add a reply to a comment
  const handleAddReply = (commentId: number) => {
    if (replyContent.trim() === "") return;
    const {min,hour,day,month,year} = getCurrentDateTime();
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                
                { id: Date.now(),
                  content: replyContent, 
                  likes: 0, 
                  replies: [],
                  timestamp: {min,hour,day,month,year} },
              ],
            }
          : comment
      )
    );
    setReplyingCommentId(null);
    setReplyContent("");
  };

  // Like a comment
  const handleLikeComment = (commentId: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  // Like a reply
const handleLikeReply = (commentId: number, replyId: number) => {
  setComments((prevComments) =>
    prevComments.map((comment) =>
      comment.id === commentId
        ? {
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === replyId
                ? { ...reply, likes: reply.likes + 1 }
                : reply
            ),
          }
        : comment
    )
  );
};



  return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 grid grid-cols-3 bg-black">
            <div className="col1-container bg-gray-900 px-7 py-7 text-white">
              <img src={ProductData.img} className="rounded-xl object-cover w-96 h-auto" alt="fc24" />
              <div className="price my-3 rounded-xl flex-1 ">
                <p className="price-cont mb-4 bg-gray-700 rounded-xl py-3 text-center font-serif text-3xl font-extrabold">
                  ${ProductData.price}
                </p>
                <p className="rating  py-1 text-center">
                <div id="rating">
                  <StarRating/ >
                </div>
                </p>
              </div>
              <div className="add-to-cart bg-gray-700 my-3 rounded-xl">
                <button
                  onClick={noti}
                  className="atc-cont w-full rounded-xl py-3 text-center font-extrabold font-serif text-4xl hover:bg-green-600 hover:text-white"
                >
                  ADD TO CART
                </button>
              </div>
              <div className="Add-to-favs bg-gray-700 my-2 rounded-xl">
                <button
                  onClick={noti}
                  className="atf-cont w-full rounded-xl text-center font-extrabold font-serif text-4xl py-3 hover:bg-green-600 hover:text-white"
                >
                  ADD TO FAVORITE
                </button>
              </div>
        </div>

          <div className="col2-container col-span-2 bg-gray-900 flex flex-1 flex-col relative">
            <div className="Name text-7xl mt-7 pl-7 font-sans text-white font-extrabold">{ProductData.name}</div>
            <div className="Author text-xl mt-3 pl-7 underline underline-offset-2 text-green-400 font-serif">{ProductData.author}</div>
            <div className="Stats">
              <div className="list font-sans text-2xl pl-7 mt-7 list-inside text-white grid grid-cols-12">
                <p className="col-span-1 text-green-400">✓</p><div className="col-span-11 hover:text-green-400"> Genre: {ProductData.genre}</div>
                <p className="col-span-1 text-green-400">✓</p><div className="col-span-11 hover:text-green-400"> Compatibility: {ProductData.compatibility}</div>
                <p className="col-span-1 text-green-400">✓</p><div className="col-span-11 hover:text-green-400"> Release date: {ProductData["release-date"]}</div>
                <p className="col-span-1 text-green-400">✓</p><div className="col-span-11 hover:text-green-400"> Last update: {ProductData["last-update"]}</div>
              </div>
            </div>
            <h1 className="Description mt-7 pl-7 font-mono font-bold text-green-400 text-3xl">ABOUT THIS GAME</h1>
            <p className="pl-7 pr-2 indent-8 text-white">
              {ProductData.description}
            </p>
            
            <div className="cmt pl-7 mt-7 pr-2 flex flex-col gap-4">
              <div className="cmt-title text-2xl font-mono font-bold text-green-400">
                LEAVE YOUR COMMENTS
              </div>
              {/* Add New Comment */}
              <textarea
                className="cmt-box w-full bg-gray-700 text-white resize-none rounded-md p-3"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <button
                className="send-btn w-full bg-green-400 text-white font-bold py-2 rounded-md hover:bg-green-600"
                onClick={handleAddComment}
              >
                SEND
              </button>

              {/* Show All Comments */}
              <div className="all-comments flex flex-col gap-4 mt-5 mb-5">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="comment bg-gray-700 p-3 rounded-md shadow-md"
                  >
                    <div className="user-cmt text-md text-green-400 hover:font-extrabold">From: cmt-user</div>
                    <div className="date text-sm text-gray-300">
                    {comment.timestamp.day}/{comment.timestamp.month}/{comment.timestamp.year} -{comment.timestamp.hour}:{comment.timestamp.min}
                    </div>
                    <div className="flex justify-between grid grid-cols-10 items-center">
                      <div className=" bg-gray-400 rounded-md pl-3 col-span-9 text-wrap">
                        <p className="pl-2 pr-2 pt-1 pb-1">{comment.content}</p>
                      </div>
                      <button
                        className="text-sm bg-green-400 p-1 rounded-md ml-2 text-white hover:bg-green-600"
                        onClick={() => handleLikeComment(comment.id)}
                      >
                        ❤ {comment.likes}
                      </button>  
                    </div>
                    {/* Replies */}
                    <div className="ml-4 mt-2">
                      {comment.replies.map((reply) => (
                        
                        <div key={reply.id}>
                          <div className="user-cmt text-md text-green-400 hover:font-extrabold">From: rep-user</div>
                          <div className="repdate text-sm text-gray-300">
                            {reply.timestamp.day}/{reply.timestamp.month}/{reply.timestamp.year}-
                            {reply.timestamp.hour}:{reply.timestamp.min}
                            </div>
                          <div className="justify-between grid grid-cols-10 flex items-center ">
                            <div className="reply bg-gray-400 p-1 pl-3 rounded-md mt-1 col-span-9">{reply.content}</div>
                            <button
                              className="text-sm bg-green-400 rounded-md ml-2 p-1 hover:bg-green-600 text-white"
                              onClick={() => handleLikeReply(comment.id,reply.id)}
                            >
                              ❤ {reply.likes}
                            </button>
                          </div>
                        </div>
                      ))}

                       {replyingCommentId === comment.id ? (
                        <div className="reply-box">
                          <textarea
                            className="comment bg-slate-300 p-3 rounded-md shadow-md mt-3 w-full"
                            placeholder="Write your reply..."
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                          ></textarea>
                          <button 
                            className="rep-btn w-full bg-green-500 text-white font-bold py-2 rounded-md hover:bg-green-600"
                            onClick={() => handleAddReply(comment.id)}
                          >
                            SEND REPLY
                          </button>
                        </div>
                        ) : (
                          <button
                            onClick={() => setReplyingCommentId(comment.id)}
                            className="text-sm mt-2 border-2 p-1 rounded-md pl-3 pr-3 font-bold text-green-400 border-green-400 hover:bg-green-600 hover:text-white"
                          >
                            REPLY
                          </button>
                  )}
                    </div>
                  </div>
                ))}
              </div>
            </div>           
          </div>
        </div>
  )
}
