import { model, Schema } from "mongoose";

const appointmentSchema = new Schema({
    service:{type:String, required: true},
    price:{type: Number},
    startTime: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Appointment = model("Appointment", appointmentSchema);

export default Appointment;