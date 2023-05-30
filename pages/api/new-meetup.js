// api/new-meetup
import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(
      'mongodb+srv://deepakcb:PgppnFe6kEAedWYB@cluster0.qftv6px.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();

    const meetupsCollections = db.collection('meetups');

    const result = await meetupsCollections.insertOne(data);

    client.close();
    res.status(201).json({ message: 'Meetup Inserted' });
  }
}
export default handler;
