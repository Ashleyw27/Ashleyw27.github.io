import React from "react";
import UserList from "../data/directory.json";

function UserInfo(props) {
  console.log(props)

  const resultsFirst = UserList.filter(user => user.name.first.toLowerCase().includes(props.search.toLowerCase()));

  return (
    <div className="text-center">
      {resultsFirst.length > 0 ? (
        <ul className="list-group">
          <h2>User Directory</h2>
          {resultsFirst.map(result => (
            <li className="list-group-item" key={result.id}>
              {result.picture} | <b>{result.name.first} {result.name.last}</b> | {result.gender} | {result.email} | {result.cell}
            </li>
          ))}
        </ul >
      ) : (
          <h2>No Results</h2>
        )}
    </div>
  );
}

export default UserInfo;
