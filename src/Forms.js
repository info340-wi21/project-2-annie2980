import React, { useState } from 'react';

export function AddRecipeForm() {
  return (
    <div>
      <form>
        <div>Enter Recipe Name:</div>
        <input></input>
        {/* how to add multiple steps? */}
        <div>Enter Steps:</div>
        <input></input>
        <button className="btn">Add Step</button>
        <div></div>
      </form>
    </div>
  );
}