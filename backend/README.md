### Database Structure

# Travel Entry

* Title - String
* Description - String
* Comments - String
* Ratings - Scale of 1 - 10
* Image - URL
* Latitude - Number
* Longitude - Number
* createdAt - DateTime
* updatedAt - DateTime

const logEntry = new Schema({
  Title: {
    type: String,
    required: true,
    minLength: 3
  },
  Description: {
    type: String,
    required: true,
    minLength: 3
  },
  Comments: {
    type: String,
    required: true,
    minLength: 3
  },
  Rating: {
    type: Number,
    default: 0,
    minLength: 1,
    maxLength: 10
  },
  Image: {
    type: String,
    required: true,
    minLength: 3
  },
  Latitude: {
      type: Number,
      required: true
  },
  Longitude: {
      type: Number,
      required: true
  },
  createdAt: {
      type: Date,
      default: Date.now()
  },
},{
    timestamps: true
});




# User

* Name - String
* Email - String
* PasswordHash - String
* ID - String
* Roles - Array

