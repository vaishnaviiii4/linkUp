import React, { useState } from "react";
import Message from "../utility/class";
let me = {
  name: "ali",
  marks: 200,
};
// let obj;
// obj.name = "ali";
// obj.marks = 100;
// let obj1;
// obj1.name = "ali2";
// obj1.marks = 1000;

var objs = [me];
objs.push(me);

var display = [<div>http</div>, <div>Not new</div>];
display.push(<div>new </div>);
const Test = () => {
  const [arr, setArr] = useState([<div>http</div>, <div>Not new</div>]);
  const [tests, setTests] = useState([]);
  const [msgs, setMsgs] = useState([]);

  // const msg = new Message("i", "how are you", 12);

  const hi = (a, b, c) => {
    const msg = new Message(a, b, c);
    const i = msg.search("ib");
    setArr([...arr, <p>value is: {i}</p>]);
    setMsgs([...msgs, msg]);
  };
  return (
    <div>
      <button onClick={() => setArr([...arr, <div>new after btn </div>])}>
        click
      </button>
      {arr.map((d) => {
        return <div>{d}</div>;
      })}
      <button onClick={() => setTests([...tests, me])}>click</button>
      {tests &&
        tests.map((d) => {
          return <div>{d.name}</div>;
        })}

      <button onClick={() => hi("i", "am good", 20)}>click Now</button>
      {msgs &&
        msgs.map((d) => {
          return <div>{d.sender}</div>;
        })}
    </div>
  );
};

export default Test;
