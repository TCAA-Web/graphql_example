import { useQuery } from "@tanstack/react-query";
import { getPersons } from "../queries/getPersons";
import { request } from "graphql-request";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react'

export const Main = () => {

  const [inputText, setInputText] = useState("")
  const [searchData, setSearchData] = useState()

  const {data, isLoading, error} = useQuery({
    queryKey: ["getStarWarsPersons"],
    queryFn: async () =>
      request(
        `https://swapi-graphql.netlify.app/.netlify/functions/index`,
        getPersons
      ),
  });

  function search() {
    let clone = data.allPeople.people.map((i) => i)
    let result = clone.filter((item) => item.name.toLowerCase().includes(inputText.toLowerCase()))
    setSearchData(result)
  }

  useEffect(() => {
    if (inputText == ""){
      setSearchData()
    }
  },[inputText])
  

  if (isLoading) return <p>Loading...</p>

  if (error) return <p>Error: {error.message}</p>;

  return (
    <section style={{display: "grid", justifyItems: "center"}}>
      <div style={{display: "grid", alignContent:"center", gridTemplateColumns: "1fr", width: "20%", marginBottom: "5%"}}>
        <input placeholder="Search" onChange={(event) => setInputText(event.target.value)}></input>
        <button onClick={() => search()}>Search</button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          textAlign: "left",
        }}
      >
        {!searchData ? data.allPeople.people.map((item, i) => {
          return <Link to={`/person/${item.id}`} key={i}>{item.name}</Link>;
        }) : searchData.map((item, i) => {
          return <Link to={`/person/${item.id}`} key={i}>{item.name}</Link>;
        })}
      </div>
    </section>
  );
};