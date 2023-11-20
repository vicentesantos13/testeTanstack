import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
type Genre = {
  id: number;
  name: string;
};
export default function Home() {
  const getGenres = async (): Promise<Genre[]> => {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=pt",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWQwMDJlYjc5MGMyMjlkNzZmOTIwMmNiZDg0NjRkNSIsInN1YiI6IjY1NTY3ODRiNTM4NjZlMDExYzA3ZjhmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eHs4DnB-NmhkgAlET3vi_xGeow7bUV72q0rmLzJdfvc",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erro na requisição GET");
    }

    const data = await response.json();

    return data.genres;
  };

  const genres = () => {
    const query = useQuery({
      queryKey: ["movies"],
      queryFn: getGenres,
    });
    return query;
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
