import { useEffect, useRef } from "react";

const useTitle = (title) => {
  const defaultTitle = useRef(title);

  useEffect(() => {
    document.title = defaultTitle.current;
  }, [title]);
};

export default useTitle;
