//  api/meetups
// import { MongoClient } from 'mongodb';

// async function meetHandler(req, res) {
//   if (req.method === 'GET') {
//
//     const client = await MongoClient.connect(
//       'mongodb+srv://deepakcb:PgppnFe6kEAedWYB@cluster0.qftv6px.mongodb.net/meetups?retryWrites=true&w=majority'
//     );
//     const db = client.db();
//     const meetups = await db.collection('meetups').find().toArray();
//     client.close();

//     res.status(200).json({ data: meetups });
//   }
// }
// export default meetHandler;
