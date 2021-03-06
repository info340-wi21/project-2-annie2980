import React from 'react';

// Represents the stats table
export function StatsTable(props) {
  /*
    Props:
    - totalTime: total amount of time (in seconds) spent baking
    - totalDays: total days
    - totalBake: total number of bakes
  */
  const { totalTime, totalDays, totalBakes } = props;
  let totalHours = totalTime / 3600; // convert seconds to hours
  return (
    <table className="table mt-3" aria-label="list of baking statistics">
      <thead>
        <tr>
          <th className="stats-header" colSpan="2">Here Are Some Fun Statistics!</th>
        </tr>
      </thead>
      <tbody id="stats-body">
        <tr>
          <td>Total Time Spent Making Food:</td>
          <td className="stats-data stats-total-time">{ totalHours.toFixed(2) + " Hours" }</td>
        </tr>
        <tr>
          <td>Average Number of Bakes Per Day:</td>
          <td className="stats-data stats-avg-bakes">{ (totalBakes / totalDays).toFixed(2) + " Bakes" }</td>
        </tr>
        <tr>
          <td>Average Amount of Time Spent Baking Per Day:</td>
          <td className="stats-data stats-avg-time">{ (totalHours / totalDays).toFixed(2) + " Hours" }</td>
        </tr>
      </tbody>
    </table>
  );
}
