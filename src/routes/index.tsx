import { createFileRoute } from "@tanstack/react-router";
import { Button } from "../components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="flex flex-col w-full h-full">
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
    </main>
  );
}
