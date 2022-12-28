import React from "react";
import PropTypes from "prop-types";
import { LocaleConsumer } from "../contexts/LocaleContext";

const SearchBar = ({ keyword, keywordChange }) => {
  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <input
            className="search-bar"
            type="text"
            placeholder={
              locale === "id" ? "Cari berdasarkan nama" : "Search by name"
            }
            value={keyword}
            onChange={(event) => keywordChange(event.target.value)}
          />
        );
      }}
    </LocaleConsumer>
  );
};

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default SearchBar;
