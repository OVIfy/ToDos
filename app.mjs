import uriString from './uri.mjs'
import {connectToAtlas} from './connect.mjs'
const dbName = 'ToDo'
const collectionName = 'Users'

async function run(){
    const client = await connectToAtlas(uriString)
    const collection = client.db(dbName).collection(collectionName);

    let result = await collection.insertOne({name:"victor", password : 'test'})
    console.log(result)
    
    client.close()
    // console.log(client)
}

run()
// console.log(uriString)
