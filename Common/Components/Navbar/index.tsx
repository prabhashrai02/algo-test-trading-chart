import React, { useState } from "react";

import styles from './navbar.module.css';

const Navbar = (props: NavbarProps) => {
  const { items, setActiveComponent } = props;

  const [active, setActive] = useState(0);

  const handleComponentChange = (index: number) => {
    setActive(index);
    setActiveComponent(index);
  };

  const navbarIcon = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7BauojTckyQJPcHluc2t7b8ZgKIzxO8lQMfWZoUZFnA&ec=48665701`;

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src={navbarIcon} alt="Logo" className={styles.logo} />
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


