import axios from "axios";
import { toast } from "react-toastify";

export const ErrorHandle = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response && error.response.data.message) {
      const messages = error.response.data.message;
      if (Array.isArray(messages)) {
        messages.forEach((ms: string) => toast.error(ms));
      } else {
        toast.error(messages);
      }
    } else {
      toast.error("Error During Edit the Decks");
    }
  } else {
    throw error;
  }
};