import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import queryString from "query-string";
import { injectIntl } from "react-intl";
import config from "../../config";
import SearchFilterView from "./SearchFilterView";
import { HistoryPropType } from "../../customPropTypes";

const { backendAddress } = config;

const SearchFilter = ({ history }) => {
  const [expand, setExpand] = useState(false);
  const [skillOptions, setSkillOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [urlSearchFieldValues, setUrlSearchFieldValues] = useState(null);

  const toggle = () => {
    setExpand(!expand);
  };

  /**
   * Updates the state value {urlSearchFieldValues} to the values in the URL query string,
   * to be used as initial values in the form for SearchFilterView
   */
  const getSearchFieldValues = useCallback(() => {
    // Gets the query string search values in an object
    const querySearchData = queryString.parse(history.location.search);

    // Formats the object according to the form object shape (there's no [] in names)
    const formatedQuerySearchData = Object.keys(querySearchData).reduce(
      (acc, key) => {
        if (key.includes("[]")) {
          let content = [];

          if (typeof querySearchData[key] !== "object") {
            content.push(querySearchData[key]);
          } else {
            content = querySearchData[key];
          }

          acc[key.slice(0, key.length - 2)] = content;
        } else {
          acc[key] = querySearchData[key];
        }

        return acc;
      },
      {}
    );

    setUrlSearchFieldValues(formatedQuerySearchData);
  }, [history.location.search]);

  useEffect(() => {
    // Fetches options for skills select field in advanced search
    const getSkills = async () => {
      try {
        const results = await axios.get(
          `${backendAddress}api/option/getDevelopmentalGoals`
        );
        return results.data;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return [];
      }
    };

    // Fetches options for branches select field in advanced search
    const getBranch = async () => {
      try {
        const results = await axios.get(
          `${backendAddress}api/option/getBranch`
        );
        return results.data.filter(
          (elem) => elem.description && elem.description.en
        );
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return [];
      }
    };

    // Fetches options for locations select field in advanced search
    const getLocation = async () => {
      try {
        const results = await axios.get(
          `${backendAddress}api/option/getLocation`
        );

        return results.data;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return [];
      }
    };

    // Fetches options for classifications select field in advanced search
    const getClassification = async () => {
      try {
        const results = await axios.get(
          `${backendAddress}api/option/getGroupLevel`
        );

        return results.data;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return [];
      }
    };

    const updateState = async () => {
      const skills = await getSkills();
      const branches = await getBranch();
      const locations = await getLocation();
      const classifications = await getClassification();
      setSkillOptions(skills);
      setBranchOptions(branches);
      setLocationOptions(locations);
      setClassOptions(classifications);
    };

    getSearchFieldValues();
    updateState();
  }, [getSearchFieldValues]);

  // page with query
  const handleSearch = (values) => {
    const query = queryString.stringify(values, { arrayFormat: "bracket" });
    const url = `/secured/results?${encodeURI(query)}`;
    history.push(url);
    window.location.reload();
  };

  return (
    <SearchFilterView
      history={history}
      skillOptions={skillOptions}
      branchOptions={branchOptions}
      locationOptions={locationOptions}
      classOptions={classOptions}
      handleSearch={handleSearch}
      toggle={toggle}
      urlSearchFieldValues={urlSearchFieldValues}
    />
  );
};

SearchFilter.propTypes = {
  history: HistoryPropType.isRequired,
};

export default injectIntl(SearchFilter);
