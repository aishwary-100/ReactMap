import React from 'react';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.title}>Vehicle Movement Tracker</h1>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#282c34',
    padding: '10px',
    color: 'white',
    textAlign: 'center',
  },
  title: {
    margin: 0,
    fontSize: '24px',
  },
};

export default Navbar;
