import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Leaderboard(props) {
  const [leaders, setLeaders] = useState([]);
  const [unsorted, setUnsorted] = useState([]);

  async function getLeaders() {
    const airtableURL = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE}/leaderboard`;
    const resp = await axios.get(airtableURL, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
      },
    });
    setUnsorted(resp.data.records);
  }

  function sortLeaders(list) {
    list.sort((a, b) => {
      if (a.createdTime > b.createdTime) {
        return 1;
      } else if (a.createdTime < b.createdTime) {
        return -1;
      }
      return 0;
    });
    list.sort((a, b) => {
      return a.fields.turns - b.fields.turns;
    });
    list.sort((a, b) => {
      return b.fields.diff_int - a.fields.diff_int;
    });
    list.splice(20);
    setLeaders(list);
  }

  function handleClick(diff) {
    // getLeaders(); // If I can get the list to populate at the start I shouldn't need this.
    const list = unsorted.filter((leader) => leader.fields.diff_int === diff);
    sortLeaders(list);
  }

  useEffect(() => {
    sortLeaders(unsorted);
  }, [unsorted])

  useEffect(() => {
    getLeaders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="leader">
      <button id="close-instructions" onClick={() => props.set(false)}>X</button>
      <h1>Leaderboard</h1>
      {/* <h2>
        Past winners, with the difficulty and the number of moves it took to
        win.
      </h2> */}
      <h3>Click on a button to view only results from a certain difficulty.</h3>
      <button onClick={() => handleClick(0)}>Easy</button>
      <button onClick={() => handleClick(1)}>Medium</button>
      <button onClick={() => handleClick(2)}>Hard</button>
      <button onClick={() => handleClick(3)}>2 Player</button>
      <button onClick={() => sortLeaders(unsorted)}>All</button>
      <ul id="winners">
        <li>
          <span>Name</span>
          <span>Difficulty</span>
          <span>Turns</span>
        </li>
        {leaders.map((leader) => (
          <li key={leader.id}>
            <span>{leader.fields.name}</span>
            <span>{leader.fields.difficulty}</span>
            <span>{leader.fields.turns}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
