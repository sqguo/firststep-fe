import * as Enums from "../enums";

export const GlobalMatchingStatusRespData = {
  status: 200,
  data: {
    matchRounds: [
      {
        id: 4,
        currentStatus: Enums.MatchRoundStatus.Closed,
        nextStatus: Enums.MatchRoundStatus.Closed,
        lastUpdated: new Date("2020-01-11T05:00:00"),
        currentStart: new Date("2020-01-11T05:00:00"),
        nextStart: null,
        nextEnd: null,
      },
      {
        id: 5,
        currentStatus: Enums.MatchRoundStatus.TeamsAssigned,
        nextStatus: Enums.MatchRoundStatus.Closed,
        lastUpdated: new Date("2022-01-11T05:00:00"),
        currentStart: new Date("2022-01-11T05:00:00"),
        nextStart: new Date("2022-12-22T12:30:00"),
        nextEnd: new Date("2022-12-25T12:30:00"),
      },
      {
        id: 6,
        currentStatus: Enums.MatchRoundStatus.Open,
        nextStatus: Enums.MatchRoundStatus.Matching,
        lastUpdated: new Date("2022-07-11T05:00:00"),
        currentStart: new Date("2022-07-11T05:00:00"),
        nextStart: new Date("2023-12-22T12:30:00"),
        nextEnd: new Date("2023-12-25T12:30:00"),
      },
      {
        id: 7,
        currentStatus: Enums.MatchRoundStatus.Upcoming,
        nextStatus: Enums.MatchRoundStatus.Matching,
        lastUpdated: new Date("2022-07-11T05:00:00"),
        currentStart: new Date("2022-07-11T05:00:00"),
        nextStart: new Date("2022-07-28T12:30:00"),
        nextEnd: new Date("2023-12-25T12:30:00"),
      },
    ],
  },
};

export const GetAllSkillsetsRespData = {
  status: 200,
  data: {
    skillsets: [
      {
        id: 0,
        name: "Embeded Software",
        description:
          "Embedded software is a piece of software that is embedded in hardware or non-PC devices.",
        responseRequired: true,
        type: Enums.RatingType.FloatSlider,
      },
      {
        id: 1,
        name: "Distributed Systems",
        description:
          "A distributed system is a computing environment in which various components are spread across multiple computers (or other computing devices) on a network.",
        responseRequired: true,
        type: Enums.RatingType.FloatSlider,
      },
      {
        id: 2,
        name: "Database Systems",
        description:
          "A database typically requires a comprehensive database software program known as a database management system (DBMS).",
        responseRequired: true,
        type: Enums.RatingType.FloatSlider,
      },
      {
        id: 3,
        name: "Hardware",
        description:
          "Computer hardware includes the physical parts of a computer, such as the case, central processing unit (CPU), random access memory (RAM).",
        responseRequired: true,
        type: Enums.RatingType.FloatSlider,
      },
      {
        id: 4,
        name: "Leadership",
        description:
          "Leadership is the ability of an individual or a group of individuals to influence and guide followers or other members of an organization.",
        responseRequired: true,
        type: Enums.RatingType.FloatSlider,
      },
      {
        id: 5,
        name: "Technical Writing",
        description:
          "Technical writing is any writing designed to explain complex, technical, and specialized information to audiences who may or may not be familiar with them.",
        responseRequired: true,
        type: Enums.RatingType.FloatSlider,
      },
    ],
  },
};

