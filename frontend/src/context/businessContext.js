import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./authContext";
import {
  accessConrtolDataApi,
  allCampaignDataApi,
  campaignObjectiveCountApi,
  campaignStatusCountApi,
  getAdPerformanceDataApi,
  getKpiDataApi,
} from "../api/apiCalls";

export const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
  const { jwtToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [campaignStatusCount, setCampaignStatusCount] = useState([]);
  const [campaignObjectiveCount, setCampaignObjectiveCount] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [objectives, setObjectives] = useState([]);

  const [activeBusiness, setActiveBusiness] = useState(null);

  // useEffect(() => {
  //   const fetchBusinesses = async () => {
  //     try {
  //       const response = await businessesApi(jwtToken);
  //       if (response) {
  //         setBusinesses(response.businesses);
  //       }
  //       setActiveBusiness(response.businesses[0].id);
  //     } catch (err) {
  //       console.log("Error fetching list of businesss", err);
  //     }
  //   };

  //   fetchBusinesses();
  // }, []);

  const fetchInitialData = async () => {
    try {
      const campaignStatusData = campaignStatusCountApi(
        jwtToken,
        activeBusiness
      );
      const campaignObjectiveData = campaignObjectiveCountApi(
        jwtToken,
        activeBusiness
      );

      const response = await Promise.all([
        campaignStatusData,
        campaignObjectiveData,
      ]);

      setCampaignStatusCount(response[0].campaign_status_data);
      setCampaignObjectiveCount(response[1].campaign_status_data);
      setObjectives(
        response[1].campaign_status_data.map(
          (objective) => objective.campaign_objective
        )
      );
      // console.log("campaign objectives: ", objectives);
    } catch (err) {
      console.log("Error fetching campaign status count", err);
    }
  };

  const statsFunction = async (fields, start_date, end_date) => {
    try {
      const response = await getKpiDataApi(
        jwtToken,
        activeBusiness,
        fields,
        start_date,
        end_date
      );
      // console.log(response);
      return response;
    } catch (err) {
      return err;
    }
  };

  const chartsFunction = async (fields, start_date, end_date, selectedCampaigns,
    selectedObjectives) => {
    try {
      const response = await getAdPerformanceDataApi(
        jwtToken,
        activeBusiness,
        fields,
        start_date,
        end_date,
        selectedCampaigns.map(campaign => campaign.campaign_id),
        selectedObjectives
      );
      return response;
    } catch (err) {
      return err;
    }
  };

  const campaignTableDataFunction = async (fields) => {
    try {
      const response = await allCampaignDataApi(
        jwtToken,
        activeBusiness,
        fields
      );
      return response.data;
    } catch (err) {
      return err;
    }
  };

  const AccessControlDataFunction = async () => {
    try {
      const response = await accessConrtolDataApi(jwtToken, activeBusiness);
      return response.data;
    } catch (err) {
      return err;
    }
  };

  return (
    <BusinessContext.Provider
      value={{
        campaignStatusCount,
        campaignObjectiveCount,
        businesses,
        activeBusiness,
        loading,
        objectives,
        setLoading,
        setActiveBusiness,
        setBusinesses,
        statsFunction,
        fetchInitialData,
        chartsFunction,
        campaignTableDataFunction,
        AccessControlDataFunction,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};
