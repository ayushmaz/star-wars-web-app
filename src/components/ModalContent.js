import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import SpinLoader from "../assets/loaders/SpinLoader";
import { globalConstant } from "../constants/globalConstant";
import { API_GET_DATA_FROM_URL } from "../services/services";
import { getCardColor } from "../utils/peopleUtils";

const ModalContent = ({ onCloseClicked, peopleDetails }) => {
  const [homeworldData, setHomeworldData] = useState({});
  const [loading, setLoading] = useState(false);
  const {
    name,
    height,
    mass,
    films,
    created,
    homeworld,
    birth_year,
    eye_color
  } = peopleDetails;
  const { name: homeworldName, climate, terrain, residents } = homeworldData;

  const _peopleDetails = [
    {
      key: "Name",
      value: name
    },
    {
      key: "Birth Year",
      value: birth_year === "unknown" ? "N/A" : birth_year
    },
    {
      key: "Height",
      value: height === "unknown" ? "N/A" : height + "m"
    },
    {
      key: "Weight",
      value: mass === "unknown" ? "N/A" : mass + "kg"
    },
    {
      key: "Number of flims",
      value: films?.length ?? 0
    },
    {
      key: "Created",
      value: new Date(created).toDateString()
    }
  ];

  const _homeworldDetails = [
    {
      key: "Name",
      value: homeworldName
    },
    {
      key: "Climate",
      value: climate
    },
    {
      key: "Terrain",
      value: terrain
    },
    {
      key: "Number of residents",
      value: residents?.length ?? 0
    }
  ];

  useEffect(() => {
    setLoading(true);
    API_GET_DATA_FROM_URL(homeworld)
      .then(({ data }) => setHomeworldData(data))
      .finally(() => setLoading(false));
  }, [homeworld]);

  return (
    <div className="modal-content">
      <div className="header">
        <div className="user">
          <div
            style={{ backgroundColor: getCardColor(eye_color) }}
            className="avataar"
          >
            <img
              style={{ display: "flex", height: "80%" }}
              src={`${globalConstant.AVATAAR_URL}=${name.split(" ").join("_")}`}
              alt="avataar"
            />
          </div>
          <div className="text-header">{name}</div>
        </div>
        <MdClose onClick={onCloseClicked} className="close" />
      </div>
      <div className="col">
        <div className="character-details row">
          <div className="text-sub-header">Specifications</div>
          {_peopleDetails.map((item, index) => {
            return (
              <div key={index} className="text-content">
                <span className="text-key">{item.key}</span>: {item.value}
              </div>
            );
          })}
        </div>
        <div className="homeworld-details row">
          {loading ? (
            <div className="loader-container">
              <SpinLoader />
            </div>
          ) : (
            <>
              <div className="text-sub-header">Home World</div>
              {_homeworldDetails.map((item, index) => {
                return (
                  <div key={index} className="text-content">
                    <span className="text-key">{item.key}</span>: {item.value}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalContent;
