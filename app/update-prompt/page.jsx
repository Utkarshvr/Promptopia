"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

export default function EditPrompt() {
  const { data: session } = useSession();
  const router = useRouter();

  const searchParams = useSearchParams();
  const postId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    if (postId) {
      (async () => {
        const response = await fetch(`api/prompt/${postId}`);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setPost({
            prompt: data?.prompt,
            tag: data?.tag,
          });
        }
      })();
    }
  }, [postId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!postId) return alert("Prompt ID not found");

    try {
      const response = await fetch(`api/prompt/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post?.prompt,
          tag: post?.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      // Will execute not matter if the function fails or pass
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
}
