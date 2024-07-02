import mongoose,{ Schema } from "mongoose";

//  projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
const RegistrationSchema = new Schema(
    {
        ptypes: { type: String, required: true },
        user: { type: String, required: true },
        unit: { type: String, required: true },
        quarter: { type: String, required: true },
        lernerid: { type: String, required: true },
        regdt: { type: Date, required: true },
        nm: { type: String, required: true },
        dob: { type: Date, required: true },
        gender: { type: String, required: true },
        disability: { type: String, required: true },
        nature: { type: String, required: true },
        fmname: { type: String, required: true },
        edn: { type: String, required: true },
        marital: { type: String, required: true },
        employment: { type: String, required: true },
        religion: { type: String, required: true },
        phonecat: { type: String, required: true },
        mob: { type: String, required: true },
        isDeleted: { type: Boolean, default: false }      
    },
    {
        timestamps: true
    }
);

export const RegistrationModel = mongoose.models.Registration || mongoose.model("Registration", RegistrationSchema);  
