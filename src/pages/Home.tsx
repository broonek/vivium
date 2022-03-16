import React from "react";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import LoadingModal from "../components/LoadingModal";
import { cities } from "../utils/CityList";
import { IModalError } from "../utils/Interfaces";
import { APIKEY } from "../utils/ApiKey";

const Home = () => {
  const [weatherData, setweatherData] = useState<{}[]>([]);
  const [isLoadingModalShow, setIsLoadingModalShow] = useState<boolean>(false);
  const [isError, setIsError] = useState<IModalError>({
    isError: false,
    message: "",
  });

  const filterWeatherData = (cities: {}[]) => {
    console.log(Array.isArray(cities));
    const filteredCities = cities.filter((item: any) => item !== undefined);
    console.log(filteredCities);
  };
  const setModalErrorMessage = (statusText: string, city?: string) => {
    let errorMessage = "";
    switch (statusText) {
      case "Not Found":
        errorMessage = `could not find city: ${city}`;
        break;
      case "Unauthorized":
        errorMessage = "Unauthorized access";
        break;
      default:
        errorMessage = statusText;
    }
    setIsError({
      isError: true,
      message: errorMessage,
    });
  };
  const fetchWeatcher = async () => {
    setIsLoadingModalShow(true);
    const promises = await Promise.all(
      cities.map((city) =>
        fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}
        `
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            setModalErrorMessage(response.statusText, city);
          })
          .catch((err) => {
            setModalErrorMessage(err.message);
          })
      )
    );
    setIsLoadingModalShow(false);
    filterWeatherData(promises);
  };
  useEffect(() => {
    fetchWeatcher();
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
