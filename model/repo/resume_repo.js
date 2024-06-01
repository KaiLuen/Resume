class ResumeRepo {
  constructor(mongoClient) {
    this.mongoClient = mongoClient;
    this.userCollection = mongoClient.db("demo_db").collection("users");
  }

  async saveUserAllData(user) {
    return await this.userCollection.updateOne({ sessionId: user.sessionId }, { $set: user }, { upsert: true });
  }
  async saveUserData(data) {
    return await this.userCollection.updateOne({ sessionId: data.sessionId }, { $set: data }, { upsert: true });
  }

  async findUserViaSessionId(uuid) {
    return await this.userCollection.findOne({ sessionId: uuid });
  }

  async clearAllData() {
    return await this.userCollection.deleteMany({});
  }



}


module.exports = ResumeRepo;