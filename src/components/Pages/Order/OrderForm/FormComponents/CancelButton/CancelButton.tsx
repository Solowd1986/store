import React from "react";

const CancelButton = ({ handler, classList = "" }: { handler: () => void, classList: string }): JSX.Element => (
    <span onClick={handler} className={classList}><span>&times;</span></span>
);

export default CancelButton;
