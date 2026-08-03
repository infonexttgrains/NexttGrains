import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
{
    /* ==========================================
       CUSTOMER DETAILS
    ========================================== */

    fullName:{
        type:String,
        required:true,
        trim:true,
        maxlength:100
    },

    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },

    phone:{
        type:String,
        required:true,
        trim:true
    },

    /* ==========================================
   CATEGORY
========================================== */

category:{
    type:String,
    required:true,
    trim:true,
    enum:[
        "General Inquiry",
        "Order Support",
        "Bulk Orders",
        "Vendor Partnership",
        "Franchise",
        "Feedback"
    ],
    default:"General Inquiry"
},

    /* ==========================================
       SUBJECT
    ========================================== */

    subject:{
        type:String,
        required:true,
        trim:true,
        maxlength:150
    },

    /* ==========================================
       MESSAGE
    ========================================== */

    message:{
        type:String,
        required:true,
        trim:true,
        maxlength:3000
    },

    /* ==========================================
       STATUS
    ========================================== */

    status:{
        type:String,
        enum:[
            "New",
            "In Progress",
            "Resolved",
            "Closed"
        ],
        default:"New"
    },

    /* ==========================================
       PRIORITY
    ========================================== */

    priority:{
        type:String,
        enum:[
            "Low",
            "Medium",
            "High"
        ],
        default:"Medium"
    },

    /* ==========================================
       SOURCE
    ========================================== */

    source:{
        type:String,
        default:"Website"
    },

    ipAddress:{
    type:String,
    default:""
},

userAgent:{
    type:String,
    default:""
},
    /* ==========================================
       ADMIN NOTES
    ========================================== */

    adminReply:{
        type:String,
        default:""
    },

    replyDate:{
    type:Date,
    default:null
},

closedAt:{
    type:Date,
    default:null
},

    adminRemark:{
        type:String,
        default:""
    },

    /* ==========================================
       READ
    ========================================== */

    isRead:{
        type:Boolean,
        default:false
    },

    /* ==========================================
       DELETE
    ========================================== */

    isDeleted:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true,

    toJSON:{
        virtuals:true
    },

    toObject:{
        virtuals:true
    }
});

/* ==========================================
   VIRTUAL
========================================== */

contactSchema.virtual("isPending").get(function(){

    return this.status !== "Resolved";

});

/* ==========================================
   INDEXES
========================================== */

contactSchema.index({
    email:1
});

contactSchema.index({
    status:1
});

contactSchema.index({
    priority:1
});

contactSchema.index({
    createdAt:-1
});

contactSchema.index({
    isRead:1
});

contactSchema.index({
    isDeleted:1
});
/* ==========================================
   EXPORT MODEL
========================================== */

const Contact =
mongoose.models.Contact ||
mongoose.model(
    "Contact",
    contactSchema
);

export default Contact;