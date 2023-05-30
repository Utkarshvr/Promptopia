"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Profile from "@components/Profile";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  const router = useRouter();

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        setPosts((prev) => prev.filter((item) => item._id !== post._id));
      } catch (error) {}
    }
  };

  useEffect(() => {
    console.log(session?.user.id);
    if (session?.user.id) {
      (async () => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        if (response.ok) setPosts(data);
      })();
    }
  }, [session]);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
