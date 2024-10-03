import { useEffect, useState } from "react";
import Country from "./Country";
import Header from "./Header";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCountries, setFilterCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const fetchData = await fetch("https://restcountries.com/v3.1/all");
      const data = await fetchData.json();
      setCountries(data);
      setFilterCountries(data);
    };
    fetchCountries();
  }, []);

  // Search:
  const handleSearchChange = (event)=>{
    const value = event.target.value;
    setSearchQuery(value);
        const filtered = countries.filter(country=>{
      return country?.name?.common.toLowerCase().includes(value.toLowerCase());
    })
    setFilterCountries(filtered);
  }

  // filter countries:
  const filterCountry = ({ region, name: { common } }) => {
    if (
      region === "Americas" ||
      region === "Europe" ||
      common === "India" ||
      common === "Israel"
    ) {
      return false;
    } else {
      return true;
    }
  };

  // sort by population:
  const isSort = (a, b) => {
    return b.population - a.population;
  };

  // Btn click and Modal :
  const handleCountryDetails = (country) => {
    const countryCurrencies = Object.entries(country?.currencies || {}).map(
      (currency) => {
        const [code, { name, symbol }] = currency;
        return { code, name, symbol };
      }
    );

    const countryLanguages = Object.entries(country?.languages || {}).map(
      (language) => {
        const [code, name] = language;
        return { code, name };
      }
    );

    setCountry({
      ...country,
      currencies: countryCurrencies,
      languages: countryLanguages,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Nav */}
      <Header searchQuery={searchQuery} handleSearchChange={handleSearchChange} />

      {/* MOdal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-90 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-gray-200 px-16 py-10 rounded-lg h-fit shadow-md relative"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <button
              className="text-gray-400 hover:text-gray-900 text-xl rounded-full absolute top-2 right-5"
              onClick={closeModal}
            >
              X
            </button>
            <div className="flex justify-between items-center gap-14">
              <div>
                <img
                  className="w-60 h-32"
                  src={country?.flags?.png}
                  alt={country?.flags?.alt}
                />
              </div>

              <div>
                <p className="text-3xl font-bold mb-2 text-blue-900">
                  {country?.name?.common}
                </p>

                <p>
                  <span className="font-semibold">Capital : </span>
                  {country?.capital
                    ? country?.capital
                    : "Capital is not available"}
                </p>

                <p>
                  <span className="font-semibold">Area : </span>
                  {country?.area}
                </p>

                <p>
                  <span className="font-semibold">Population : </span>
                  {country?.population}
                </p>

                <p>
                  <span className="font-semibold">Region : </span>
                  {country?.region}
                </p>

                <div className="flex items-center gap-2">
                  <span className="font-semibold">Language : </span>
                  <ul>
                    {country?.languages?.length > 0
                      ? country?.languages?.map(({ code, name }) => (
                          <li key={code}>{name}</li>
                        ))
                      : "Languages is not available."}
                  </ul>
                </div>

                <div className="flex gap-2 items-center">
                  <span className="font-semibold">Currencies :</span>
                  <ul>
                    {country?.currencies?.length > 0
                      ? country?.currencies?.map(({ code, name, symbol }) => (
                          <li key={code}>
                            {name} ({symbol}) - {code}
                          </li>
                        ))
                      : "Currencies is not available"}
                  </ul>
                </div>

                <p>
                  <span className="font-semibold">Timezones : </span>
                  {country?.timezones}
                </p>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* Country list */}
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2  md:gap-6 gap-3 md:px-16 px-3 md:py-24 py-36">
        {filterCountries.length > 0 ? (
          filterCountries
            .filter(filterCountry)
            .sort(isSort)
            .map((country) => (
              <Country
                key={country.cca3}
                country={country}
                handleCountryDetails={handleCountryDetails}
              />
            ))
        ) : (
          <div className="text-3xl text-red-500 font-semibold">
            <p>Countries not found...</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div>
        <footer className=" text-center fixed left-0 bottom-0 w-full items-center py-2 px-6 text-sm bg-gray-800 text-white">
          <p>
            Copyright © Robiul Hasan Mumin 2024 Rest Country App. All Right
            Reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default Countries;
