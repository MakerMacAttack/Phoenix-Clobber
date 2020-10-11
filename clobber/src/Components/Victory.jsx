import React, { useState } from "react";
import axios from 'axios';
import Reset from "./Reset";

export default function Victory(props) {
  const [name, setName] = useState("");

  async function submitLeader(victor) {
    const airtableURL = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE}/leaderboard`;
    await axios.post(
      airtableURL,
      { victor },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
        },
      }
    );
  }

  function handleSubmit() {
    const turns = (props.empty.length + 1) / 2;
    let difficulty = "";
    switch (props.diff) {
      case 0:
        difficulty = "Easy";
        break;
      case 1:
        difficulty = "Medium";
        break;
      case 2:
        difficulty = "Hard";
        break;
      case 3:
        difficulty = "2-player";
        break;
      default:
        difficulty = "Easy";
    }
    const victor = {
      name,
      turns,
      difficulty,
      diff_int: props.diff,
    };
    submitLeader(victor);
  }

  return (
    <>
      <div>
        <h1>Congrats, you beat a computer selecting moves at random.</h1>
        <h3>Please enter your 6 character name to be immortalized briefly.</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name"></label>
          <input
            id="name"
            type="text"
            required
            maxLength="8"
            placeholder="Your name here..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input type="submit"></input>
        </form>
      </div>
    </>
  );
}
