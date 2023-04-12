import Router from "next/router";
import { useEffect, useState } from "react";
const color = ["red", "black", "blue"];
export default function img() {
  const [checke, setChecke] = useState([]);

  const handleChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setChecke((pre) => [...pre, value]);
    } else {
      setChecke((pre) => {
        return [...pre.filter((color) => color !== value)];
      });
    }
  };
  useEffect(() => {
    if (checke.length > 0) {
      const url = checke.join(",");
      Router.push({
        pathname: "/img",
        query: { color: url },
      });
    } else {
      Router.push({
        pathname: "/img",
      });
    }
  }, [checke]);

  const handlevalue = (value) => {
    let inp = document.getElementById(value);
    inp.checked = false;
    let obj = checke.filter((chck) => chck !== value);
    setChecke(obj);
  };
  return (
    <div className="app">
      {color.map((color, index) => {
        return (
          <div key={index}>
            <input
              type="checkbox"
              id={color}
              value={color}
              onChange={handleChange}
            />
            {color}
          </div>
        );
      })}

      <div>
        {checke.map((value) => {
          return <button onClick={() => handlevalue(value)}>{value}</button>;
        })}
      </div>
    </div>
  );
}
