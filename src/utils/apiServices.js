import axios from "axios";

const { CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL } = process.env;

const api_headers_Data = {
  "Content-Type": "application/json",
};

/***  Features  ***/
export const deleteFeature = (featureId) => {
  return axios.delete(
    `${CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL}feature/${featureId}`
  );
};

export const postFeatureData = (newFeatureData) => {
  return axios.post(
    CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL + "/feature",
    newFeatureData,
    { headers: api_headers_Data }
  );
};

export const getPrimaryFeatures = () => {
  return axios.get(CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL + "/primaryfeatures");
};

export const editFeatureData = (featureId, updatedData) => {
  return axios.put(
    `${CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL}feature/${featureId}`,
    updatedData
  );
};

export const getFeatureData = (featureId) => {
  return axios.get(
    `${CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL}features/${featureId}`
  );
};

/***    ***/

export const searchItem = (searchItem, searchTerm) => {
  return axios.get(
    `${CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL}${searchItem}${searchTerm}`
  );
};

/***  Roles  ***/
export const addRoleData = (newFeatureData) => {
  return axios.post(
    CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL + "/role",
    newFeatureData,
    { headers: api_headers_Data }
  );
};

export const editRoleData = (roleId, newFeatureData) => {
  return axios.put(
    CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL + `/role/${roleId}`,
    newFeatureData,
    { headers: api_headers_Data }
  );
};

export const fetchRoleData = (roleId) => {
  return axios.get(CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL + `/roles/${roleId}`);
};

export const getAllRoles = () => {
  return axios.get(CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL + "/all/roles");
};

export const deleteRole = (roleId) => {
  return axios.delete(CSC_ADMIN_ACCESS_MANAGEMENT_BASE_URL + `/role/${roleId}`);
};
/***   ***/
