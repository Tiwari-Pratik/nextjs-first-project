// import { useRouter } from "next/router";
import EventList from "../../../components/events/EventList";
import Head from "next/head";
// import { getFilteredEvents } from "../../../dummy-data";
import ResultsTitle from "../../../components/events/ResultsTitle";
import { Fragment } from "react";
import ErrorAlert from "../../../components/ui/ErrorAlert";
import Button from "../../../components/ui/Button";

const FilteredEventsPage = (props) => {
  // const router = useRouter();
  // const filterData = router.query.slug;

  if (![props.numYear, props.numMonth]) {
    return <p>Loading...</p>;
  }

  // const filteredYear = filterData[0];
  // const filteredMonth = filterData[1];

  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  if (
    isNaN(props.numYear) ||
    isNaN(props.numMonth) ||
    props.numYear > 2030 ||
    props.numYear < 2021 ||
    props.numMonth < 1 ||
    props.numMonth > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }
  // const filteredEvents = getFilteredEvents({
  //   year: numYear,
  //   month: numMonth,
  // });

  const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }
  const date = new Date(props.numYear, props.numMonth - 1);

  return (
    <Fragment>
      <Head>
        <title>Filtered Events</title>
        <meta
          name="description"
          content={`All events for ${props.numMonth}/${props.numYear}`}
        />
      </Head>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export const getServerSideProps = async (context) => {
  const {
    params: { slug },
  } = context;
  const [year, month] = slug;
  // console.log({ year, month });

  const res = await fetch(
    "https://nextjs-course-c8214-default-rtdb.firebaseio.com/events.json"
  );
  const data = await res.json();

  const filteredData = [];

  for (const key in data) {
    const dataYear = new Date(data[key].date).getFullYear();
    // console.log(dataYear);
    if (dataYear === +year) {
      const dataMonth = new Date(data[key].date).getMonth() + 1;
      if (dataMonth === +month) {
        const tempObj = {
          id: key,
          title: data[key].title,
          description: data[key].description,
          location: data[key].location,
          date: data[key].date,
          image: data[key].image,
          isFeatured: data[key].isFeatured,
        };
        filteredData.push(tempObj);
      }
    }
  }

  // if (!filteredData || filteredData.length === 0) {
  //   return {
  //     notFound: true,
  //   };
  // }
  return {
    props: {
      events: filteredData,
      numYear: year,
      numMonth: month,
    },
  };
};
export default FilteredEventsPage;
