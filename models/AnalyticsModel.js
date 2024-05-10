import mongoose from 'mongoose';

const { Schema } = mongoose;

const analyticsSchema = new Schema({
  monthname: {
    type: String,
    required: true,
  },
  sold: {
    type: Number,
  },
  profit: {
    type: Number
  },
  lastupdated: {
    type: String
  },
  year: {
    type: String
  }
});


const Analytics = mongoose.model('Analytics', analyticsSchema);

export default Analytics;
