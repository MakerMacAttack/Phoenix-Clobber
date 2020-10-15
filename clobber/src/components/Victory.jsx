import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Reset from "./Reset";

export default function Victory(props) {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitLeader = async (fields) => {
    const airtableURL = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE}/leaderboard`;
    await axios.post(
      airtableURL,
      { fields },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
        },
      }
    );
  };

  function handleSubmit(e) {
    e.preventDefault();
    const turns = (props.empty.length - 1) / 2;
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
    setSubmitted(true);
  }

  return (
    <>
      {props.won ? (
        <div>
          <div style={{ display: submitted ? "none" : "box" }}>
            <h1>Congrats, you beat a computer selecting moves at random.</h1>
            <h3>
              Please enter your 6 character name to be immortalized briefly.
            </h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name"></label>
              <input
                id="name"
                type="text"
                required
                maxLength="6"
                placeholder="Your name here..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
              <input type="submit"></input>
            </form>
          </div>
          <div style={{ display: submitted ? "box" : "none" }}>
            <Reset />
          </div>
        </div>
      ) : (
        <>
          <h1 id="cheater-head">Cheater. Get back to </h1>
            <Link id="cheater-link" to="/">the Homepage</Link>
            <p>There once was a man named Bertold</p>
            <p>who drank beer when the weather grew cold.</p>
            <p>As he reached for his cup,</p>
            <p>NEVER GONNA GIVE YOU UP</p>
            <p>Oh snap! You just got limerickrolled!</p>
            {/* This rickroll was a solid idea but it's taking way too much time and effort to deal with the errors of embedding a youtube clip. */}
            {/* <iframe
              title="Cheater"
            width="860"
            height="645"
            src="https://www.youtube.com/embed/DLzxrzFCyOs"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe> */}
        </>
      )}
    </>
  );
}
