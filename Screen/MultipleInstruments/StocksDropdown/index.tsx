import React, { ChangeEvent, useEffect, useRef, useState } from "react";

import styles from "./StocksDropdown.module.css";

const StocksDropdown = (props: DropdownProps) => {
  const { label, options, selectedValues, onDropdownValueChange } = props;

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionToggle = (option: string) => {
    const newSelectedValues = selectedValues.includes(option)
      ? selectedValues.filter((value) => value !== option)
      : [...selectedValues, option];
    onDropdownValueChange(newSelectedValues);
  };

  console.log(selectedValues);
  
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    handleOptionToggle(option);
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <label> {label} </label>

      <div className={styles.dropdownToggle} onClick={() => setIsOpen(!isOpen)}>
        {selectedValues.length > 0
          ? `${selectedValues.length} selected`
          : "Select option(s)"}
        {isOpen ? <span> &#9651; </span> : <span> &#9661; </span>}
      </div>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {options.map((option) => (
            <li key={option} onClick={() => handleOptionToggle(option)}>
              <input
                type="checkbox"
                value={option}
                checked={selectedValues.includes(option)}
                onChange={handleCheckboxChange}
              />
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

type DropdownProps = {
  label: string;
  options: string[];
  selectedValues: string[];
  onDropdownValueChange: (values: string[]) => void;
};

export default StocksDropdown;
