import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const [text, setText] = useState("");
  useEffect(() => {
    const fetchHome = async () => {
      try {
        const response = await axios.get(
          "https://mini-fullstack-ecru.vercel.app/"
        );
        setText(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHome(); // Panggil fungsi async
  }, []); // Dependency array kosong berarti akan berjalan sekali ketika komponen di-mount
  return (
    <div>
      <h1>Home</h1>

      <p>{text}</p>
      <Link to="/users">Users</Link>
      <br />
      <Link to="/test">Test</Link>
    </div>
  );
};

export default Home;
