import Router from "next/router";
import { useEffect, useState } from "react";
const color = ["red", "black", "blue"];
export default function Img() {
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

      <img src="https://poolandsave.nyc3.digitaloceanspaces.com/d9b6dbd4-55a9-4a94-8c4d-772e56d0f1a4IMG_20220714_212040.jpg" />

      <div>
        {checke.map((value,index) => {
          return <button key={index} onClick={() => handlevalue(value)}>{value}</button>;
        })}
      </div>
    </div>
  );
}
