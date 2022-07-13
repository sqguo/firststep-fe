export const GlobalMatchingStatusRespData = {
  status: 200,
  data: {
    id: 324023,
    name: "David",
  },
};

export const



export const EmailValidationRespData = {
  isNewEmailValid: true,
  rejectionReason: null,
};

export const UpdateUserProfileRespData = {
  userId: 1234,
  updatedProfile: {
    id: 1234,
    email: "buzzl28@uwaterloo.ca",
    classYear: 2023,
    firstName: "Buzz",
    lastName: "Lightyear",
    program: {
      id: 2,
      code: "CE",
      name: "Computer Engineering",
    },
    avatarURL: "https://avatars.githubusercontent.com/u/7363040?v=4",
    displayName: "Buzz Lightyear",
    bio: "the idea guy",
  },
};

export const GetCurrentUserRespData = {
  userId: 1234,
  profile: {
    id: 1234,
    email: "buzzl28@uwaterloo.ca",
    classYear: 2023,
    firstName: "Buzz",
    lastName: "Lightyear",
    program: {
      id: 2,
      code: "CE",
      name: "Computer Engineering",
    },
    avatarURL: "https://avatars.githubusercontent.com/u/7363040?v=4",
    displayName: "Buzz Lightyear",
    bio: "the idea guy",
  },
  onboardingStatus: OnboardingStatus.Step1,
  isVerified: true,
  isEligible: true,
  hasGroup: false,
  currentMatchround: null
}

export const GetCurrentUserSkillsetsRespData = {
  userId: 1234,
  skillsets: [

  ]
}
