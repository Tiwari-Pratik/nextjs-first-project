// import { useRouter } from "next/router";
import { Fragment } from "react";
// import { getEventById } from "../../../dummy-data";
import EventSummary from "../../../components/event-detail/EventSummary";
import EventLogistics from "../../../components/event-detail/EventLogistics";
import EventContent from "../../../components/event-detail/EventContent";
import ErrorAlert from "../../../components/ui/ErrorAlert";

const EventDetailPage = (props) => {
  // const router = useRouter();
  // const eventId = router.query.eventId;
  // const event = getEventById(eventId);
  const event = props.event;
  console.log(event);
  if (!event) {
    return (
      <ErrorAlert>
        <p>Loading...</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const eventId = params.eventId;

  const res = await fetch(
    "https://nextjs-course-c8214-default-rtdb.firebaseio.com/events.json"
  );
  const data = await res.json();

  const transformedData = [];

  for (const key in data) {
    if (key === eventId) {
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
  const selectedEvent = transformedData[0];

  if (!selectedEvent) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event: selectedEvent,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(
    "https://nextjs-course-c8214-default-rtdb.firebaseio.com/events.json"
  );
  const data = await res.json();

  const keys = Object.keys(data);

  const pathNames = keys.map((key) => {
    return {
      params: {
        eventId: key,
      },
    };
  });

  return {
    paths: pathNames,
    fallback: true,
  };
};
export default EventDetailPage;
