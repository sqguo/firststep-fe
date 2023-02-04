import axios from "axios";
import * as mock from "./mockData";
import _ from "lodash";
import { sec } from "../security";

const base_url = process.env.SERVER_HOST;
const is_demo = process.env.DEMO === "true";
const do_debug = process.env.DEBUG === "true";
const demo_timeout = Number(process.env.DEMO_TIMEOUT);
const auth0Audience = process.env.AUTH0_AUDIENCE as string;

const dateTimeConverter = (data: any) => {
  const fieldsOfInterest = [
    "lastUpdated",
    "currentStart",
    "nextStart",
    "nextEnd",
    "dateOfCreation",
  ];
  const tranformDate = (obj: Record<string, unknown>) =>
    _.transform(
      obj,
      (result: Record<string, unknown>, value: unknown, key: string, data) => {
        if (typeof value === "string" && fieldsOfInterest.indexOf(key) >= 0) {
          result[key] = new Date(value);
        } else {
          result[key] = _.isObject(value)
            ? tranformDate(value as Record<string, unknown>)
            : value;
        }
      }
    );
  return tranformDate(data);
};

const snakeCaseConverter = (data: any) => {
  const camelize = (obj: Record<string, unknown>) =>
    _.transform(
      obj,
      (result: Record<string, unknown>, value: unknown, key: string, data) => {
        const camelKey = _.isArray(data) ? key : _.camelCase(key);
        result[camelKey] = _.isObject(value)
          ? camelize(value as Record<string, unknown>)
          : value;
      }
    );
  return camelize(data);
};

const api = axios.create({
  baseURL: base_url,
  timeout: 1000,
});

api.interceptors.request.use(async function (config) {
  const accessToken = await sec.getAccessTokenSilently()({
    authorizationParams: { audience: auth0Audience },
  });
  if (config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(function (response) {
  do_debug && console.log("RESPONSE", response);
  return {
    ...response,
    data: snakeCaseConverter(dateTimeConverter(response.data)),
  };
});

export async function fetchGlobalMatchingStatus(): Promise<any> {
  do_debug && console.log("GET /global/matching/current");
  if (is_demo) {
    await new Promise((f) => setTimeout(f, demo_timeout));
    return mock.GlobalMatchingStatusRespData;
  } else {
    return await api.get("/global/matching/current");
  }
}

export async function fetchAllSkillsets(): Promise<any> {
  do_debug && console.log("GET /global/skillsets/all");
  if (is_demo) {
    await new Promise((f) => setTimeout(f, demo_timeout));
    return mock.GetAllSkillsetsRespData;
  } else {
    return await api.get("/global/skillsets/all");
  }
}

export async function fetchAllPreferences(): Promise<any> {
  do_debug && console.log("GET /global/preferences/all");
  if (is_demo) {
    await new Promise((f) => setTimeout(f, demo_timeout));
    return mock.GetAllPreferencesRespData;
  } else {
    return await api.get("/global/preferences/all");
  }
}

export async function fetchAllPrograms(): Promise<any> {
  do_debug && console.log("GET /global/programs/all");
  if (is_demo) {
    await new Promise((f) => setTimeout(f, demo_timeout));
    return mock.GetAllProgramsRespData;
  } else {
    return await api.get("/global/programs/all");
  }
}

export async function validateNewEmail(email: string): Promise<any> {
  do_debug && console.log("POST /onboarding/validate_email");
  if (is_demo) {
    await new Promise((f) => setTimeout(f, demo_timeout));
    const rsuccess: boolean = _.random(0, 2) === 0;
    if (!rsuccess) {
      return mock.EmailValidationFailedRespData;
    }
    return mock.EmailValidationRespData;
  } else {
    return await api.post("/onboarding/validate_email", { email });
  }
}

export async function updateUserProfile(payload: any): Promise<any> {
  do_debug && console.log("POST /user/profile");
  if (is_demo) {
    await new Promise((f) => setTimeout(f, demo_timeout));
    return mock.UpdateUserProfileRespData;
  } else {
    return await api.post("/user/profile", { ...payload });
  }
}

export async function getUserProfile(email: string): Promise<any> {
  do_debug && console.log("GET /user/profile");
  if (is_demo) {
    await new Promise((f) => setTimeout(f, demo_timeout));
    return mock.GetCurrentUserRespData2;
  } else {
    return await api.get("/user/profile", {
      params: { email },
    });
  }
}

export async function getOrCreateUser(payload: any): Promise<any> {
  do_debug && console.log("POST /user/profile");
  if (is_demo) {
    await new Promise((f) => setTimeout(f, demo_timeout));
    throw new Error("too lazy to mock");
  } else {
    return await api.post("/user/profile", { ...payload });
  }
}

export async function getUserSkillsets(userId: number): Promise<any> {
  do_debug && console.log("GET /user/skillsets");
  if (is_demo) {
    await new Promise((f) => setTimeout(f, demo_timeout));
    return mock.GetCurrentUserSkillsetsRespData;
  } else {
    return await api.get("/user/skillsets", {
      params: { userId },
    });
  }
}

export async function getUserPreferences(userId: number): Promise<any> {
  do_debug && console.log("GET /user/preferences");
  if (is_demo) {
    await new Promise((f) => setTimeout(f, demo_timeout));
    return mock.GetCurrentUserPreferencesRespData;
  } else {
    return await api.get("/user/preferences", {
      params: { userId },
    });
  }
}

export async function updateUserSkillsets(payload: any): Promise<any> {
  do_debug && console.log("POST /user/skillsets");
  if (is_demo) {
    await new Promise((f) => setTimeout(f, demo_timeout));
    return mock.UpdateUserSkillsetsRespData;
  } else {
    return await api.post("/user/skillsets", { ...payload });
  }
}

export async function updateUserPreferences(payload: any): Promise<any> {
  do_debug && console.log("POST /user/preferences");
  if (is_demo) {
    await new Promise((f) => setTimeout(f, demo_timeout));
    return mock.UpdateUserPreferencesRespData;
  } else {
    return await api.post("/user/preferences", { ...payload });
  }
}

export async function joinMatchround(payload: any): Promise<any> {
  do_debug && console.log("POST /user/matching/join");
  if (is_demo) {
    await new Promise((f) => setTimeout(f, demo_timeout));
    return mock.JoinMatchRoundRespData;
  } else {
    return await api.post("/user/matching/join", { ...payload });
  }
}

export async function leaveMatchround(payload: any): Promise<any> {
  do_debug && console.log("POST /user/matching/leave");
  if (is_demo) {
    await new Promise((f) => setTimeout(f, demo_timeout));
    return mock.LeaveMatchRoundRespData;
  } else {
    return await api.post("/user/matching/leave", { ...payload });
  }
}

export async function getGroupProfile(userId: number): Promise<any> {
  do_debug && console.log("GET /group/profile");
  if (is_demo) {
    await new Promise((f) => setTimeout(f, demo_timeout));
    return mock.GetGroupProfileRespData;
  } else {
    return await api.get("/group/profile", {
      params: { userId },
    });
  }
}

export async function updateGroupCommitment(payload: any): Promise<any> {
  do_debug && console.log("POST /group/commitment");
  if (is_demo) {
    await new Promise((f) => setTimeout(f, demo_timeout));
    return mock.UpdateGroupCommitmentResp;
  } else {
    return await api.post("/group/commitment", { ...payload });
  }
}
