import { useQuery } from "@tanstack/react-query";
import { getPersons } from "../queries/getPersons";
import { request } from "graphql-request";
import { Link } from "react-router-dom";

export const Main = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getStarWarsPersons"],
    queryFn: async () =>
      request(
        `https://swapi-graphql.netlify.app/.netlify/functions/index`,
        getPersons
      ),
  });

  if (isLoading) return <p>Loading...</p>

  if (error) return <p>Error: {error.message}</p>;

  return (
    <section>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          textAlign: "left",
        }}
      >
        {data.allPeople.people.map((item, i) => {
          return <Link to={`/person/${item.id}`} key={i}>{item.name}</Link>;
        })}
      </div>
    </section>
  );
};
