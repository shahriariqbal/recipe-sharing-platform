"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreatePost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");

  const createRecipe = api.recipe.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setTitle("");
      setIngredients("");
      setInstructions("");
      setCookTime("");
      setImage("");
      setTags("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const ingArr = ingredients
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean);
        const tagArr = tags
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

        createRecipe.mutate({
          title: title.trim(),
          ingredients: ingArr,
          instructions: instructions.trim(),
          cookTime: cookTime ? parseInt(cookTime, 10) : undefined,
          image: image?.trim() || undefined,
          tags: tagArr,
        });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-full px-4 py-2 border"
        required
      />

      <textarea
        placeholder="Ingredients (one per line)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        className="w-full rounded-md px-4 py-2 border"
        rows={4}
      />

      <textarea
        placeholder="Instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        className="w-full rounded-md px-4 py-2 border"
        rows={4}
      />

      <input
        type="number"
        placeholder="Cook time (minutes)"
        value={cookTime}
        onChange={(e) => setCookTime(e.target.value)}
        className="w-full rounded-full px-4 py-2 border"
        min={0}
      />

      <input
        type="text"
        placeholder="Image URL (optional)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="w-full rounded-full px-4 py-2 border"
      />

      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full rounded-full px-4 py-2 border"
      />

      <button
        type="submit"
        className="rounded-full bg-blue-600 text-white px-6 py-2 font-semibold"
        disabled={createRecipe.isLoading}
      >
        {createRecipe.isLoading ? "Submitting..." : "Create"}
      </button>
    </form>
  );
}
