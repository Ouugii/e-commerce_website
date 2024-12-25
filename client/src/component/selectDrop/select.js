import React, { useState } from "react";
import "../selectDrop/select.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
const Select = ({ data }) => {
  const [isOpenSelect, setisOpenSelect] = useState(false);
  const [selectedIndex, setselectedIndex] = useState(0);
  const [selectedItem, setselectedItem] = useState("Tất cả");
  const openSelect = () => {
    setisOpenSelect(!isOpenSelect);
  };

  const closeSelect = (index, name) => {
    setselectedIndex(index);
    setisOpenSelect(false);
    setselectedItem(name);
  };
  return (
    <>
      <ClickAwayListener onClickAway={() => setisOpenSelect(false)}>
        <div className="selectDrop">
          <span className="openSelect" onClick={openSelect}>
            {selectedItem}{" "}
            <FontAwesomeIcon
              icon={faCaretDown}
              style={{ padding: " 0px 5px" }}
            />
          </span>
          {isOpenSelect === true && (
            <div className="selectDropp">
              <div className="searchField">
                <input type="text" placeholder="Tìm kiếm" />
              </div>
              <ul className="searchResults">
                {data.map((item, index) => {
                  return (
                    <li
                      onClick={() => closeSelect(index, item)}
                      className={`${selectedIndex === index ? `active` : ``}`}
                    >
                      {item}
                    </li>
                  );
                })}

                {/* <li
                onClick={() => closeSelect(0, "Tất cả")}
                className={`${selectedIndex === 0 ? `active` : ``}`}
              >
                Tất cả
              </li> */}
              </ul>
            </div>
          )}
        </div>
      </ClickAwayListener>
    </>
  );
};

export default Select;
