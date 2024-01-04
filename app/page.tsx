import SearchBar from "@/components/SearchBar";
import Issues from "@/components/Issues";
import { fetchIssues } from "@/utils";
import { HomeProps } from "@/types";
import { Suspense } from "react";

export default async function Home({ searchParams }: HomeProps) {
  const data = await fetchIssues(
    searchParams.org || "",
    searchParams.repo || "",
    searchParams.page || 1
  );

  const isDataEmpty = !Array.isArray(data) || data.length < 1 || !data;

  return (
    <main className="main">
      <div className="flex xl:flex-row flex-col gap-5 relative z-0 max-w-[768px] mx-auto ">
        <div className="flex-1 pt-36 sm:px-16 px-6 ">
          <h1 className="text-4xl font-extrabold"> GitHub issue viewer</h1>
          <p className="text-xl  font-light mt-5 mb-5">
            View issues from a public GitHub repo e.g "vercel", "next.js".
          </p>

          <div className="mb-10">
            <SearchBar />
            <Suspense fallback={<div>Loading...</div>}>
              {!isDataEmpty ? <Issues data={data} /> : <Issues data={[]} />}
            </Suspense>

            <div className="mb-20"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
