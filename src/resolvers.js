const WifiPoint = require('./models/WifiPoint');

const resolvers = {
  Query: {
    async wifiPoints(_, { limit = 10, offset = 0 }) {
      return WifiPoint.find().skip(offset).limit(limit);
    },
    async wifiPointById(_, { id }) {
      return WifiPoint.findOne({ id });
    },
    async wifiPointsByColonia(_, { colonia, limit = 10, offset = 0 }) {
      return WifiPoint.find({ colonia }).skip(offset).limit(limit);
    },
    async wifiPointsNearby(_, { lat, long, limit = 10 }) {
      return WifiPoint.find({
        location: {
          $near: {
            $geometry: { type: "Point", coordinates: [long, lat] },
            $maxDistance: 5000 // por ejemplo, 5 km
          }
        }
      }).limit(limit);
    }
  }
};

module.exports = resolvers;
