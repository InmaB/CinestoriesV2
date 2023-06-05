import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

function UserMenu() {
  const dropdownButtonRef = useRef(null);
  const chevronRef = useRef(null);
  const mainMenuRef = useRef(null);
  const [topMenu, setTopMenu] = useState(0);
  const [rightMenu, setRightMenu] = useState(0);

  useEffect(() => {
    const dropdownButton = dropdownButtonRef.current;
    const chevron = chevronRef.current;
    const buttonBoundingClientRect = dropdownButton.getBoundingClientRect();
    const chevronBoundingClientRect = chevron.getBoundingClientRect();
    const rightMenu = buttonBoundingClientRect.right - chevronBoundingClientRect.right;
    const topMenu = chevronBoundingClientRect.top - buttonBoundingClientRect.top;

    setTopMenu(topMenu);
    setRightMenu(rightMenu);
  }, []);

  const toggleDropdownMenu = () => {
    const dropdownMenu = mainMenuRef.current;
    if (dropdownMenu.classList.contains("open")) {
      dropdownMenu.style.top = `${topMenu}px`;
      dropdownMenu.style.right = `${rightMenu}px`;
    } else {
      dropdownMenu.style.top = `${dropdownButtonRef.current.clientHeight + 10}px`;
      dropdownMenu.style.right = '0';
    }

    dropdownMenu.classList.toggle("open");
  };

  return (
    <Contenido>
      <div className="dropdown-menu" id="dropdown-menu">
        <button ref={dropdownButtonRef} id="dropdown-button" onClick={toggleDropdownMenu}>
          <span className="material-symbols-outlined">
            person_pin_circle
          </span>
          Username
          <span ref={chevronRef} className="chevron material-symbols-outlined">
            expand_more
          </span>
        </button>
        <section ref={mainMenuRef} className="main-menu">
          <button>
            <span className="material-symbols-outlined"> person </span>
            Profile
          </button>
          <button>
            <span className="material-symbols-outlined">
              list_alt
            </span>
            Lists
          </button>
          <button>
            <span className="material-symbols-outlined">
              bookmark
            </span>
            Bookmark
          </button>
          <button>
            <span className="material-symbols-outlined">
              bolt
            </span>
            Moments
          </button>
          <button>
            <span className="material-symbols-outlined">
              explore
            </span>
            Explore
          </button>
          <button>
            <span className="material-symbols-outlined">
              settings
            </span>
            Settings
          </button>
          <button>
            <span className="material-symbols-outlined"> toggle_off </span>
            Sign Out
          </button>
        </section>
      </div>
    </Contenido>
  );
}

export default UserMenu;

const Contenido = styled.div`
  .dropdown-menu {
    position: relative;
    perspective: 200px;
  }

  .dropdown-menu button {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 0 16px;
    width: 230px;
    height: 72px;
    color: #fefefe;
    background: transparent;
    border-radius: 8px;
    border: 0;
    cursor: pointer;
    font-size: 16px;
    font-family: "Cambria";
  }

  .dropdown-menu > button {
    position: relative;
    z-index: 2;
    background: #00000073;
    transition: 0.3s;
  }

  .main-menu {
    position: absolute;
    overflow: hidden;
    z-index: 1;
    width: 100%;
    max-height: 0;
    opacity: 0;
    transform-origin: top right;
    border-radius: 8px;
    background: #00000073;
    transition: max-height 0.3s, opacity 0.4s;
  }

  .dropdown-menu.open .main-menu {
    max-height: 386px;
    opacity: 1;
  }

  .main-menu button {
    border: 0;
    width: 100%;
    height: 55px;
    border-radius: 0;
  }

  .main-menu button:hover {
    background: #00000042;
  }

  .chevron {
    margin-left: auto;
    transition: 0.4s;
  }

  .dropdown-menu.open .chevron {
    transform: rotate(180deg);
  }
`;
