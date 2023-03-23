import React from "react";
import "./styles.css";
import Header from "./components/Header";
import Input from "./components/Input";
import List from "./components/List";
import Footer from "./components/Footer";

export default function App() {
  const [listItems, setList] = React.useState(
    JSON.parse(localStorage.getItem("listItem")) || []
  );
  const [isDone, setIsDone] = React.useState(false);
  function add(inputText) {
    if (inputText !== "") {
      setList((prevState) => {
        return [...prevState, inputText];
      });
    } else {
      alert("Text field cannot be empty");
    }
  }

  function submit(event, inputText, setInputText) {
    if (event.key === "Enter") {
      add(inputText);
      setInputText("");
    }
  }

  function done(id) {
    setIsDone((prevState) => !prevState);
    const liEl = document.querySelectorAll("ul li");
    const liDone = liEl[id];
    if (isDone) {
      liDone.style.textDecoration = "line-through";
    } else {
      liDone.style.textDecoration = "none";
    }
  }

  function deleteList(id) {
    setList((prevState) => {
      return prevState.filter((item, index) => {
        done(id);
        return id !== index;
      });
    });
  }

  React.useEffect(() => {
    localStorage.setItem("listItem", JSON.stringify(listItems));
  }, [listItems]);

  return (
    <div className="App">
      <Header />
      <Input addItem={add} submit={submit} />
      <ul className="list">
        {listItems.map((item, index) => {
          return (
            <List
              key={index}
              id={index}
              listItem={item}
              click={done}
              onDelete={deleteList}
            />
          );
        })}
      </ul>
      <Footer />
    </div>
  );
}
