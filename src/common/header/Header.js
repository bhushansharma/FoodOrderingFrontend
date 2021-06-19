import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  Button,
  Menu,
  MenuItem
} from "@material-ui/core";
import { Fastfood, Search, AccountCircle } from "@material-ui/icons";
import LoginModal from "../modal/Login";
import "./Header.css";

const Header = props => {
  const [openLoginModal, setLoginModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const customerClickHandler = event => {
    setAnchorEl(event.currentTarget);
  };

  
  const menuCloseWindowHandler = () => {
    setAnchorEl(null);
  };

  const onLogoutCustomer = () => {
    menuCloseWindowHandler();
    localStorage.clear();
    sessionStorage.clear();
    if (props.history
      && (props.history.location.pathname === '/checkout'
        || props.history.location.pathname === '/profile')) {
      props.history.push('/');
    }
  }

  const loggedInDetail = localStorage.getItem("user-information")
    ? JSON.parse(localStorage.getItem("user-information"))
    : null;

  const onProfileLinkClick = () => {
    props.history.push('/profile');
  }

  return (
    <header id="header">
      <LoginModal
        visible={openLoginModal}
        onClose={() => setLoginModal(false)}
      />

      <div className="header-container">
        <div className="header-logo">
          <Fastfood />
        </div>
        {props.isHomePage ? (
          <div className="header-search">
            <TextField
              id="input-with-icon-textfield"
              placeholder="Search by Restaurant Name"
              variant="filled"
              value={props.searchVal}
              onChange={e => props.onSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                )
              }}
            />
          </div>
        ) : (
          <div style={{ height: 5 }}></div>
        )}
        <div className="header-action">
          {loggedInDetail &&
            loggedInDetail.message === "LOGGED IN SUCCESSFULLY" ? (
            <div className="user-avatar">
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={customerClickHandler}
                style={{ textTransform: "none" }}
              >
                <AccountCircle /> {loggedInDetail.first_name}
              </Button>
              <Menu
                id="simple-menu"
                elevation={0}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={menuCloseWindowHandler}
              >
                <MenuItem onClick={onProfileLinkClick}>My Profile</MenuItem>
                <MenuItem onClick={onLogoutCustomer}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button className="header-login" onClick={() => setLoginModal(true)} >
              <AccountCircle /> Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;