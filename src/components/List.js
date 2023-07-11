import { globalConstant } from "../constants/globalConstant";

const List = ({
  direction = globalConstant.HORIZONTAL,
  data = [],
  Card,
  onPeopleCardClicked,
  styles = {}
}) => {
  return (
    <div style={styles} className={`list ${direction}`}>
      {data?.map((item, index) => {
        return (
          <Card
            key={index}
            people={item}
            onPeopleCardClicked={onPeopleCardClicked}
          />
        );
      })}
    </div>
  );
};

export default List;
