import { useQuery } from "@tanstack/react-query";
import { getPersons } from "../queries/getPersons";
import { request } from "graphql-request";

export const Main = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getStarWarsPersons"],
    queryFn: async () =>
      request(
        `https://swapi-graphql.netlify.app/.netlify/functions/index`,
        getPersons
      ),
  });

  console.log(data);

  if (isLoading) return <p>Loading...</p>

  if (error) return <p>Error: {error.message}</p>;

  return (
    <section>
      <h1>Hello Mainpage</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          textAlign: "left",
        }}
      >
        {data.allPeople.people.map((item, i) => {
          return <p key={i}>{item.name}</p>;
        })}
      </div>
    </section>
  );
};
