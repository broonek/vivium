import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from "react";

import { LocalizationProvider, DatePicker } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import { IDrivers } from "../utils/Interfaces";
import { Input } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { teamsName as constructors } from "../utils/F1Teams";
import { useDispatch } from "react-redux";

const FilterDriverData: React.FC<{ drivers: IDrivers[] }> = ({ drivers }) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const dispatch = useDispatch();
  const [searchingDrivers, setSearchingDrivers] = useState<IDrivers[]>([]);

  const [searchingBirthDateFrom, setSearchingBirthDateFrom] = useState<Date>(
    new Date(70)
  );
  const [searchingBirthDateTo, setSearchingBirthDateTo] = useState<Date>(
    new Date()
  );
  const [searchingTeamsName, setSearchingTeamsName] = useState<string[]>([
    "Haas",
    "Alfa Romeo",
    "AlphaTauri",
    "Alpine",
    "Aston Martin",
    "Ferrari",
    "McLaren",
    "Mercedes",
    "Red Bull",
    "Williams",
  ]);
  const [searchingDriverName, setSearchingDriverName] = useState<string>("");
  const handleTeamChange = (
    event: SelectChangeEvent<typeof searchingTeamsName>
  ) => {
    const {
      target: { value },
    } = event;
    setSearchingTeamsName(typeof value === "string" ? value.split(",") : value);
  };
  const handleDriverChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchingDriverName(event.target.value);
  };
  useEffect(() => {
    const searchingTeams = searchingTeamsName
      .map((searchingTeamName) =>
        constructors.find(
          (constructor) => constructor.name === searchingTeamName
        )
      )
      .map((x) => x?.id);
    const searchingDrivers = drivers.filter(
      (driver) =>
        driver.name.toUpperCase().includes(searchingDriverName.toUpperCase()) &&
        searchingTeams.includes(driver.constructorName) &&
        driver.dateOfBirth >= searchingBirthDateFrom &&
        driver.dateOfBirth <= searchingBirthDateTo
    );
    setSearchingDrivers(searchingDrivers);
  }, [
    searchingBirthDateFrom,
    searchingBirthDateTo,
    searchingTeamsName,
    searchingDriverName,
  ]);

  useEffect(() => {
    dispatch({ type: "setFilteredData", payload: searchingDrivers });
  }, [searchingDrivers]);

  useEffect(() => {
    dispatch({ type: "setFilteredData", payload: drivers });
  }, [drivers]);
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid
          padding={"30px"}
          container
          spacing={{ xs: 1, sm: 2, md: 4 }}
          maxWidth={"1150px"}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={6} md={3}>
            <DatePicker
              disableFuture
              label="Birth date from"
              openTo="year"
              views={["year", "month", "day"]}
              value={searchingBirthDateFrom}
              maxDate={searchingBirthDateTo}
              onChange={(newValue) => {
                setSearchingBirthDateFrom(newValue || new Date());
              }}
              renderInput={(params) => (
                <TextField variant="standard" fullWidth={true} {...params} />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DatePicker
              disableFuture
              label="Birth date to"
              openTo="year"
              views={["year", "month", "day"]}
              value={searchingBirthDateTo}
              minDate={searchingBirthDateFrom}
              onChange={(newValue) => {
                setSearchingBirthDateTo(newValue || new Date());
              }}
              renderInput={(params) => (
                <TextField variant="standard" fullWidth={true} {...params} />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              variant="standard"
              fullWidth
              label="Find driver"
              value={searchingDriverName}
              onChange={handleDriverChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <InputLabel id="teams-checkbox">Teams</InputLabel>
            <Select
              variant="standard"
              fullWidth
              labelId="dteams-checkbox"
              id="demo-multiple-checkbox"
              multiple
              value={searchingTeamsName}
              onChange={handleTeamChange}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {constructors.map((constructor) => (
                <MenuItem key={constructor.name} value={constructor.name}>
                  <Checkbox
                    checked={
                      searchingTeamsName.indexOf(constructor.name) !== -1
                    }
                  />
                  <ListItemText primary={constructor.name} />
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </div>
    </LocalizationProvider>
  );
};

export default FilterDriverData;
