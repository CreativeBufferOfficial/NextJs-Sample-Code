import MeetupDetail from "../../components/meetups/MeetupDetail";

function meetupDetails() {
  return (
    <MeetupDetail
      image="https://commons.wikimedia.org/wiki/Special:FilePath/Ad-tech_London_2010_(2).JPG"
      title="First Meetup"
      address="somearea somecity 19219312"
      description="Here is the Location of first meetup"
    />
  );
}
export async function getStaticPaths() {}

export async function getStaticProps(context) {
  // fetch data for single meetup

  const meetupId = context.params.meetupId;
  return {
    props: {
      meetupData: {
        image:
          "https://commons.wikimedia.org/wiki/Special:FilePath/Ad-tech_London_2010_(2).JPG",
        id: "m1",
        title: "First Meetup",
        address: "somearea somecity 19219312",
        description: "Here is the Location of first meetup",
      },
    },
  };
}
export default meetupDetails;
