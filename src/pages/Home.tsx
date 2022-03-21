import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../components/Modal";
import LoadingModal from "../components/LoadingModal";
import DataTable from "../components/DataTable";
import FilterDriverData from "../components/FilterDriverData";
import { IModalError, IDrivers, IfilteredDrivers } from "../utils/Interfaces";
import { useDispatch } from "react-redux";
import CustomBtn from "../components/CustomBtn";
import LogoutIcon from "@mui/icons-material/Logout";

const Home = () => {
  const dispatch = useDispatch();
  const [driversData, setDriversData] = useState<IDrivers[]>([]);
  const [isLoadingModalShow, setIsLoadingModalShow] = useState<boolean>(false);
  const [filteredDrivers, setfilteredDrivers] = useState<IDrivers[]>([]);
  const [isError, setIsError] = useState<IModalError>({
    isError: false,
    message: "",
  });

  const isFiltered = useSelector(
    (state: IfilteredDrivers) => state.DriverDataReducer
  );
  useEffect(() => {
    setfilteredDrivers(isFiltered);
  }, [isFiltered]);

  const logoutUser = () => {
    dispatch({ type: "setUnAuth" });
  };
  const filterDriversData = (drivers: {}[]) => {
    const filteredDrivers = drivers.map(
      (driver: any): IDrivers => ({
        id: ~~driver.position,
        position: ~~driver.position,
        constructorName: driver.Constructors[0].constructorId,
        name: driver.Driver.givenName.concat(" ", driver.Driver.familyName),
        driverNumber: ~~driver.Driver.permanentNumber,
        points: ~~driver.points,
        wins: ~~driver.wins,
        dateOfBirth: new Date(driver.Driver.dateOfBirth),
        nationality: driver.Driver.nationality,
      })
    );
    return filteredDrivers;
  };

  const fetchData = async () => {
    setIsLoadingModalShow(true);
    const f1Data = await fetch(
      "http://ergast.com/api/f1/2021/driverStandings.json"
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw "Something went wrong";
      })
      .catch((err) => {
        setIsError({
          isError: true,
          message: err.message || err,
        });
      });

    const driverStandings =
      f1Data?.MRData?.StandingsTable?.StandingsLists[0]?.DriverStandings;
    driverStandings
      ? setDriversData(filterDriversData(driverStandings))
      : setIsError({
          isError: true,
          message: "Driver data is empty",
        });
    setIsLoadingModalShow(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const clearAllErrors = () => {
    setIsError((prevState) => ({
      ...prevState,
      isError: false,
    }));
  };
  const modalError = (
    <Modal
      show={isError.isError}
      severity="error"
      message={isError.message}
      onClose={() => {
        clearAllErrors();
      }}
    />
  );
  return (
    <>
      <CustomBtn
        sx={{
          p: 0,
          pr: "8px",
          m: 2,
          lineHeight: 1.2,
          position: "absolute",
          right: 0,
          width: 30,
          height: 30,
          minWidth: 30,
          transition: ".3s width",
          justifyContent: "flex-end",
          "&:hover": {
            cursor: "pointer",
            width: 110,
          },
        }}
        color="basic"
        variant="contained"
        endIcon={<LogoutIcon />}
        onClick={() => logoutUser()}
      >
        Logout
      </CustomBtn>
      <FilterDriverData drivers={driversData} />
      <DataTable drivers={filteredDrivers} />
      <LoadingModal show={isLoadingModalShow} />
      {modalError}
    </>
  );
};

export default Home;
