//user-schema.js - to login, signup, and logout
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLString,
    GraphQLBoolean,
    GraphQLID,
  } = require('graphql');

const UserModel = require('../models/user-server-model')
const VitalsModel = require('../models/vitals-server-model')

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "some_secret_key"; // generate this elsewhere
const jwtExpirySeconds = 300;

// Create a GraphQL Object Type for Student model
// The fields object is a required property of a GraphQLObjectType 
// and it defines the different fields or query/mutations that are available
// in this type.

const userType = new GraphQLObjectType({
    name: 'user',
    fields: function () {
      return {
        id: {
          type: GraphQLID // Unique identifier for the user (typically corresponds to MongoDB _id)
        },
        userName: {
          type: GraphQLString,
        },
        firstName: {
            type: GraphQLString,
        },
        lastName: {
            type: GraphQLString,
        }, 
        email: {
          type: GraphQLString,
        },
        password: {
          type: GraphQLString,
        },
      };
    },
  });

  // Create a GraphQL Object Type for the Vitals model
  const vitalsType = new GraphQLObjectType({
    name: 'vitals',
    fields: function () {
      return {
        id: {
          type: GraphQLID // Unique identifier for the user (typically corresponds to MongoDB _id)
        },
        timeStamp: {
          type: GraphQLString,
        },
        bloodPressure: {
          type: GraphQLString,
        },
        heartRate: {
          type: GraphQLFloat,
        },
        temperature: {
            type: GraphQLFloat,
        },
        respiratoryRate: {
            type: GraphQLFloat,
        },
        bloodOxygen: {
          type: GraphQLFloat,
      },
      userId: {
        type: GraphQLID,
    },
      };
    },
  });

  const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        users: {
          type: new GraphQLList(userType),

          resolve: function () {
            const users = UserModel.find().exec()
            if (!users) {
              throw new Error('Error')
            }
            return users
          }
        },
        user: {
            type: userType,
            args: {
              id: {
                name: 'id',
                type: GraphQLString
              }
            },
            resolve: async function (root, params) {
                console.log('Executing student resolver with params:', params);
                try {
                  const userInfo = await UserModel.findById(params.id).exec();
                  console.log('User info:', userInfo);
      
                  if (!userInfo) {
                    console.error('User not found for id:', params.id);
                    throw new Error('Error');
                  }
      
                  return userInfo;
                } catch (error) {
                  console.error('Error fetching user:', error);
                  throw new Error('Failed to fetch user');
                }
              }
            },
            // check if user is logged in
        isLoggedIn: {
            type: GraphQLBoolean,  // Change the type to Boolean
            args: {
              email: {
                name: 'email',
                type: GraphQLString,
              },
            },
            resolve: function (root, params, context) {
              const token = context.req.cookies.token;
    
              // If the cookie is not set, return false
              if (!token) {
                return false;
              }
    
              try {
                // Try to verify the token
                jwt.verify(token, JWT_SECRET);
                return true;  // Token is valid, user is logged in
              } catch (e) {
                // If verification fails, return false
                return false;
              }
            },
          },
          ///
          vitals: {
            type: new GraphQLList(vitalsType),
            resolve: function () {
              const vitals = VitalsModel.find().exec()
              if (!vitals) {
                throw new Error('Error')
              } 
              return vitals;
            },
          },

          vital: {
            type: vitalsType,
            args: {
              id: {
                type: new GraphQLNonNull(GraphQLID),
              },
            },
            resolve: async function (root, { id }) {
              try {
                const vital = await VitalsModel.findById(id).exec();
    
                if (!vital) {
                  throw new Error('Vital not found');
                }
    
                return vital;
              } catch (error) {
                console.error('Error fetching vital:', error);
                throw new Error('Failed to fetch vital');
              }
            },
          },

      };
  },
});

  const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
      return {
        createUser: {
          type: userType,
          args: {
            userName: {
              type: new GraphQLNonNull(GraphQLString),
            },
            firstName: {
                type: new GraphQLNonNull(GraphQLString),
            },
            lastName: {
                type: new GraphQLNonNull(GraphQLString),
            },
            email: {
              type: new GraphQLNonNull(GraphQLString),
            },
            password: {
              type: new GraphQLNonNull(GraphQLString),
            },
          },
          resolve: function (root, params, context) {
            const userModel = new UserModel(params);
            const newUser = userModel.save();
            if (!newUser) {
              throw new Error('Error');
            }
            return newUser
          }
        },

        loginUser: {
            type: GraphQLBoolean,  // Change the type to Boolean
            args: {
              email: {
                name: 'email',
                type: GraphQLString,
              },
              password: {
                name: 'password',
                type: GraphQLString,
              },
            },
            resolve: async function (root, params, context) {
                console.log('Executing loginUser resolver with params:', params);
    
                const userInfo = await UserModel.findOne({ email: params.email }).exec();
                console.log('User info:', userInfo);
                if (!userInfo) {
                  console.error('user not found for email:', params.email);
                  return false;  // Authentication failed
                }
                console.log('email: ', userInfo.email)
                console.log('entered pass: ',params.password)
                console.log('hash: ', userInfo.password)
                 // check if the password is correct
                const isValidPassword = await bcrypt.compare(params.password.trim(), userInfo.password);
                console.log('bcrypt.compare Result: ', isValidPassword);
    
                if (!isValidPassword) {
                  console.error('Invalid password');
                  console.log('Entered Password:', params.password);
                  console.log('Stored Password:', userInfo.password);
                  return false;  // Authentication failed
                }

                try {
                    const token = jwt.sign(
                      { _id: userInfo._id, email: userInfo.email },
                      JWT_SECRET,
                      { algorithm: 'HS256', expiresIn: jwtExpirySeconds }
                    );
                  
                    console.log('Generated token:', token);
                  
                    context.res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000, httpOnly: true });
                    return true;  // Authentication successful
                  } catch (error) {
                    console.error('Error generating token:', error);
                    return false; // Authentication failed
                  }
                  
                },
              },

              logOut: {
                type: GraphQLString,
                resolve: (parent, args, context) => {
                  context.res.clearCookie('token');
                  return 'Logged out successfully!';
                },
            },

            //add vital:
            addVitals: {
              type: vitalsType,
              args: {
                timeStamp: {
                  type: new GraphQLNonNull(GraphQLString),
                },
                bloodPressure: {
                  type: new GraphQLNonNull(GraphQLString),
                },
                heartRate: {
                  type: new GraphQLNonNull(GraphQLFloat),
                },
                temperature: {
                  type: new GraphQLNonNull(GraphQLFloat),
                },
                respiratoryRate: {
                  type: new GraphQLNonNull(GraphQLFloat),
                },
                bloodOxygen: {
                  type: new GraphQLNonNull(GraphQLFloat),
                },
              },
              resolve: async function (root, { timeStamp, bloodPressure, heartRate, temperature, respiratoryRate, bloodOxygen }, context) {
                // Check if the user is logged in
                const token = context.req.cookies.token;
            
                if (!token) {
                  throw new Error('User not authenticated');
                }

                try {
                  // Verify the token to get the user ID
                  const decodedToken = jwt.verify(token, JWT_SECRET);
                  const userId = decodedToken._id;
            
                  // Continue with adding the vitals, including userId
                  const vitalsModel = new VitalsModel({ timeStamp, bloodPressure, heartRate, temperature, respiratoryRate, bloodOxygen, userId });
                  const savedVitals = await vitalsModel.save();
            
                  return savedVitals;
                } catch (error) {
                  console.error('Error adding vitals:', error);
                  throw new Error('Failed to add vitals');
                }
              },
            },
            //updating/editing vitals:

            editVitals: {
              type: vitalsType,
              args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                timeStamp: { type: new GraphQLNonNull(GraphQLString) }, 
                bloodPressure: { type: new GraphQLNonNull(GraphQLString) }, 
                heartRate: { type: new GraphQLNonNull(GraphQLFloat) }, 
                temperature: { type: new GraphQLNonNull(GraphQLFloat) }, 
                respiratoryRate: { type: new GraphQLNonNull(GraphQLFloat) }, 
                bloodOxygen: { type: new GraphQLNonNull(GraphQLFloat) }, 
              },
              resolve: async function (root, { id, timeStamp, bloodPressure, heartRate, temperature, respiratoryRate, bloodOxygen }, context) { 
                const token = context.req.cookies.token;
                if (!token) {
                  return 'not-auth';
                }
            
                try {
                  // Get the user ID from the token
                  const { _id: userId } = jwt.verify(token, JWT_SECRET);
                  
                  // Find the vital by ID
                  const vital = await VitalsModel.findById(id).exec();
            
                  // Check if the user making the edit is the author of the course
                  if (!vital || String(vital.userId) !== userId) {
                    throw new Error('Unauthorized');
                  }
            
                  // Update the vitals fields
                  vital.timeStamp = timeStamp; // Update the time field with the new value
                  vital.bloodPressure = bloodPressure;
                  vital.heartRate = heartRate;
                  vital.temperature = temperature;
                  vital.respiratoryRate = respiratoryRate;
                  vital.bloodOxygen = bloodOxygen;
                  const updatedVitals = await vital.save(); // Save the updated vitals
            
                  return updatedVitals;
                } catch (error) {
                  console.error('Error editing vitals:', error);
                  // Handle the error, e.g., show an error message to the user.
                  throw new Error('Failed to edit vitals');
                }
              },
            },

        };
    },
  });
  module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });


