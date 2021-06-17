import React, { useState } from "react";
import Select from "react-select";

export const SelectDate = (props) => {
  const [text, setText] = useState(props.options[0]);

  const onChange = (selectedOption) => {
    setText(selectedOption);
    console.log("Option Selected:", selectedOption);
  };

  console.log("Initial Option Selected:", text);

  return <Select options={props.options} onChange={onChange} value={text} />;
};
