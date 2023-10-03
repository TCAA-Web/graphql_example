import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import { Link, useParams } from "react-router-dom";
import { getPerson } from "../queries/getPerson";

export const Person = () => {
  const { id } = useParams();
  console.log("id", id);

  const { data, isLoading, error } = useQuery({
    queryKey: ["StarWarsPerson"],
    queryFn: async () =>
      request(
        `https://swapi-graphql.netlify.app/.netlify/functions/index`,
        getPerson,
        { personId: id }
      ),
  });

  console.log("Person", data)

  if (isLoading) return <p>loading....</p>

  if (error) return <p>error: {error.message}</p>

  return (
    <div>
      <div style={{display: "grid", textAlign:"start"}}>
        <h2>Name: {data.person.name}</h2>
        <p>Hair Color: {data.person.hairColor}</p>
        <p>Eye Color: {data.person.eyeColor}</p>
        <p>Height: {data.person.height}</p>
        <p>Species: {data.person.species && data.person.species.name ? data.person.species.name : "Unknown"}</p>
      </div>
      <button><Link to="/">BACK</Link></button>
    </div>
  );
};
