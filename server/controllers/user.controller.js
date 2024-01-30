import { asyncHandler } from "../utils/asyncHandler.js"

const registerUser = asyncHandler ( async (req, res) => {
    // get user details form frontend
    // validation for all the details user entered - not empty
    // check if user already exists - using username and email
    // check for images
    // check for avatar
    // upload them to cloudinary, check avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation 
    // return response

    // data
    const {username, email, firstName, lastName, password}= req.body
    // console.log("email:- ", email)

    // validation
    if(
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError (400, "All fields are required")
    }

    // userr already exists?
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username Already Exists")
    }

    // db entry
    const user = await User.create({
        firstName, 
        lastName,
        email,
        password,
        username: username.toLowerCase(),
    })

    if (!createdUser){
        throw new ApiError(500, "Server || Something went wrong while registering a user    ")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Created Successfully")
    )
} )

const loginUser = asyncHandler ( async (req, res) => {

    const {email, username, password} = req.body;

    console.log(email);

    if(!username && !email){
        throw new ApiError(400, "Username or email is required")
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if(!user){
        throw new ApiError(404, "User does not Exists")
    }
    
    const isPasswordValid = await user.isPasswordCorrect(password)
    
    if(!isPasswordValid){
        throw new ApiError(401, "Invalid User credentials")
    }

    // console.log(user._id)
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    // console.log("out",refreshToken)
    // console.log("out access:- ",accessToken)
    // console.log("This is access Token",accessToken)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    // console.log(loggedInUser)
    // sending cookies

    const options = {
        httpOnly: true,
        secure: true
    }

    // console.log("Final access token:- ", accessToken)

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged in successfully"
        )
    )

})

export {
    loginUser,
    registerUser
}