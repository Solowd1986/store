import React from "react";

const Textarea = ({ classList, cols = 30, rows = 10 }) => (
    <textarea cols={cols} rows={rows} className={classList}/>
);

export default Textarea;


