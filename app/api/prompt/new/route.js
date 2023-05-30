import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();
  try {
    // Need to connect again
    // WHY?
    // This is a lambda function, which means it will die once it performes it function
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save();
    // res.json() NOOOOOOOO
    // Correct:
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
