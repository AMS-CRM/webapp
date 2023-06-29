import { useState, useEffect } from "react";
import { showNotification } from "@mantine/notifications";
import { useSelector } from "react-redux";

export const useError = (errorType) => {
  const [errors, setErrors] = useState(null);
  const { isError, isSuccess, isLoading, message } = useSelector(
    (state) => state[errorType]
  );

  useEffect(() => {
    if (isError && typeof message == "object") {
      message.map((error) => {
        setErrors((state) => ({
          ...state,
          [error.param]: error.msg,
        }));
      });
    } else if (isError && message) {
      showNotification({
        title: "Error",
        color: "red",
        position: "top-right",
        message: message,
      });
    } else {
      setErrors(null);
    }
  }, [isLoading, isSuccess, message, isError]);

  return [
    errors,
    (state) => {
      setErrors(state);
    },
  ];
};
