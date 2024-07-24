// import mongoose from 'mongoose'

// // const NEXT_PUBLIC_MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI  

// if (!process.env.MONGODB_URI) {
//   throw new Error(
//     'Please define the MONGODB_URI environment variable inside .env.local'
//   )
// }


// async function dbConnect() {
//   let connect
//   try {
//     connect = await mongoose.connect(process.env.MONGODB_URI||'', {})
//     console.log(
//       'Database connected',
//       connect.connection.host,
//       connect.connection.name
//     )
//   } catch (err) {
//     console.log('error', err)
//     process.exit(1)
//   }
//   return connect
// }

// export default dbConnect;

import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || ''

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // additional options if needed
    }

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        return mongoose
      })
      .catch((error) => {
        cached.promise = null // reset promise in case of error
        throw error
      })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect

