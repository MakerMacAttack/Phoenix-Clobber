import React, { useState, useEffect } from "react";
import axios from 'axios'

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  async function getLeaders() {
    const airtableURL = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE}/leaderboard`;
    const resp = await axios.get(airtableURL, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
      },
    });
    const unsortedLeaders = resp.data.records
    unsortedLeaders.sort((a, b) => {
      if (a.createdTime > b.createdTime) {
        return 1
      } else if (a.createdTime < b.createdTime) {
        return -1
      }
      return 0
    })
    // unsortedLeaders.sort((a, b) => {
    //   return a.fields.diff_int - b.fields.diff_int
    // })
    // unsortedLeaders.sort((a, b) => {
    //   return a.fields.turns - b.fields.turns
    // })
    setLeaders(unsortedLeaders)
  }

  getLeaders()

  // useEffect(() => {
  //   getJokes();
  // }, [fetchReviews]);

  return <h1>Leaderboard</h1>;
}
