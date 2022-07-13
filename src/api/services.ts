import axios from "axios";
import * as mock from "./mockData"

const base_url = process.env.SERVER_HOST;
const is_demo = process.env.DEMO === "true";
const api = axios.create({
  baseURL: base_url,
  timeout: 1000,
});

export async function fetchGlobalMatchingStatus(): Promise<any> {
  if (is_demo) {
    return mock.GlobalMatchingStatusRespData
  } else {
    return await api.get('/global/matching/current');
  }
}


export async function fetchAllSkillsets(): Promise<any> {
  if (is_demo) {
    return mock.GlobalMatchingStatusRespData
  } else {
    return await api.get('/global/skillsets/all');
  }
}


export async function fetchAllPreferences(): Promise<any> {
  if (is_demo) {
    return mock.GlobalMatchingStatusRespData
  } else {
    return await api.get('/global/preferences/all');
  }
}


export async function fetchAllPrograms(): Promise<any> {
  if (is_demo) {
    return mock.GlobalMatchingStatusRespData
  } else {
    return await api.get('/global/programs/all');
  }
}


export async function validateNewEmail(email: string): Promise<any> {
  if (is_demo) {
    return mock.GlobalMatchingStatusRespData
  } else {
    return await api.post('/onboatding/validate_email', { email });
  }
}


export async function updateUserProfile(payload: any): Promise<any> {
  if (is_demo) {
    return mock.GlobalMatchingStatusRespData
  } else {
    return await api.post('/user/profile', { ...payload });
  }
}


export async function getUserProfile(email: string): Promise<any> {
  if (is_demo) {
    return mock.GlobalMatchingStatusRespData
  } else {
    return await api.get('/user/profile', {
      params: { email }
    });
  }
}


export async function getUserSkillsets(userId: number): Promise<any> {
  if (is_demo) {
    return mock.GlobalMatchingStatusRespData
  } else {
    return await api.get('/user/skillsets', {
      params: { userId }
    });
  }
}

export async function getUserPreferences(userId: number): Promise<any> {
  if (is_demo) {
    return mock.GlobalMatchingStatusRespData
  } else {
    return await api.get('/user/preferences', {
      params: { userId }
    });
  }
}

export async function updateUserSkillsets(payload: any): Promise<any> {
  if (is_demo) {
    return mock.GlobalMatchingStatusRespData
  } else {
    return await api.post('/user/skillsets', { ...payload });
  }
}

export async function updateUserPreferences(payload: any): Promise<any> {
  if (is_demo) {
    return mock.GlobalMatchingStatusRespData
  } else {
    return await api.post('/user/preferences', { ...payload });
  }
}


export async function joinMatchround(payload: any): Promise<any> {
  if (is_demo) {
    return mock.GlobalMatchingStatusRespData
  } else {
    return await api.post('/user/matching/join', { ...payload });
  }
}


export async function leaveMatchround(payload: any): Promise<any> {
  if (is_demo) {
    return mock.GlobalMatchingStatusRespData
  } else {
    return await api.post('/user/matching/leave', { ...payload });
  }
}


export async function getGroupProfile(userId: number): Promise<any> {
  if (is_demo) {
    return mock.GlobalMatchingStatusRespData
  } else {
    return await api.get('/group/profile', {
      params: { userId }
    });
  }
}

export async function updateGroupCommitment(payload: any): Promise<any> {
  if (is_demo) {
    return mock.GlobalMatchingStatusRespData
  } else {
    return await api.post('/group/commitment', { ...payload });
  }
}


