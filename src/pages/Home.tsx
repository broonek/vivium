import React from "react";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import LoadingModal from "../components/LoadingModal";
import { IModalError } from "../utils/Interfaces";

const Home = () => {
  const [driversData, setDriversData] = useState<{}[]>([]);
  const [isLoadingModalShow, setIsLoadingModalShow] = useState<boolean>(false);
  const [isError, setIsError] = useState<IModalError>({
    isError: false,
    message: "",
  });

  const filterDriversData = (drivers: {}[]) => {
    const filteredDrivers = drivers.map((driver: any) => ({
      position: driver.position,
      constructorName: driver.Constructors[0].constructorId,
      name: driver.Driver.givernName,
      lastname: driver.Driver.familyName,
      driverNumber: driver.Driver.permanentNumber,
      points: driver.points,
      wins: driver.wins,
      dateOfBirth: driver.Driver.dateOfBirth,
      nationality: driver.Driver.nationality,
    }));
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
      <LoadingModal show={isLoadingModalShow} />
      {modalError}
    </>
  );
};

export default Home;
