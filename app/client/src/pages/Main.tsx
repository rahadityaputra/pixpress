import Header from "../components/Header";
import Footer from "../components/Footer";
import Compress from "../components/Compress";

const Main = () => {
  return (
    <div className="p-2 flex flex-col">
      <div className="flex flex-col">
        <Header />
        <Compress />
      </div>

      <Footer />
    </div>
  );
};

export default Main;
