import mongoose,{ Schema } from "mongoose";

//  projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
const ColSchema = new Schema(
    {
        user: { type: String, required: true },
        ip: { type: String, required: true },
        isDeleted: { type: Boolean, default: false }      
    },
    {
        timestamps: true
    }
);

export const ColModel = mongoose.models.Col || mongoose.model("Col", ColSchema);  
