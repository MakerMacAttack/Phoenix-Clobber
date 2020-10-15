import React from 'react';
import { useHistory } from 'react-router-dom'

export default function Reset() {
  const history = useHistory()
  return <button onClick={() => history.push("/")}>Reset</button>
}