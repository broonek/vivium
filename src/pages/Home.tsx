import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  let navigate = useNavigate();
  useEffect(() => {
    navigate("/sign-in");
  }, []);

  return <div>home</div>;
};

export default Home;
