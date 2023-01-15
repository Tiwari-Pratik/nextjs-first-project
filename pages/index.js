import EventList from "../components/events/EventList";
// import { getFeaturedEvents } from "../dummy-data";

const HomePage = (props) => {
  // const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={props.data} />
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(
    "https://nextjs-course-c8214-default-rtdb.firebaseio.com/events.json"
  );
  const data = await res.json();

  const transformedData = [];

  for (const key in data) {
    if (data[key].isFeatured) {
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
  }

  return {
    props: {
      data: transformedData,
    },
    revalidate: 1800,
  };
};
export default HomePage;
