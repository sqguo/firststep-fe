import axios from "axios";
import * as mock from "./mockData"

const base_url = process.env.SERVER_HOST;
const is_demo = process.env.DEMO === "true";
const demo_timeout = Number(process.env.DEMO_TIMEOUT);
const api = axios.create({
  baseURL: base_url,
  timeout: 1000,
});

export async function fetchGlobalMatchingStatus(): Promise<any> {
  if (is_demo) {
    console.log("GET /global/matching/current")
    await new Promise(f => setTimeout(f, demo_timeout));
    return mock.GlobalMatchingStatusRespData
  } else {
    return await api.get('/global/matching/current');
  }
}


export async function fetchAllSkillsets(): Promise<any> {
  if (is_demo) {
    console.log("GET /global/skillsets/all")
    await new Promise(f => setTimeout(f, demo_timeout));
    return mock.GetAllSkillsetsRespData
  } else {
    return await api.get('/global/skillsets/all');
  }
}


export async function fetchAllPreferences(): Promise<any> {
  if (is_demo) {
    console.log("GET /global/preferences/all")
    await new Promise(f => setTimeout(f, demo_timeout));
    return mock.GetAllPreferencesRespData
  } else {
    return await api.get('/global/preferences/all');
  }
}


export async function fetchAllPrograms(): Promise<any> {
  if (is_demo) {
    console.log("GET /global/programs/all")
    await new Promise(f => setTimeout(f, demo_timeout));
    return mock.GetAllProgramsRespData
  } else {
    return await api.get('/global/programs/all');
  }
}


export async function validateNewEmail(email: string): Promise<any> {
  if (is_demo) {
    console.log("POST /onboarding/validate_email")
    await new Promise(f => setTimeout(f, demo_timeout));
    return mock.EmailValidationRespData
  } else {
    return await api.post('/onboarding/validate_email', { email });
  }
}


export async function updateUserProfile(payload: any): Promise<any> {
  if (is_demo) {
    console.log("POST /user/profile")
    await new Promise(f => setTimeout(f, demo_timeout));
    return mock.UpdateUserProfileRespData
  } else {
    return await api.post('/user/profile', { ...payload });
  }
}


export async function getUserProfile(email: string): Promise<any> {
  if (is_demo) {
    console.log("GET /user/profile")
    await new Promise(f => setTimeout(f, demo_timeout));
    return mock.GetCurrentUserRespData
  } else {
    return await api.get('/user/profile', {
      params: { email }
    });
  }
}


export async function getUserSkillsets(userId: number): Promise<any> {
  if (is_demo) {
    console.log("GET /user/skillsets")
    await new Promise(f => setTimeout(f, demo_timeout));
    return mock.GetCurrentUserSkillsetsRespData
  } else {
    return await api.get('/user/skillsets', {
      params: { userId }
    });
  }
}

export async function getUserPreferences(userId: number): Promise<any> {
  if (is_demo) {
    console.log("GET /user/preferences")
    await new Promise(f => setTimeout(f, demo_timeout));
    return mock.GetCurrentUserPreferencesRespData
  } else {
    return await api.get('/user/preferences', {
      params: { userId }
    });
  }
}

export async function updateUserSkillsets(payload: any): Promise<any> {
  if (is_demo) {
    console.log("POST /user/skillsets")
    await new Promise(f => setTimeout(f, demo_timeout));
    return mock.UpdateUserSkillsetsRespData
  } else {
    return await api.post('/user/skillsets', { ...payload });
  }
}

export async function updateUserPreferences(payload: any): Promise<any> {
  if (is_demo) {
    console.log("POST /user/preferences")
    await new Promise(f => setTimeout(f, demo_timeout));
    return mock.UpdateUserPreferencesRespData
  } else {
    return await api.post('/user/preferences', { ...payload });
  }
}


export async function joinMatchround(payload: any): Promise<any> {
  if (is_demo) {
    console.log("POST /user/matching/join")
    await new Promise(f => setTimeout(f, demo_timeout));
    return mock.JoinMatchRoundRespData
  } else {
    return await api.post('/user/matching/join', { ...payload });
  }
}


export async function leaveMatchround(payload: any): Promise<any> {
  if (is_demo) {
    console.log("POST /user/matching/leave")
    await new Promise(f => setTimeout(f, demo_timeout));
    return mock.LeaveMatchRoundRespData
  } else {
    return await api.post('/user/matching/leave', { ...payload });
  }
}


export async function getGroupProfile(userId: number): Promise<any> {
  if (is_demo) {
    console.log("GET /group/profile")
    await new Promise(f => setTimeout(f, demo_timeout));
    return mock.GetGroupProfileRespData
  } else {
    return await api.get('/group/profile', {
      params: { userId }
    });
  }
}

export async function updateGroupCommitment(payload: any): Promise<any> {
  if (is_demo) {
    console.log("POST /group/commitment")
    await new Promise(f => setTimeout(f, demo_timeout));
    return mock.UpdateGroupCommitmentResp
  } else {
    return await api.post('/group/commitment', { ...payload });
  }
}


