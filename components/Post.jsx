/* eslint-disable @next/next/no-img-element */
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { db } from "../firebase";

function Post({ id, username, userImg, caption, img }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setComments(snapshot?.docs);
        }
      ),
    [id, db]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
        setLikes(snapshot?.docs);
      }),
    [db, id]
  );

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes, session?.user?.uid]);

  const addComent = async (e) => {
    e.preventDefault();

    const commentToSend = comment;

    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session?.user?.name,
      profileImg: session?.user?.image,
      timestamp: serverTimestamp(),
    });
  };

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
        username: session?.user?.name,
      });
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-md py-4 my-4">
      {/* Post Header */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <img
            src={userImg}
            alt=""
            className="h-12 w-12 rounded-full border border-gray-300 p-1"
          />
          <p className="font-bold">{username}</p>
        </div>
        <img
          src="https://img.icons8.com/ios-glyphs/30/939496/ellipsis.png"
          alt=""
          className="h-5 w-5"
        />
      </div>

      {/* Post Body */}

      <img src={img} alt="" className="mt-4 object-cover w-full" />

      {/* Post Icons */}

      {session && (
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            {hasLiked ? (
              <img
                src="https://img.icons8.com/metro/26/f73d3d/hearts.png"
                alt=""
                className="btn"
                onClick={likePost}
              />
            ) : (
              <img
                src="https://img.icons8.com/material-outlined/24/null/hearts.png"
                alt=""
                className="btn"
                onClick={likePost}
              />
            )}
            <img
              src="https://img.icons8.com/fluency-systems-filled/48/null/comments--v1.png"
              alt=""
              className="btn"
            />
            <img
              src="https://img.icons8.com/external-flat-icons-inmotus-design/67/null/external-aeroplane-fly-airbus-and-aeroplane-flat-icons-inmotus-design-2.png"
              alt=""
              className="btn"
            />
          </div>

          <img
            src="https://img.icons8.com/material/24/null/bookmark-outline.png"
            alt=""
            className="btn"
          />
        </div>
      )}

      {/* Caption */}

      <div className="px-4">
        <p className="text-sm font-bold">{likes.length} Likes</p>
        <p className="text-sm truncate">
          <span className="font-bold">{username} : </span>
          {caption}
        </p>
      </div>

      {/* Comments */}
      {comments.length > 0 && (
        <div className="ml-10 my-3 space-y-3 max-h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-3">
              <img
                src={comment.data().profileImg}
                alt=""
                className="h-7 rounded-full"
              />

              <p className="text-sm flex-1">
                <span className="font-bold">{comment?.data()?.username}</span> :{" "}
                {comment.data().comment}
              </p>

              <Moment fromNow className="text-xs pr-5">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* Input Box */}

      {session && (
        <form className="flex  items-center space-x-3 px-4 mt-4">
          <img
            src="https://img.icons8.com/material-outlined/24/939496/happy--v1.png"
            alt=""
            className="h-6"
          />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 outline-none"
          />
          <button
            disabled={!comment?.trim()}
            onClick={addComent}
            className="text-blue-400 font-semibold disabled:text-blue-200 disabled:cursor-not-allowed"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
