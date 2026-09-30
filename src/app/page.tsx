import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const recipes = await api.recipe.getAll.query();
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-gray-900">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 ">
        <h1 className="text-4xl font-extrabold tracking-tight text-center">
          Recipe Share
        </h1>

        <div className="w-full max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">Latest recipes</h2>
          <div className="grid gap-4">
            {recipes.length === 0 ? (
              <p>No recipes yet. Create the first one!</p>
            ) : (
              recipes.map((r) => (
                <article
                  key={r.id}
                  className="rounded-md border p-4 bg-white shadow-sm"
                >
                  <h3 className="text-lg font-bold">{r.title}</h3>
                  <p className="text-sm text-gray-600">
                    By {r.createdBy?.name ?? r.createdBy?.email ?? "Unknown"} •{' '}
                    {new Date(r.createdAt).toLocaleString()}
                  </p>
                  <p className="mt-2 text-sm text-gray-800 truncate">
                    {typeof r.instructions === 'string' && r.instructions.length>0
                      ? r.instructions
                      : Array.isArray(r.instructions)
                      ? (r.instructions as string[]).join(' ')
                      : ''}
                  </p>
                </article>
              ))
            )}
          </div>
        </div>

        <div className="w-full max-w-xs mt-6">
          {session?.user ? (
            <>
              <h2 className="text-xl font-semibold mb-2">Create a recipe</h2>
              <CreatePost />
            </>
          ) : (
            <p className="text-center">Sign in to create recipes.</p>
          )}
        </div>
      </div>
    </main>
  );
}
