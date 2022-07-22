const mongoose = require('mongoose')
const bcrypt = require("bcrypt")

const emailReg =   new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
// const emailReg = new RegExp(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(?!hotmail|outlook)(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)
const passwordRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)

const ROLE = ['ADMIN', 'USER']

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: [true, "Fullname is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        // validate: {
        //     validator: (val) => {
        //         return emailReg.test(val)
        //     },
        //     message: 'Only gmail and yahoo mail allowed'
        // }

        //or
        validate: [(val) => {
            // console.log({val});
          return  emailReg.test(val)
        }, 'Only gmail and yahoo mail allowed'],
    },
        password: {
            type: String,
            require: true,
            validate: [(val) => passwordRegex.test(val), 'Minimum eight characters, at least one letter and one number'],
            // minlength:[6, 'must be upto 6 characters']

        },
        role: {
            type: String,
            enum: ROLE,
            default: 'USER'
        },
        isAvatar:{
            type: Boolean,
            default: false
        },
        avatar:{
            type: String,
            default: ""
    
        },
    }, {
    timestamps: true
})


userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    if(this.email === process.env.ADMINEMAIL) return this.role = "ADMIN"

    next()
})

module.exports = User = mongoose.model("user", userSchema)