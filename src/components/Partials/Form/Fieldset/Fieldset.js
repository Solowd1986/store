import React from "react";

const Fieldset = ({ classList, children }) => (
    <fieldset className={classList}>
        {children}
    </fieldset>
);

export default Fieldset;
