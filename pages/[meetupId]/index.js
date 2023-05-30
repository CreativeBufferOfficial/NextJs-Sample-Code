import MeetupDetail from '../../components/meetups/MeetupDetail';
import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';

function meetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}
// This is use for  pregenerated for all the url user might be entering at run time -- like meetup deatails page for all ID
// if they enter a id which was not pregenerated that it will show 404 error page
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://deepakcb:PgppnFe6kEAedWYB@cluster0.qftv6px.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollections = db.collection('meetups');

  const meetups = await meetupsCollections.find({}, { id: 1 }).toArray();

  client.close();
  return {
    // tell next Js  your path array contain all support  parameter or some
    fallback: false,
    // false define for  all  supported path
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    //   paths: [
    //   {
    //     params: {
    //       meetupId: 'm1',
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: 'm2',
    //     },
    //   },
    // ],
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  // fetch data for single meetup
  const client = await MongoClient.connect(
    'mongodb+srv://deepakcb:PgppnFe6kEAedWYB@cluster0.qftv6px.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollections = db.collection('meetups');

  const selectedMeetup = await meetupsCollections.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
  // return {
  //   props: {
  //     meetupData: {
  //       image:
  //         'https://commons.wikimedia.org/wiki/Special:FilePath/Ad-tech_London_2010_(2).JPG',
  //       id: 'm1',
  //       title: 'First Meetup',
  //       address: 'somearea somecity 19219312',
  //       description: 'Here is the Location of first meetup',
  //     },
  //   },
  // };
}
export default meetupDetails;
