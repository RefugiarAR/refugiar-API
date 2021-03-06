import { model, Schema } from "mongoose";
import { IUser, IDonations } from "./interfaces/user.interface";

const DonationsSchema: Schema = new Schema({
  owner: String,
  email: String,
  hasBank: Boolean,
  bank: {
    owner: String,
    bankName: String,
    accountId: String,
    accountCBU: String,
    accountAlias: String,
  },
  hasMercadopago: Boolean,
  mercadopago: {
    links: [
      {
        amount: Number,
        description: String,
        url: String,
      },
    ],
  },
  hasPaypal: Boolean,
  paypal: {
    link: String,
  },
});

const UserSchema: Schema = new Schema({
  id: {
    // this is the Auth0 ID which we'll use to relate both DBs
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedRegistration: {
    type: Boolean,
    default: false,
  },

  // Common info (for all users)
  userType: {
    type: String,
    enum: ["adoptant", "volunteer", "refuge", "vet"],
  },
  nickname: String,
  name: String,
  lastName: String,
  dob: String,
  mobilePhone: Number,
  landlinePhone: Number,
  alerts: Boolean,
  address: String,
  location: {
    formattedAddress: String,
    coordinates: {
      type: [Number, Number],
      index: "2dsphere",
    },
  },

  // Refuge
  // isRefuge: Boolean,
  refugeInfo: {
    username: String,
    displayName: String,
    specialization: [String],
    pets: [String],
    showInMap: Boolean,
    instagram: String,
    twitter: String,
    facebook: String,
    donations: DonationsSchema,
  },

  // Vet
  // isVet: Boolean,
  vetInfo: {
    username: String,
    displayName: String,
    specialization: [String],
    showInMap: Boolean,
    instagram: String,
    twitter: String,
    facebook: String,
    donations: DonationsSchema,
  },

  // Person
  // isPerson: Boolean,
  personInfo: {
    // Second step
    canTravel: Boolean,
    canAdopt: Boolean,
    canTransit: Boolean,
    canHelp: Boolean,

    // Third step
    houseType: String,
    hoursAway: String,
    houseProtection: Boolean,
    hasAdults: Boolean,
    adults: Number,
    hasChildren: Boolean,
    children: Number,
    hasPets: Boolean,
    otherPets: Number,
    experience: Boolean,
    printer: Boolean,
    hasTransportBox: Boolean,
    instagram: String,
    twitter: String,
    facebook: String,
    availability: {
      mon: Boolean,
      tue: Boolean,
      wed: Boolean,
      thu: Boolean,
      fri: Boolean,
      sat: Boolean,
      sun: Boolean,
    },
  },
});

export default model<IUser>("User", UserSchema);
