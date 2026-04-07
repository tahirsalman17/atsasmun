import clientPromise from "./mongodb";
import { ObjectId } from "mongodb";

// MongoDB-based Database Utility
// Replaces the GitHub-based storage with real MongoDB collections

export class MongoDBDB {
  constructor(collectionName) {
    this.collectionName = collectionName;
  }

  async getCollection() {
    const client = await clientPromise;
    const db = client.db("atsasmun"); // Default DB name
    return db.collection(this.collectionName);
  }

  // Get all records
  async getAll() {
    const collection = await this.getCollection();
    const data = await collection.find({}).sort({ createdAt: -1 }).toArray();
    // Map _id to id for compatibility
    return data.map(item => ({ ...item, id: item.id || item._id.toString() }));
  }

  // Get a single record by ID
  async getById(id) {
    const collection = await this.getCollection();
    let query;
    try {
        // Try to query by MongoDB ObjectId first
        query = { _id: new ObjectId(id) };
    } catch (e) {
        // If not a valid ObjectId, try the numeric/string id field
        query = { id: isNaN(id) ? id : parseInt(id) };
    }
    const item = await collection.findOne(query);
    return item ? { ...item, id: item.id || item._id.toString() } : null;
  }

  // Create a new record
  async create(record) {
    const collection = await this.getCollection();
    const newRecord = {
      ...record,
      id: Date.now(), // Keep numeric ID for backward compatibility if needed
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const result = await collection.insertOne(newRecord);
    return { ...newRecord, _id: result.insertedId };
  }

  // Update a record
  async update(id, updates) {
    const collection = await this.getCollection();
    let query;
    try {
        query = { _id: new ObjectId(id) };
    } catch (e) {
        query = { id: isNaN(id) ? id : parseInt(id) };
    }

    const updatedData = {
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    const result = await collection.findOneAndUpdate(
      query,
      { $set: updatedData },
      { returnDocument: 'after' }
    );

    if (!result) throw new Error("Record not found");
    return { ...result, id: result.id || result._id.toString() };
  }

  // Delete a record
  async delete(id) {
    const collection = await this.getCollection();
    let query;
    try {
        query = { _id: new ObjectId(id) };
    } catch (e) {
        query = { id: isNaN(id) ? id : parseInt(id) };
    }

    const result = await collection.deleteOne(query);
    if (result.deletedCount === 0) throw new Error("Record not found");
    return { success: true };
  }

  // Get records with pagination
  async getPaginated(page = 1, pageSize = 10, searchQuery = "") {
    const collection = await this.getCollection();
    
    let query = {};
    if (searchQuery) {
      // Simple text search implementation for MongoDB
      query = {
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } },
          { email: { $regex: searchQuery, $options: 'i' } },
          { title: { $regex: searchQuery, $options: 'i' } },
          { message: { $regex: searchQuery, $options: 'i' } }
        ]
      };
    }

    const total = await collection.countDocuments(query);
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;

    const data = await collection.find(query)
      .sort({ createdAt: -1 })
      .skip(start)
      .limit(pageSize)
      .toArray();

    const mappedData = data.map(item => ({ ...item, id: item.id || item._id.toString() }));

    return {
      data: mappedData,
      pagination: {
        page,
        pageSize,
        pageCount: totalPages,
        total,
      },
    };
  }
}

// Pre-defined collections using MongoDB
export const collections = {
  istanbul: new MongoDBDB("registrations_istanbul"),
  dubai: new MongoDBDB("registrations_dubai"),
  azerbaijan: new MongoDBDB("registrations_azerbaijan"),
  usa: new MongoDBDB("registrations_usa"),
  saudi: new MongoDBDB("registrations_saudi"),
  uk: new MongoDBDB("registrations_uk"),
  blogs: new MongoDBDB("blogs"),
  notifications: new MongoDBDB("notifications"),
  authors: new MongoDBDB("authors"),
};
