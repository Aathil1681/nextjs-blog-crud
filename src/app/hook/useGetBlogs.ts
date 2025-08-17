import { Blog } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import api from "../helpers/baseApi";
import { GetBlogParam } from "../types/blog.type";

export default function useGetBlogs(params: GetBlogParam) {
  const getBlogFn = async ({
    signal,
  }: {
    signal: AbortSignal; //signal will be lost(request will be stopped) when user performs another action
  }): Promise<{ items: Blog[]; count: number }> => {
    //API is expected to return an object with items (an array of Blog objects) and count (the total number of blogs matching the criteria
    try {
      return await (
        await api.get("blog", {
          params, //get the requested blogs according to its parameters like page,size...
          signal,
        })
      ).data; //if the request success, show the results as data
    } catch (error) {
      console.log({ error });
      throw error; // if the request fails throw error
    }
  };

  return useQuery({
    queryKey: ["get-blogs", params],
    queryFn: getBlogFn, // if we called the same function with same parameters it avoids refetch and show response quickly using cache
  });
}
