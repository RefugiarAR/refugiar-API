import { model, Schema } from 'mongoose';
import { IPet } from './interfaces/pet.interface';
const { geocoder } = require("../utils/geocoder");

const PetSchema: Schema = new Schema({
    petId: {
        type: String,
        unique: true,
    },
    image: {
        type: String
    },
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    type: {
        type: String,
        required: [true, "Please add a type"]
    },
    age: {
        type: Number,
        required: [true, "Please add an aproximated age"]
    },
    weight: {
        type: Number,
        required: [true, "Please add an aproximated weight"]
    },
    size: {
        type: String,
        required: [true, "Please add a size"]
    },
    traits: [String],
    conditions: [String],
    sterilized: {
        type: Boolean
    },
    vaccines: [String],
    food: [String],
    mobility: {
        type: Boolean
    },
    mobilitySchedule: {
        mon: {
            open: {
                type: Number
            },
            close: {
                type: Number
            }
        },
    },
    address: {
        type: String,
        required: [true, "Please add an address"]
    },
    location: {
        type: {
            type: String,
            enum: ["Point"]
        },
        coordinates: {
            type: [Number],
            index: "2dsphere"
        },
        formattedAddress: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Geocode & create location
PetSchema.pre<IPet>("save", async function (next) {
    const [loc] = await geocoder.geocode(this.address);
    this.location = {
        type: "Point",
        coordinates: [loc.longitude, loc.latitude],
        formattedAddress: loc.formattedAddress
    };

    // Do not save address
    this.address = undefined;
    next();
});

export default model<IPet>('Pet', PetSchema);