import { useEffect, useState } from "react";
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
      <h1>Users</h1>

      <p>{text}</p>
    </div>
  );
};

export default Home;
