import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "First meet up",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Ad-tech_London_2010_(2).JPG",
    address: "some address 12, some city 123",
    description: "This location was good for meetups",
  },
  {
    id: "m2",
    title: " meet up",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Ad-tech_London_2010_(2).JPG",
    address: "some address 1211, some city 12123123",
    description: "This location was good for meetups",
  },
];
const HomePage = (props) => {
  // We No longer need to manage state and useEffect because now we get the data through props.
  // const [loadData, setLoadData] = useState([]);
  // useEffect(() => {
  //   // Http request
  //   setLoadData(DUMMY_MEETUPS);
  // }, []);
  return <MeetupList meetups={props.meetups} />;
};

//NextJS will look for a function with that name and if it finds it, it executes this function during this pre-rendering process.
//call getStaticProps before it calls the component function.

//NextJS will wait for this promise to resolve, which means it waits until your data is loaded And with that, you're able to load data before this component function is executed so that this component can be rendered with the required data.

//TODO:    Some potential problems we could be facing when using getStaticProps.And one pretty big problem, is that the data here could be outdated. This page, as I mentioned, is generated during the build process.So thereafter, we deploy it. If we then add more meetups to our database, this pre-generated page would not know about them. And if we don't add any client-side data fetching,we would always just see the outdated meetups here.Now, we can always rebuild our site and redeploy when our data changes.

//TODO: And for some websites, like personal blogs, this is a great alternative because there data doesn't change too frequently but if data does change more frequently, there is a extra property, which we can add to this returned object. And that's the revalidate property.

export async function getStaticProps() {
  // fetch data from the Api

  //You always need to return an object here.Now, in this object,you can configure various thingsbut most importantly,you typically set a props property here and it has to be named props.

  return {
    props: {
      meetups: DUMMY_MEETUPS,
      revalidate: 1,
    },
  };
}

//TODO: Just like getStaticProps, that is a reserved name,which NextJS will be looking for.And the difference to getStaticPropsis that this function will now not run during the build process, but instead always on the server after deployment.
// Alternative
// export function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   // Fetch data from the API
//   //Any code you write in here will always run on the server, never in the client. So you can run the server side code in here, you can also perform operations that use credentials that should not be exposed to your users, because this code only runs on the server.
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;

//Now, which one of the two should you use? Is getServerSideProps better or getStaticProps? getServerSideProps might sound better because it's guaranteed to run for every request.But that actually can be a disadvantage, because that means that you need to wait for your page to be generated on every incoming request.Now if you don't have data that changes all the time,and with that, I really mean that it changes multiple times every second. And if you don't need access to the request object, let's say for authentication,getStaticProps is actually better. Because there you pre-generate an HTML file, that file can then be stored and served by a CDN.And that simply is faster than regenerating and fetching that data for every incoming request. So your page will be faster when workingwith getStaticProps, because then it can be cached and reused, instead of regenerated all the time.
