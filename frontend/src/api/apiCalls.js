import axiosInstance from "./axios";

// Login API call
export const loginApi = async (email, password) => {
  try {
    const response = await axiosInstance.post("/api/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

// Register API call
export const registerApi = async (name, email, password, cnf_password) => {
  try {
    const response = await axiosInstance.post("/api/auth/register", {
      name,
      email,
      password,
      cnf_password,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

// Logout API call
export const logoutApi = async (jwtToken) => {
  console.log("tokennnnnnnnnnnnnn", jwtToken);
  try {
    const response = await axiosInstance.post(
      "/api/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

// Facebook login API call
export const facebookApi = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/auth/facebook",
      {
        name: data.name,
        userID: data.userID,
        short_lived_access_token: data.accessToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

// Fetch OTP API call
export const fetchOtpApi = async (jwtToken) => {
  try {
    const response = await axiosInstance.get("/api/auth/otp", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

// Submit OTP API call
export const submitOtpApi = async (jwtToken, otp) => {
  try {
    const response = await axiosInstance.post(
      "/api/auth/otp",
      { otp: otp.join("") },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

// List of Business
export const businessesApi = async (jwtToken) => {
  try {
    const response = await axiosInstance.get("/api/business", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

// Campaign status count
export const campaignStatusCountApi = async (jwtToken, id) => {
  try {
    const response = await axiosInstance.get(
      "/api/business/campaign/get-status-count",
      {
        params: {
          id: id,
        },
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

// Campaign objective count
export const campaignObjectiveCountApi = async (jwtToken, id) => {
  try {
    const response = await axiosInstance.get(
      "/api/business/campaign/get-objective-count",
      {
        params: {
          id: id,
        },
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

// KPI: 'campaign_count','conversion_rate','impressions','conversions','ad_spend','reach','clicks' in a business
export const getKpiDataApi = async (
  jwtToken,
  id,
  field,
  start_date,
  end_date
) => {
  try {
    const response = await axiosInstance.get(
      "/api/business/get-collective-performance-data",
      {
        params: {
          id: id,
          fields: field.join(","),
          start_date,
          end_date,
        },
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

// Graphs Data in a business
export const getAdPerformanceDataApi = async (
  jwtToken,
  id,
  field,
  start_date,
  end_date,
  selectedCampaigns,
  selectedObjectives
) => {
  try {
    const response = await axiosInstance.get(
      "/api/business/get-ad-performance-data",
      {
        params: {
          id: id,
          fields: field.join(","),
          start_date,
          end_date,
          campaign_ids:selectedCampaigns.join(","),
          campaign_objectives:selectedObjectives.join(",")
        },
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

// All Campaigns table data
export const allCampaignDataApi = async (jwtToken, id, field) => {
  // console.log(jwtToken, id, field);
  try {
    const response = await axiosInstance.get("/api/business/campaign-data", {
      params: {
        id: id,
        fields: field.join(","),
      },
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return response;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

// Access Control Data API
export const accessConrtolDataApi = async (jwtToken, id) => {
  try {
    const response = await axiosInstance.get(
      "/api/business/get-business-users",
      {
        params: {
          id: id,
        },
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return response;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

// Search User API
export const searchUserApi = async (jwtToken, searchString) => {
  try {
    const response = await axiosInstance.get("/api/user/search-users", {
      params: {
        searchString: searchString,
      },
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return response;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

// Assign Role API
export const assignUserRoleApi = async (jwtToken, id, target_user, role) => {
  try {
    const response = await axiosInstance.post(
      "/api/business/grant-access",
      {
        id: id,
        target_user: target_user,
        role: role,
      },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return response;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

// Add Business API
export const addBusinessApi = async (
  jwtToken,
  provider_id,
  manager_account_id,
  business_name
) => {
  try {
    const response = await axiosInstance.post(
      "/api/business",
      {
        provider_id,
        manager_account_id,
        business_name,
      },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    return response;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};
