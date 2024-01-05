"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { CounterContext } from "@/context/counter";

const SearchBar = () => {
  const { dispatch } = useContext(CounterContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = () => handleSearch();
  const [org, setOrg] = useState("");
  const [repo, setRepo] = useState("");

  const router = useRouter();

  const handleSearch = () => {
    updateSearchParams(org.toLowerCase(), repo.toLowerCase());
  };

  const updateSearchParams = (org: string, repo: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("org", org.trim());
    searchParams.set("repo", repo.trim());

    if (org) {
      searchParams.set("org", org);
    } else {
      searchParams.delete("org");
    }

    if (repo) {
      searchParams.set("repo", repo);
    } else {
      searchParams.delete("repo");
    }

    searchParams.delete("page");
    searchParams.set("page", "1");

    dispatch({ type: "RESET" });

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathname);
  };

  interface IFormInput {
    org: string;
    repo: string;
  }

  return (
    <form className="search" onSubmit={handleSubmit(onSubmit)}>
      <div className="block md:flex gap-4 ">
        <div className="flex-1 mb-4 md:mb-0">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              🏢
            </span>

            <input
              className="w-full placeholder:italic placeholder:text-slate-400 block text-black bg-white 
           border border-slate-300 rounded-md py-2 pl-8 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 "
              placeholder="Search organization"
              {...register("org", {
                onChange: (e) => setOrg(e.target.value),
                required: true,
              })}
              type="text"
              name="org"
            />
          </label>
          {errors.org && (
            <p className="text-red-100 text-sm" role="alert">
              Org is required
            </p>
          )}
        </div>
        <div className="flex-1 mb-4 md:mb-0">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <Image
                src="/github.svg"
                alt="github"
                width={20}
                height={19}
                className="invert "
              />
            </span>

            <input
              className="w-full placeholder:italic placeholder:text-slate-400 block text-black bg-white 
           border border-slate-300 rounded-md py-2 pl-8 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 
           "
              placeholder="Search repo"
              value={repo}
              type="text"
              {...register("repo", {
                onChange: (e) => setRepo(e.target.value),
                required: true,
              })}
              name="repo"
            />
          </label>
          {errors.repo && (
            <p className="text-red-100 text-sm" role="alert">
              Repo is required
            </p>
          )}
        </div>
        <div className="flex-0">
          <Button
            title="Search"
            classes="bg-blue-500 hover:bg-blue-700 rounded-md py-2 px-7 cursor-pointer text-center bg-black text-white font-bold"
          />
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
