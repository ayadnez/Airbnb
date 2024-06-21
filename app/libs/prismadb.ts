import { PrismaClient } from "@prisma/client";

declare global {
    var prisma : PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()

if(process.env.NODE_ENV !== 'production') globalThis.prisma = client;

// Check connection
client.$connect()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

export default client