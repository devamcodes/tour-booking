import publicFetch from "../utils/publicFetch";
import { API_ROUTES } from "./constants";
const { PRIVATE_ROUTE } = API_ROUTES;

export const getBlogs = () =>
  publicFetch.get(
    `https://evening-retreat-75152.herokuapp.com/api/${PRIVATE_ROUTE.GET_ALL_BLOGS}`
  );

export const deleteBlogs = (id) =>
  publicFetch.post(
    `https://evening-retreat-75152.herokuapp.com/api/${PRIVATE_ROUTE.GET_ALL_BLOGS}/${id}`
  );
export const createOrEditBlog = (METHOD, data, id) =>
  publicFetch.post(
    `https://evening-retreat-75152.herokuapp.com/api/${METHOD}/${id ? id : ""}`,
    data
  );
// export const EditBlog = (data, id) =>
//   publicFetch.put(`http://localhost:5000/api/blog/edit-blog/${id} `, data);
