import { useState } from "react";

const useHandleAlert = () => {
  const [status, setStatus] = useState(false);
  const [data, setData] = useState({});

  const handleAlert = (type, message) => {
    setStatus(true);
    setData({ type, message });
    setTimeout(() => {
      setStatus(false);
    }, 3000);
  };

  return { status, data, handleAlert };
};

export default useHandleAlert;
