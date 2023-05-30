import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// GET(read)
export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id);

    if (!prompt) return new Response("Prompt not found", { status: 201 });

    return new Response(JSON.stringify(prompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to fetch all the prompts", { status: 500 });
  }
};

// PATCH (update)
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();

    const updatedPrompt = await Prompt.findByIdAndUpdate(
      params.id,
      {
        prompt,
        tag,
      },
      { new: true }
    );

    if (!updatedPrompt)
      return new Response("Prompt not found", { status: 201 });

    return new Response(JSON.stringify(updatedPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to fetch all the prompts", { status: 500 });
  }
};
// DELETE (delete)

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findByIdAndDelete(params.id);

    if (!prompt) return new Response("Prompt not found", { status: 201 });

    return new Response(JSON.stringify(prompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to fetch all the prompts", { status: 500 });
  }
};
