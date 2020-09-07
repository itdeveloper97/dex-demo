import React, {useState, useEffect} from "react";
import s from "./SearchElement.module.css";
import btn from "../../../assets/commonStyles/Button.module.css";

function SearchElement(props) {

  const[search, changeSearch] = useState("");

  function onSend() {
    props.send(search);
  }

  useEffect(() => {

    return () => {
      props.send("");
    }
  }, [])

  return (
    <div className={s.search}>
      <input
        type="text"
        value={search}
        onChange={(e) =>  {
          changeSearch(e.target.value)
        }}
        className={`${s.flex1}`}
      />
      <button
        onClick={onSend}
        className={`${btn.greenBtn} ${s.flex2}`}
      >
        Поиск
      </button>
    </div>
  )
}

export default SearchElement;