"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef, useContext } from "react";
import { IssuesProps, Issue } from "../types";
import Image from "next/image";
import { updateSearchParams } from "@/utils";
import { CounterContext } from "@/context/counter";

const Issues = ({ data }: IssuesProps) => {
  const { state, dispatch } = useContext(CounterContext);

  const router = useRouter();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [prevData, setPrevData] = useState<Issue[]>([]);
  const [isBottom, setIsBottom] = useState(false);

  const handleSort = (value: string) => {
    if (value === "asc") {
      setIssues([...data].sort((a, b) => a.title.localeCompare(b.title)));
    } else {
      setIssues([...data].sort((a, b) => b.title.localeCompare(a.title)));
    }
  };

  useEffect(() => {
    if (data.length < 1) {
      setIssues([]);
      return;
    }

    const isPrevDataEmpty = prevData.length === 0;
    const dataArray = Array.from(data);

    const sortedData = [...dataArray].sort((a, b) =>
      (a.title as string).localeCompare(b.title as string)
    );

    if (
      isPrevDataEmpty ||
      prevData[0].repository_url !== data[0].repository_url
    ) {
      setIssues(sortedData);
      setPrevData([]);
    } else {
      setIssues((prevData) => [...prevData, ...data]);
    }
  }, [data]);

  const observerTarget = useRef(null);

  const handleUpdate = () => {
    const dataArray = Array.from(data);
    setPrevData((prevData) => [...prevData, ...dataArray]);

    dispatch({ type: "INCREMENT" });
    const newPageParam = updateSearchParams("page", `${state.page}`);

    router.push(newPageParam, { scroll: false });
  };

  useEffect(() => {
    if (isBottom) {
      handleUpdate();
      setIsBottom(false);
    }
  }, [isBottom]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsBottom(true);
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

  return (
    <>
      {data ? (
        <div className="flex md:block">
          <div className="mt-4">
            <div>
              {data.length > 1 && (
                <select
                  onChange={(e) => handleSort(e.target.value)}
                  className="bg-black rounded-lg p-2 text-white flex-1 hidden md:block"
                >
                  <option value={"asc"} className="mb-5 items-center">
                    {" "}
                    A - Z{" "}
                  </option>
                  <option value={"desc"} className="mb-5 items-center">
                    {" "}
                    Z - A{" "}
                  </option>
                </select>
              )}
              {issues.map((issue, index) => (
                <div
                  key={index}
                  className={`mt-5 mb-10 flex items-center ${
                    index % 2 === 0 ? "bg-slate-100" : "bg-slate-300"
                  } rounded-lg pt-1 pb-1 pr-1 pl-4 text-black`}
                >
                  <Image
                    src={`/${issue.state}.svg`}
                    alt="github"
                    width={15}
                    height={14}
                    className="max-w-[15px] "
                  />

                  <a
                    href={issue.html_url}
                    className="ml-3 p-3  hover:underline"
                  >
                    {issue.title}
                  </a>
                </div>
              ))}
            </div>
            <div ref={observerTarget}></div>
          </div>
        </div>
      ) : (
        <div>
          <p>Loading issues..</p>
        </div>
      )}
    </>
  );
};

export default Issues;
