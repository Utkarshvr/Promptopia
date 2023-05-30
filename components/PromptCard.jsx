"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function PromptCard({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}) {
  const [copied, setCopied] = useState("");

  const { data: session } = useSession();

  const pathName = usePathname();

  const handleCopy = (e) => {
    setCopied(post?.prompt);
    // global object in JavaScript that represents the web browser's navigation capabilities. clipboard is a property of the navigator object that provides access to the user's clipboard functionality.
    // writeText() is a method of the clipboard object. It allows you to write text to the user's clipboard.
    navigator.clipboard.writeText(post?.prompt);
    console.log(post?.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            className="rounded-full object-contain"
            src={post?.creator.image}
            alt="User Image"
            width={40}
            height={40}
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post?.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post?.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            // className="rounded-full object-contain"
            src={
              copied === post?.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="Copy"
            width={16}
            height={16}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post?.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post?.tag)}
      >
        {post?.tag}
      </p>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
}
