import { Blog } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import queryClient from "../helpers/queryClient";
import { BlogInput } from "../types/blog.type";
import api from "../helpers/baseApi";

const useCreateBlog = () => {
  const createBlogFn = async (values: BlogInput): Promise<Blog> => {
    return await api.post("blog", values);
  };

  //useQuery:getting information from server like GET(ex: fetch user)
  //useMutation: send information within body like POST

  return useMutation({
    mutationFn: createBlogFn,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-blogs"], //when the post creation is completed succesfully the get blogs will be refetch automatically
      });
    },
  });
}; //after the blog created, the useMutation function will triggered and automatically refresh the data to show the latest update

export default useCreateBlog;
