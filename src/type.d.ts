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
  newEmailRejectionReason: string | null
  isLoginModalOpen: boolean

  // misc
  showHomepageWalkthrough: boolean 
  reducedFootprint: number
  isFetchingOtherUser: boolean
  otherUserSkillsets: Record<number, UserSkillset[]>
}


// USER RELATED STUFF ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

interface User {
  profile: UserProfile | null
  onboardingStatus: number
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
  classYear: int | null
  firstName: string
  lastName: string
  program: Program | null
  avatarURL: string | null
  displayName: string
  bio: string | null
}

interface Group {
  id: number
  name: string
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
  responseRequired: boolean
  type: number
}

interface Skillset extends OnboardingAttribute {}
interface Preference extends OnboardingAttribute {
  imageUrl: string | null
}

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
  lastUpdated: Date
  currentStatus: number
  nextStatus: number
  currentStart: Date | null
  nextStart: Date | null
  nextEnd: Date | null
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
  onboardingStatus: number
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

interface UpdateGroupCommitmentRequest {
  userId: number,
  groupId: number,
  action: number
  reason: string | null
}

interface groupCommitmentOptionResponse {
  userId: number,
  hasGroup: boolean,
  group: Group | null
}


// Utility ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

interface OnboardingStep {
  id: number,
  currentUrl: string,
  nextUrl: string,
  brief: string,
}