interface AppState {
  currentUser: User | null
  currentMatchrounds: MatchRound[]
  onboardingConfiguration: OnboardingConfig

  isLoadingCurrentUser: boolean
  isLoadingMatchrounds: boolean
  isLoadingUserGroup: boolean
  isLoadingGroupMemberProfile: boolean
  isLoadingOnboardingConfigration: boolean
  isVerifyingNewEmail: boolean
  isLoadingUserSettings: boolean
  isUpdatingUserSettings: boolean
  isJoiningMatchRound: boolean
  isLeavingMatchRound: boolean
  isUpdatingGroupCommitment: boolean

  hasError: boolean
  errorCode: number | null
  errorMessage: string | null

  // TODO: refactor this
  isNewEmailValid: boolean
}


// USER RELATED STUFF ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

interface User {
  profile: UserProfile | null
  onboardingStatus: OnboardingStatus
  isVerified: boolean
  isEligible: boolean
  hasGroup: boolean
  group: Group | null
  currentMatchround: MatchRound | null
  matchingHistory: MatchRound[]
  skillsets: UserSkillset[]
  preferences: UserPreference[]
}

interface UserProfile {
  id: number
  email: string
  classYear: int
  firstName: string
  lastName: string
  program: Program
  avatarURL: string
  displayName: string
  bio: string
}

interface Group {
  id: number
  name: stringing
  isGroupPermanent: boolean
  dateOfCreation: Date
  members: UserProfile[]
}

interface Program {
  id: number
  code: string
  name: string
}


// ONBOARDING STUFF ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

interface OnboardingAttribute {
  id: number
  name: string
  description: string
  isRequired: boolean
  type: enums.RatingType
}

interface Skillset extends OnboardingAttribute {}
interface Preference extends OnboardingAttribute {}

interface UserAttribute {
  attributeId: number
  data: string | number | boolean | null
}

interface UserSkillset extends UserAttribute {}
interface UserPreference extends UserAttribute {}


// GLOBAL STATES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

interface OnboardingConfig {
  skillsets: Record<number, Skillset>
  preferences: Record<number, Preference>
  programs: Record<number, Program>
}

interface MatchRound {
  id: number
  currentStatus: MatchRoundStatus
  nextStatus: MatchRoundStatus
  currentAvailability: {
    startDate: Date
    endDate: Date
  } | null
  nextAvailability: {
    startDate: Date
    endDate: Date
  } | null
}


// ENUMS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

enum RatingType {
  FloatSlider,    // continuous slider
  IntSlider,      // discrete slider
  TrueFalse,      // true or false selection
  multipleChoice  // choose one option
}

enum OnboardingStatus {
  NotStarted,     // have not started onboarding
  Step0,          // confirmed user's basic details
  Step1,          // confirmed user's skills
  Step2,          // confirmed user's preferences
  Completed,      // completd onboarding
}

enum MatchRoundStatus {
  NotAvailable,   // the matchround is not open to public
  Upcoming,       // the matchround will soon be available to join
  Open,           // new participants may join the matchround
  Matching,       // the matching algo is running, no one may join
  TeamsAssigned,  // participants have been assigned to temporary teams
  Closed,         // the matchround is over
}

enum GroupCommitmentOptions {
  Leave,          // a member leaves the group
  Commit,         // Votes to keep the group
  Undecided,      // ???
}


// API ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

interface EmailValidationResponse {
  isNewEmailValid: boolean
  rejectionReason: string | null
}

interface UpdateUserProfileRequest {
  userId: number
  newProfile: UserProfile
}

interface UpdateUserProfileResponse {
  userId: number
  updatedProfile: UserProfile
}

interface GetCurrentUserResponse {
  userId: number
  profile: UserProfile
  onboardingStatus: OnboardingStatus
  isVerified: boolean
  isEligible: boolean
  hasGroup: boolean
  currentMatchround: MatchRound | null
}

interface GetCurrentUserSkillsetsResponse {
  userId: number
  skillsets: UserSkillset[]
}

interface GetCurrentUserPreferencesResponse {
  userId: number
  preferences: UserPreference[]
}

interface UpdateUserSkillsetsRequest {
  userId: number
  newSkillsets: UserSkillset[]
}

interface UpdateUserSkillsetsResponse {
  userId: number,
  updatedSkillsets: UserSkillset[]
}

interface UpdateUserPreferencesRequest {
  userId: number
  newPreferences: UserPreference[]
}

interface UpdateUserPreferencesResponse {
  userId: number,
  updatedPreferences: UserPreference[]
}

interface JoinMatchRoundRequest {
  userId: number,
  matchroundId: number
}

interface JoinMatchRoundResponse {
  userId: number,
  matchroundId: number,
  success: boolean
  currentMatchround: MatchRound | null
}

interface LeaveMatchRoundRequest {
  userId: number,
  matchroundId: number
}

interface LeaveMatchRoundReponse {
  userId: number,
  matchroundId: number
  success: boolean
}

interface GetGroupProfileResponse {
  userId: number,
  group: Group
}

interface UpdateGroupCommitment {
  userId: number,
  groupId: number,
  action: GroupCommitmentOptions
  reason: string | null
}

interface groupCommitmentOptionResponse {
  userId: number,
  hasGroup: boolean,
  group: Group | null
}