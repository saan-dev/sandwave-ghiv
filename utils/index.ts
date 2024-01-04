export async function fetchIssues(org: string, repo: string, page: number) {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    Authorization: process.env.TOKEN || "",
    "X-Github-Api-Version": "2022-11-28",
  };

  const response = await fetch(
    `https://api.github.com/repos/${org}/${repo}/issues?page=${page}`,
    {
      headers: headers,
    }
  );

  const result = await response.json();

  return result;
}

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPath = `${window.location.pathname}?${searchParams.toString()}`;

  return newPath;
};
