import { createFileRoute } from "@tanstack/react-router";
import {
  BookCategoryScroll,
  type TBookCategory,
} from "../../components/dashboard/BookCategory";
import React from "react";
import { PopularBooks } from "../../components/dashboard/PopularBooks";

export const Route = createFileRoute("/(dashboard)/dashboard/discover")({
  component: RouteComponent,
});

function RouteComponent() {
  const [activeCat, setActiveCat] = React.useState("all");

  const categories: TBookCategory[] = [
    { id: "all", name: "All", icon: "📚" },
    { id: "novel", name: "Novel", icon: "📖" },
    { id: "bestsellers", name: "Bestsellers", icon: "🔥" },
    { id: "fiction", name: "Fiction", icon: "🦄" },
    { id: "biography", name: "Biography", icon: "👤" },
    { id: "history", name: "History", icon: "🏛️" },
    { id: "science", name: "Science", icon: "🔬" },
    { id: "fantasy", name: "Fantasy", icon: "🐉" },
  ];

  const popularBooks = [
    {
      id: "1",
      title: "The Midnight Library",
      author: "Matt Haig",
      coverImage: "/covers/midnight-library.jpg",
    },
    {
      id: "2",
      title: "Atomic Habits",
      author: "James Clear",
      coverImage: "/covers/atomic-habits.jpg",
    },
    {
      id: "3",
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      coverImage: "/covers/crawdads-sing.jpg",
    },
    {
      id: "4",
      title: "The Silent Patient",
      author: "Alex Michaelides",
      coverImage: "/covers/silent-patient.jpg",
    },
    {
      id: "5",
      title: "Educated",
      author: "Tara Westover",
      coverImage: "/covers/educated.jpg",
    },
    {
      id: "6",
      title: "Project Hail Mary",
      author: "Andy Weir",
      coverImage: "/covers/hail-mary.jpg",
    },
    {
      id: "7",
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      coverImage: "/covers/evelyn-hugo.jpg",
    },
    {
      id: "8",
      title: "Dune",
      author: "Frank Herbert",
      coverImage: "/covers/dune.jpg",
    },
    {
      id: "9",
      title: "The Song of Achilles",
      author: "Madeline Miller",
      coverImage: "/covers/achilles.jpg",
    },
    {
      id: "10",
      title: "Normal People",
      author: "Sally Rooney",
      coverImage: "/covers/normal-people.jpg",
    },
    {
      id: "11",
      title: "The Vanishing Half",
      author: "Brit Bennett",
      coverImage: "/covers/vanishing-half.jpg",
    },
    {
      id: "12",
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      coverImage: "/covers/klara-sun.jpg",
    },
  ];
  return (
    <div className="space-y-8">
      <BookCategoryScroll
        categories={categories}
        activeCategory={activeCat}
        onCategorySelect={setActiveCat}
      />
      {/* New PopularBooks section */}
      <PopularBooks books={popularBooks} />
    </div>
  );
}
