import EventList from "../../components/events/EventList";
// import { getAllEvents } from "../../dummy-data";
import { Fragment } from "react";
import EventsSearch from "../../components/events/EventsSearch";
import { useRouter } from "next/router";

const AllEventsPage = (props) => {
  // const events = getAllEvents();
  const router = useRouter();
  const searchFilteredEvents = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };
  return (
    <Fragment>
      <EventsSearch onSearch={searchFilteredEvents} />
      <EventList items={props.data} />
    </Fragment>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch(
    "https://nextjs-course-c8214-default-rtdb.firebaseio.com/events.json"
  );
  const data = await res.json();

  const transformedData = [];

  for (const key in data) {
    const tempObj = {
      id: key,
      title: data[key].title,
      description: data[key].description,
      location: data[key].location,
      date: data[key].date,
      image: data[key].image,
      isFeatured: data[key].isFeatured,
    };

    transformedData.push(tempObj);
  }

  return {
    props: {
      data: transformedData,
    },
  };
};
export default AllEventsPage;
