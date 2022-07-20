export enum RatingType {
  FloatSlider, // continuous slider
  IntSlider, // discrete slider
  TrueFalse, // true or false selection
  multipleChoice, // choose one option
}

export enum OnboardingStatus {
  NotStarted, // have not started onboarding
  Step0, // tbd user's basic details
  Step1, // tbd user's skills
  Step2, // tbd user's preferences
  Completed, // completd onboarding
}

export enum MatchRoundStatus {
  NotAvailable, // the matchround is not open to public
  Upcoming, // the matchround will soon be available to join
  Open, // new participants may join the matchround
  Matching, // the matching algo is running, no one may join
  TeamsAssigned, // participants have been assigned to temporary teams
  Closed, // the matchround is over
}

export enum GroupCommitmentOptions {
  Leave, // a member leaves the group
  Commit, // Votes to keep the group
  Undecided, // ???
}
