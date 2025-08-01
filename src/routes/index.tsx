import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "../components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

const BOOK_AD = [
  {
    id: 1,
    title: "new release.",
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzncLhoeeQoa0o-2IMFGckxq1QwPyHUmIBDOjmjc5m0LMEgl56FmyA7Cr-MlzhBFfitjU&usqp=CAU",
    link: "/books",
    color: "#23f9b2",
  },
  {
    id: 2,
    title: "pre order now",
    imgSrc: "https://static-cse.canva.com/blob/2095620/1024w-bVa1FCunN4Y.jpg",
    link: "/books",
    color: "#b953b2a2",
  },
  {
    id: 3,
    title: "top rated",
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU2QFKZkq6FSkZpH2kzkcjYwiDgo5E7PiXO_dicuTXcMozUk_0ST5DuuIDY-lxckF5M1I&usqp=CAU",
    link: "/books",
    color: "#f3eaad",
  },
];

const BOOKS = [
  {
    id: 1,
    title: "The art of fashion",
    author: "Alec Henry",
    rating: 4.5,
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzncLhoeeQoa0o-2IMFGckxq1QwPyHUmIBDOjmjc5m0LMEgl56FmyA7Cr-MlzhBFfitjU&usqp=CAU",
    price: 100,
  },
  {
    id: 2,
    title: "About last night",
    author: "Alec Henry",
    rating: 4.2,
    imgSrc: "https://static-cse.canva.com/blob/2095620/1024w-bVa1FCunN4Y.jpg",
    price: 320,
  },
  {
    id: 3,
    title: "About last night",
    author: "Alec Henry",
    rating: 4.2,
    imgSrc: "https://static-cse.canva.com/blob/2095620/1024w-bVa1FCunN4Y.jpg",
    price: 320,
  },
];

function Index() {
  return (
    <main className="flex flex-col bg-bukrow w-full h-full">
      <div className="flex flex-col bg-gradient-to-br from-[#b3c9bc] from-10% to-[#5f7c7a] pt-28 pl-28 w-full h-dvh overflow-hidden">
        <div className="flex justify-center items-center w-full h-full">
          <div className="w-5/12">
            <h1 className="flex flex-col items-start font-raleway font-bold text-white text-3xl md:text-5xl text-center">
              <span className="flex justify-center items-center text-5xl leading-0">
                "
              </span>
              <span className="">
                Read your <span className="text-amber-200">favourite</span>
              </span>
              <span>
                <span className="text-amber-200">Book</span> at BukRow
              </span>
            </h1>
            <div className="flex flex-col gap-8 my-8 font-nunito text-white text-lg">
              <p className="">
                Discover, read, and enjoy a world of books at your fingertips.
                BukRow is your ultimate destination for all your reading needs.
                With a vast collection of books from various genres, authors,
                and formats, you can find the perfect book to suit your taste
                and mood.
              </p>
              <p className="">Readers are Leaders</p>
            </div>
          </div>
          <div className="relative flex p-8 w-7/12 h-full">
            <div className="right-0 bottom-0 absolute self-end bg-[#b3c9bc] rounded-tl-[50%] w-2/3 h-full" />
            <img
              src="/images/Layer 2.png"
              alt="book image"
              className="bottom-0 left-20 absolute object-bottom object-contain"
            />
          </div>
        </div>
        <div className="relative flex justify-between items-center shadow-2xs w-full h-28 max-h-28">
          <div className="flex justify-center items-center w-2/12 font-raleway font-bold text-white text-xl text-center">
            <p className="text-center">
              Inspired by <br />
              Omeiza
            </p>
          </div>
          <div className="top-0 flex justify-between items-center gap-8 bg-[#b3c9bc] p-12 rounded-tl-[6rem] w-10/12 h-36">
            <div className="flex gap-4">
              <Button>Get Started</Button>
              <Button>Login</Button>
            </div>

            <p className="font-montserrat text-white">
              Whether you're a casual reader or a bookworm, BukRow has something
              for everyone. So why wait? Start exploring our vast library today
              and immerse yourself in the world of literature.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 mx-auto p-8 container">
        <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
          {BOOK_AD.map((item) => {
            return (
              <div
                key={item.id}
                className="flex gap-4 shadow-lg p-8 rounded-lg"
                style={{ backgroundColor: item.color }}
              >
                <div className="flex-1 self-end space-y-4">
                  <h1 className="font-nunito font-bold text-3xl capitalize">
                    {item.title}
                  </h1>
                  <Button asChild>
                    <Link to={item.link}>Read Now</Link>
                  </Button>
                </div>
                <div className="flex flex-1">
                  <img
                    src={item.imgSrc}
                    alt="book cover 1"
                    className="shadow-2xl rounded-lg"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="relative flex justify-center items-center bg-bukrow-foreground shadow-lg mx-auto rounded-2xl w-full h-96 overflow-hidden container">
          <img
            src="/images/3.png"
            alt="banner image 1"
            className="top-8 bottom-0 left-10 absolute h-full object-bottom object-contain"
          />
          <img
            src="/images/ChatGPT Image Jul 26, 2025, 08_57_56 PM.png"
            alt="banner image 2"
            className="top-0 right-0 bottom-0 absolute h-full object-bottom object-cover"
          />
          <div className="absolute flex flex-col justify-center items-center gap-3 w-full h-full">
            <p className="font-montserrat font-semibold text-white text-xl uppercase">
              more bang for your book
            </p>
            <h3 className="font-montserrat text-white text-5xl">
              20% Off select books
            </h3>
            <Button>
              <Link to="/about">Shop Now</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="mx-auto p-8 container">
        <h2 className="font-bold text-2xl">Trending on Bukrow</h2>
        <div className="gap-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-8">
          {BOOKS.map((item) => {
            return (
              <div key={item.id} className="flex flex-col gap-2">
                <img src={item.imgSrc} alt={item.title} className="" />
                <div className="flex flex-col justify-center items-center gap-2">
                  <p className="pt-3 font-montserrat text-gray-500 text-sm leading-0.5">
                    by {item.author}
                  </p>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="font-montserrat text-gray-800 text-sm leading-0.5">
                    ₦ {item.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
