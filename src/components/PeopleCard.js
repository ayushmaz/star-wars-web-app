import { globalConstant } from "../constants/globalConstant";
import { getCardColor } from "../utils/peopleUtils";

const PeopleCard = ({ people, onPeopleCardClicked }) => {
  const { name, eye_color } = people || {};
  return (
    <div
      onClick={() => onPeopleCardClicked(people)}
      style={{ backgroundColor: getCardColor(eye_color) }}
      className="card"
    >
      <div className="avataar-circle">
        <img
          src={`${globalConstant.AVATAAR_URL}=${name?.split(" ")?.join("_")}`}
          alt="avataar"
        />
      </div>
      <div className="name">{name}</div>
    </div>
  );
};

export default PeopleCard;