export const GetAllPreferencesRespData = {
  status: 200,
  data: {
    preferences: [
      {
        id: 1000,
        name: "Goldilocks: Consumer Electronics Comparator and Price Tracker",
        description:
          "A growing share of consumer electronics sales are being conducted online. However, comparing products across different online retailers can be difficult. The objective of this project is to consolidate information across major retailers into one platform, making online shopping simpler and saving time, money, and effort. The benefit of this project is that it puts an emphasis on comparison of similar products within the same electronics category so as to allow consumers to shop for electronics when they are undecided on a particular product.",
        responseRequired: true,
        imageUrl: "https://www.eng.uwaterloo.ca/2021-capstone-design/electrical-computer/__@_@__images@_/img_7506jpg.f689534ee16c.jpeg",
        type: Enums.RatingType.TrueFalse,
      },
      {
        id: 1001,
        name: "EyeGuide: Smart Cane for the Visually Impaired",
        description:
          "C500,000 Canadians are estimated to be affected by sight loss, and have difficulty navigating unfamiliar spaces. The objective of EyeGuide is to attach an embedded device onto a traditional white cane. This system is responsible for detecting and identifying nearby objects, providing navigation assistance and providing location sharing. The main advantage of EyeGuide is that it provides more information to the blind than the traditional white cane and does not require training unlike guide dogs.",
        responseRequired: true,
        imageUrl: "https://www.eng.uwaterloo.ca/2021-capstone-design/mechatronics/__@_@__images@_/img_4181jpg.d2563b19b721.jpeg",
        type: Enums.RatingType.TrueFalse,
      },
      {
        id: 1002,
        name: "Tutorr",
        description:
          "Market research has shown a rising demand in tutoring services as the percentage of students meeting provincial standards continue to decrease year-by-year. To address this, a crowd-sourced platform for private tutoring services that promotes personal engagement and immediate feedback has been created. With Tutorr, students are matched with mentors within their geographical location that possess relevant subject expertise, and a full-scale application integrated with payment services and live-chat is used to facilitate this experience seamlessly and efficiently.",
        responseRequired: true,
        imageUrl: "https://www.eng.uwaterloo.ca/2021-capstone-design/mechatronics/__@_@__images@_/tron2.a3b9e1d92018.png",
        type: Enums.RatingType.TrueFalse,
      },
      {
        id: 1003,
        name: "AR Piano Teacher",
        description: "In emergency situations when WiFi and cellular networks tend to break down due to either physical damage or congestion, communication via ordinary tools (SMS, messaging apps, phone calls) becomes difficult. The PETER project constructs a wireless ad-hoc network of mobile devices in which devices in close proximity communicate with each other using Bluetooth and 5 GHz Wi-Fi. The message from the source is propagated and relayed by intermediate devices to the destination.",
        responseRequired: true,
        imageUrl: "https://www.eng.uwaterloo.ca/2021-capstone-design/electrical-computer/__@_@__images@_/screen_shot_2021-01-26_at_105945_am.3dbba636205c.png",
        type: Enums.RatingType.TrueFalse,
      },
      {
        id: 1004,
        name: "PETER\:Precision End-To-End Relay",
        description: "Learning to play a new instrument such as the piano can be quite challenging. The objective of this project is to aid a student to learn to play the piano. Our proposed solution will show the student which keys to play and how long to sustain them. To achieve this, an augmented reality (AR) environment can be created using any virtual reality (VR) viewer and a smartphone. It is affordable and accessible since it only requires a smartphone, and a cardboard virtual reality viewer.",
        responseRequired: true,
        imageUrl: "https://www.eng.uwaterloo.ca/2021-capstone-design/mechatronics/__@_@__images@_/tron2.a3b9e1d92018.png",
        type: Enums.RatingType.TrueFalse,
      },
    ],
  },
};

export const GetAllProgramsRespData = {
  status: 200,
  data: {
    programs: [
      {
        id: 0,
        code: "CE",
        name: "Computer Engineering",
      },
      {
        id: 1,
        code: "EE",
        name: "Electrical Engineering",
      },
      {
        id: 2,
        code: "SE",
        name: "Software Engineering",
      },
    ],
  },
};

export const EmailValidationRespData = {
  status: 200,
  data: {
    isNewEmailValid: true,
    rejectionReason: null,
  },
};

export const EmailValidationFailedRespData = {
  status: 200,
  data: {
    isNewEmailValid: false,
    rejectionReason: "the email is associated with an existing account",
  },
};

export const UpdateUserProfileRespData = {
  status: 200,
  data: {
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
  },
};

export const GetCurrentUserRespData = {
  status: 200,
  data: {
    userId: 1234,
    profile: {
      id: 1234,
      email: "buzzl28@uwaterloo.ca",
      classYear: null,
      firstName: "",
      lastName: "",
      program: null,
      avatarURL: null,
      displayName: "",
      bio: null,
    },
    onboardingStatus: Enums.OnboardingStatus.Step0,
    isVerified: true,
    isEligible: true,
    hasGroup: false,
    currentMatchround: null,
  },
};

export const GetCurrentUserRespData2 = {
  status: 200,
  data: {
    userId: 1234,
    profile: {
      id: 1234,
      email: "buzzl28@uwaterloo.ca",
      classYear: 2023,
      firstName: "Buzz",
      lastName: "LightYear",
      program: {
        id: 0,
        code: "CE",
        name: "Computer Engineering",
      },
      avatarURL: null,
      displayName: "Paul Ward",
      bio: "Procrastinator, plays League",
    },
    onboardingStatus: Enums.OnboardingStatus.Completed,
    isVerified: true,
    isEligible: true,
    hasGroup: true,
    currentMatchround: {
      id: 6,
      currentStatus: Enums.MatchRoundStatus.Open,
      nextStatus: Enums.MatchRoundStatus.Matching,
      lastUpdated: new Date("2022-7-11T05:00:00"),
      currentStart: new Date("2022-7-11T05:00:00"),
      nextStart: new Date("2023-12-22T12:30:00"),
      nextEnd: new Date("2023-12-25T12:30:00"),
    },
  },
};

