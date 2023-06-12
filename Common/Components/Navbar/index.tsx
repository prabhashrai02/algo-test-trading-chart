import React, { useState } from "react";

import styles from './navbar.module.css';

const Navbar = (props: NavbarProps) => {
  const { items, setActiveComponent } = props;

  const [active, setActive] = useState(0);

  const handleComponentChange = (index: number) => {
    setActive(index);
    setActiveComponent(index);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src={''} alt="Logo" className={styles.logo} />
      </div>
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            className={active === index ? styles.active : ""}
            onClick={() => handleComponentChange(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
};

type NavbarProps = {
  items: string[];
  setActiveComponent: (index: number) => void;
};

export default Navbar;


