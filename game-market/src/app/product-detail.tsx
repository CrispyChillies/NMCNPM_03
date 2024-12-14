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
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface Comment {
  id: number;
  content: string;
  likes: number;
  replies: Reply[];
  timestamp: { min: number; hour: number; day: number; month: number; year: number };
}

interface Reply {
  id: number;
  content: string;
  likes: number;
  replies: Reply[];
  timestamp: { min: number; hour: number; day: number; month: number; year: number };
}

export default function ProductDetail() {
  const noti = () => {
    alert("Success");
  };

  const sendCmt = () => {
    alert("Sent");
  };

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyingCommentId, setReplyingCommentId] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const getCurrentDateTime = () => {
    const now = new Date();
    const min = now.getMinutes();
    const hour = now.getHours();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    return { min, hour, day, month, year };
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    const { min, hour, day, month, year } = getCurrentDateTime();
    const comment: Comment = {
      id: Date.now(),
      content: newComment,
      likes: 0,
      replies: [],
      timestamp: { min, hour, day, month, year },
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  const handleAddReply = (commentId: number) => {
    if (replyContent.trim() === "") return;
    const { min, hour, day, month, year } = getCurrentDateTime();
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  id: Date.now(),
                  content: replyContent,
                  likes: 0,
                  replies: [],
                  timestamp: { min, hour, day, month, year },
                },
              ],
            }
          : comment
      )
    );
    setReplyingCommentId(null);
    setReplyContent("");
  };

  const handleLikeComment = (commentId: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-background text-foreground min-h-screen">
      <div className="col1-container bg-card rounded-lg shadow-lg p-6 text-card-foreground">
        <img
          src="../images/fc24.png"
          className="rounded-xl w-full h-auto mb-4"
          alt="fc24"
        />
        <div className="price my-3 rounded-xl flex-1">
          <p className="price-cont mb-4 bg-accent rounded-xl py-3 text-center font-serif text-3xl font-extrabold text-accent-foreground">
            ${ProductData.price}
          </p>
          <div className="rating py-1 text-center bg-primary rounded-xl">
            <StarRating />
          </div>
        </div>
        <div className="my-3">
          <button
            onClick={noti}
            className="w-full rounded-xl py-3 text-center font-bold text-lg bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary transition duration-300"
          >
            ADD TO CART
          </button>
        </div>
        <div className="my-3">
          <button
            onClick={noti}
            className="w-full rounded-xl py-3 text-center font-bold text-lg bg-secondary text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary transition duration-300"
          >
            ADD TO FAVORITE
          </button>
        </div>
      </div>

      <div className="col2-container md:col-span-2 bg-card rounded-lg shadow-lg p-6 flex flex-col relative text-card-foreground">
        <div className="Name text-4xl md:text-5xl lg:text-6xl mb-2 font-sans text-foreground font-bold">
          {ProductData.name}
        </div>
        <div className="Author text-xl mb-6 text-primary font-serif">
          {ProductData.author}
        </div>
        <div className="Stats">
          <div className="list font-sans text-lg mt-4 list-inside text-muted-foreground grid grid-cols-12 gap-2">
            <p className="col-span-1 text-primary">✓</p>
            <div className="col-span-11 hover:text-primary transition-colors">
              Genre: {ProductData.genre}
            </div>
            <p className="col-span-1 text-primary">✓</p>
            <div className="col-span-11 hover:text-primary transition-colors">
              Compatibility: {ProductData.compatibility}
            </div>
            <p className="col-span-1 text-primary">✓</p>
            <div className="col-span-11 hover:text-primary transition-colors">
              Release date: {ProductData["release-date"]}
            </div>
            <p className="col-span-1 text-primary">✓</p>
            <div className="col-span-11 hover:text-primary transition-colors">
              Last update: {ProductData["last-update"]}
            </div>
          </div>
        </div>
        <h1 className="Description mt-8 mb-4 font-mono font-bold text-primary text-2xl">
          ABOUT THIS GAME
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          {ProductData.description}
        </p>

        <div className="cmt mt-10 flex flex-col gap-4">
          <div className="cmt-title text-2xl font-mono font-bold text-primary">
            LEAVE YOUR COMMENTS
          </div>
          <textarea
            className="cmt-box w-full bg-muted text-muted-foreground resize-none rounded-md p-3 border border-input focus:ring-2 focus:ring-ring focus:border-transparent"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            className="send-btn w-full bg-primary text-primary-foreground font-bold py-2 rounded-md hover:bg-primary/90 transition duration-300"
            onClick={handleAddComment}
          >
            SEND
          </button>

          <div className="all-comments flex flex-col gap-4 mt-5 mb-5">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="comment bg-muted p-4 rounded-lg shadow-sm border border-border"
              >
                <div className="user-cmt text-md text-primary font-semibold">
                  From: cmt-user
                </div>
                <div className="date text-sm text-muted-foreground">
                  {comment.timestamp.day}/{comment.timestamp.month}/
                  {comment.timestamp.year} -
                  {comment.timestamp.hour}:{comment.timestamp.min}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="bg-card rounded-md p-3 flex-grow mr-2 text-wrap border border-border">
                    <p className="text-foreground">{comment.content}</p>
                  </div>
                  <button
                    className="text-sm bg-primary p-2 rounded-md text-primary-foreground hover:bg-primary/90 transition duration-300"
                    onClick={() => handleLikeComment(comment.id)}
                  >
                    ❤ {comment.likes}
                  </button>
                </div>
                <div className="ml-4 mt-2">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="mt-2">
                      <div className="user-cmt text-md text-primary font-semibold">
                        From: rep-user
                      </div>
                      <div className="repdate text-sm text-muted-foreground">
                        {reply.timestamp.day}/{reply.timestamp.month}/
                        {reply.timestamp.year}-
                        {reply.timestamp.hour}:{reply.timestamp.min}
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <div className="bg-card rounded-md p-2 flex-grow mr-2 text-wrap border border-border">
                          <p className="text-foreground">{reply.content}</p>
                        </div>
                        <button
                          className="text-sm bg-primary p-1 rounded-md text-primary-foreground hover:bg-primary/90 transition duration-300"
                          onClick={() => handleLikeReply(comment.id, reply.id)}
                        >
                          ❤ {reply.likes}
                        </button>
                      </div>
                    </div>
                  ))}

                  {replyingCommentId === comment.id ? (
                    <div className="reply-box mt-2">
                      <textarea
                        className="w-full bg-muted p-3 rounded-md shadow-md text-muted-foreground resize-none border border-input focus:ring-2 focus:ring-ring focus:border-transparent"
                        placeholder="Write your reply..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                      ></textarea>
                      <button
                        className="w-full mt-2 bg-primary text-primary-foreground font-bold py-2 rounded-md hover:bg-primary/90 transition duration-300"
                        onClick={() => handleAddReply(comment.id)}
                      >
                        SEND REPLY
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setReplyingCommentId(comment.id)}
                      className="text-sm mt-2 border border-primary p-1 rounded-md px-3 font-bold text-primary hover:bg-primary hover:text-primary-foreground transition duration-300"
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
  );
}

