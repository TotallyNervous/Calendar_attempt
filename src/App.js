import "./styles.css";
import React, { useState } from "react";
import {
  format,
  formatDistance,
  formatRelative,
  subDays,
  getTime,
  addDays,
  addMonths,
  getMonth,
  startOfMonth,
  fromUnixTime,
  differenceInMilliseconds,
  differenceInDays
} from "date-fns";
import Select from "react-select";
import { SelectDate } from "./SelectDate";

export default function App() {
  format(new Date(), "'Today is a' eeee");
  //=> "Today is a Sunday"

  formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true });
  //=> "3 days ago"

  formatRelative(subDays(new Date(), 3), new Date());
  //=> "last Friday at 7:26 p.m."

  const timeOne = fromUnixTime(1623049200);
  const stringOne = timeOne.toString();

  const timeTwo = fromUnixTime(1623135600);
  const stringTwo = timeTwo.toString();

  const result = differenceInMilliseconds(timeTwo, timeOne);

  //

  const monthBegin = startOfMonth(new Date());
  const addedMonth = addDays(monthBegin, 14);
  const nextMonth = addMonths(monthBegin, 1);
  const endNextMonth = addDays(nextMonth, 14);
  const monthDifference = differenceInDays(endNextMonth, addedMonth);

  console.log("start of rota:", addedMonth);
  console.log("end of rota:", endNextMonth);

  //------------------------------

  const [rotaMonths, setRotaMonths] = useState([
    {
      id: 0,
      start_date: "15-07-15",
      end_date: "14-08-15",
      value: "15 Jul - 14 Aug",
      label: "15 Jul - 14 Aug"
    },
    {
      id: 1,
      start_date: "15-06-15",
      end_date: "14-07-15",
      value: "15 Jun - 14 Jul",
      label: "15 Jun - 14 Jul"
    }
  ]);

  console.log("The rotaMonths:", rotaMonths);

  //------------------------------

  const [theOptions, setTheOptions] = useState([]);

  const [value, setValue] = useState("");

  function runIt(e) {
    setValue(e.target.value);
    console.log(value);
  }

  function handleAdd() {
    const newOptions = theOptions.concat({ label: value, value: value });
    setTheOptions(newOptions);
    console.log("The Options Are:", theOptions);
  }

  //------------------------------

  const initialRows = [];

  for (let id = 0; id < monthDifference; id++) {
    const dateValue = addDays(addedMonth, id);
    const dateName = format(addDays(addedMonth, id), "EEEE do LLLL");
    initialRows.push({ id: id, date_value: dateValue, date_name: dateName });
  }

  const [calendarRows, setCalendarRows] = useState(initialRows);

  console.log("calendar rows", initialRows);

  //------------------------------

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <p>{formatDistance}</p>
      <p>{result}</p>
      <p>{stringOne}</p>
      <p>{stringTwo}</p>
      <p>Start Month: {monthBegin.toString()}</p>
      <p>Start of Timesheet Month: {addedMonth.toString()}</p>
      <p>End of Timesheet Month: {endNextMonth.toString()}</p>
      <p>Difference in Days: {monthDifference.toString()}</p>
      <input value={value} onChange={runIt} />
      <button onClick={handleAdd}>Save</button>
      <>
        {calendarRows.map((e, i) => (
          <p>{e.date_name}</p>
        ))}
      </>
      <SelectDate options={rotaMonths} />
    </div>
  );
}