export const GetCurrentUserSkillsetsRespData = {
  status: 200,
  data: {
    userId: 1234,
    skillsets: [
      {
        attributeId: 0,
        data: 9.6,
      },
      {
        attributeId: 1,
        data: 1.6,
      },
      {
        attributeId: 2,
        data: 2.6,
      },
      {
        attributeId: 3,
        data: 3.5,
      },
      {
        attributeId: 4,
        data: 0,
      },
      {
        attributeId: 5,
        data: 3,
      },
    ],
  },
};

export const GetCurrentUserPreferencesRespData = {
  status: 200,
  data: {
    userId: 1234,
    preferences: [
      {
        attributeId: 1002,
        data: false,
      },
      {
        attributeId: 1003,
        data: true,
      },
      {
        attributeId: 1004,
        data: true,
      },
    ],
  },
};

export const UpdateUserSkillsetsRespData = {
  status: 200,
  data: {
    userId: 1234,
    updatedSkillsets: [
      {
        attributeId: 0,
        data: 9.6,
      },
      {
        attributeId: 1,
        data: 1.6,
      },
      {
        attributeId: 2,
        data: 2.6,
      },
      {
        attributeId: 3,
        data: 3.5,
      },
      {
        attributeId: 4,
        data: 0,
      },
      {
        attributeId: 5,
        data: 3,
      },
    ],
  },
};

export const UpdateUserPreferencesRespData = {
  status: 200,
  data: {
    userId: 1234,
    updatedPreferences: [
      {
        attributeId: 1000,
        data: true,
      },
      {
        attributeId: 1001,
        data: false,
      },
      {
        attributeId: 1002,
        data: true,
      },
    ],
  },
};

export const JoinMatchRoundRespData = {
  status: 200,
  data: {
    userId: 1234,
    matchroundId: 6,
    success: true,
    currentMatchround: {
      id: 6,
      currentStatus: Enums.MatchRoundStatus.Open,
      nextStatus: Enums.MatchRoundStatus.Matching,
      lastUpdated: new Date("2022-7-11T05:00:00"),
      currentStart: new Date("2022-7-11T05:00:00"),
      nextStart: new Date("2023-12-22T12:30:00"),
      nextEnd: new Date("2023-12-25T12:30:00"),
    },
  },
};

export const LeaveMatchRoundRespData = {
  status: 200,
  data: {
    userId: 1234,
    matchroundId: 6,
    success: true
  },
};

export const GetGroupProfileRespData = {
  status: 200,
  data: {
    userId: 1236,
    group: {
      id: 97,
      name: "Loser's Club",
      isGroupPermanent: false,
      dateOfCreation: new Date("2021-12-25T12:30:00"),
      members: [
        {
          id: 1234,
          email: "buzzl28@uwaterloo.ca",
          classYear: 2023,
          firstName: "Buzz",
          lastName: "Lightyear",
          program: {
            id: 0,
            code: "CE",
            name: "Computer Engineering",
          },
          avatarURL: null,
          displayName: "Buzz Lightyear",
          bio: "the idea guy, you haven't heard from him since the first meeting, will show up on demo day",
        },
        {
          id: 1235,
          email: "pward234@uwaterloo.ca",
          classYear: 2023,
          firstName: "Pual",
          lastName: "Ward",
          program: {
            id: 1,
            code: "EE",
            name: "Electrical Engineering",
          },
          avatarURL: null,
          displayName: "Pual Ward",
          bio: "the leader, will setup meeting with prof to discuss report page argin size, makes powerpoints",
        },
        {
          id: 1236,
          email: "c3p0248@uwaterloo.ca",
          classYear: 2023,
          firstName: "C",
          lastName: "P0",
          program: {
            id: 0,
            code: "CE",
            name: "Computer Engineering",
          },
          avatarURL: null,
          displayName: "C3PO",
          bio: "the developer, will take a month to print Hello World, hardcodes everything",
        },
        {
          id: 1237,
          email: "feridun8@uwaterloo.ca",
          classYear: 2023,
          firstName: "ferido",
          lastName: "ham",
          program: {
            id: 1,
            code: "EE",
            name: "Electric Engineering",
          },
          avatarURL: "https://imageio.forbes.com/specials-images/imageserve/60f6bb455053b426096f1487/Destiny-2/960x0.jpg?format=jpg&width=960",
          displayName: "Buzz Lightyear",
          bio: "the C-suite executive, will attend every standup for some reason, insists you use nosql",
        },
        {
          id: 1238,
          email: "id024@uwaterloo.ca",
          classYear: 2023,
          firstName: "indiana",
          lastName: "jaws",
          program: {
            id: 2,
            code: "SE",
            name: "Software Engineering",
          },
          avatarURL: null,
          displayName: "indiana jaws",
          bio: "the Fixer, plays league everyday with the developer, his branch is 2 months behind",
        },
      ],
    },
  },
};

export const UpdateGroupCommitmentResp = {
  status: 200,
  data: {
    userId: 1234,
    hasGroup: false,
    group: null,
  },
};
