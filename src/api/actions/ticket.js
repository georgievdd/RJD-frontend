import { API } from "../../consts";
import {axiosInstance} from "../instance";


export const getTicket = (id) =>
  axiosInstance.get(`${API.TICKET}/${id}`);

export const postTicket = (data) =>
  axiosInstance.post(API.TICKET, data);