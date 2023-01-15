import EventItem from "./EventItem";
import classes from "./EventList.module.css";

const EventList = (props) => {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.map((item) => {
        return (
          <EventItem
            id={item.id}
            title={item.title}
            location={item.location}
            date={item.date}
            image={item.image}
            key={item.id}
          />
        );
      })}
    </ul>
  );
};

export default EventList;
