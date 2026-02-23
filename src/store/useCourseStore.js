import { create } from "zustand";
import { axiosInstance } from "../API/axiosInstace";
import { toast } from "react-toastify";

export const useCourseStore = create((set) => ({
  subjects: [],
  companies: [],
  locations: [],
  loading: false,
  companiesLoading: false,
  locationsLoading: false,

  /* ================= FETCH SUBJECTS ================= */
  fetchSubjects: async (course = "") => {
    try {
      set({ loading: true });

      const res = await axiosInstance.get("/admin/getCourseSubjects", {
        params: course ? { course } : {}
      });

      set({
        subjects: res.data.subjects || [],
        loading: false
      });
    } catch (error) {
      set({ loading: false });
      toast.error(error?.response?.data?.message || "Failed to fetch subjects");
    }
  },

  // fetch subjects for logged-in admin course (used in AddQuestion form)
  fetchSubjectsForCourse: async () => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get("/admin/getCourseSubjects");
      set({
        subjects: res.data.subjects || [],
        loading: false
      });
    } catch (error) {
      set({ loading: false });
      toast.error(error?.response?.data?.message || "Failed to fetch subjects");
    }
  },

  /* ================= ADD SUBJECT ================= */
  addSubject: async (subject) => {
    try {
      const res = await axiosInstance.post("/admin/addCourceSubject", { subject });

      toast.success(res.data.message);

      const nextCourse = res.data.course || res.data.data;
      set({
        subjects: nextCourse?.subjects || []
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add subject");
    }
  },

  /* ================= DELETE SUBJECT ================= */
  deleteSubject: async (subject) => {
    try {
      const encodedSubject = encodeURIComponent(subject);
      const res = await axiosInstance.delete(`/admin/deleteCourceSubject/${encodedSubject}`);

      toast.success(res.data.message);

      set({
        subjects: res.data.course?.subjects || []
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete subject");
    }
  },

  /* ================= FETCH COMPANIES ================= */
  fetchCompanies: async (companyType = "") => {
    try {
      set({ companiesLoading: true });

      const res = await axiosInstance.get("/admin/getCompaniesName", {
        params: companyType ? { companyType } : {}
      });

      set({
        companies: res.data.companies || [],
        companiesLoading: false
      });
    } catch (error) {
      set({ companiesLoading: false });
      toast.error(error?.response?.data?.message || "Failed to fetch companies");
    }
  },

  /* ================= FETCH COMPANY LOCATIONS ================= */
  fetchCompanyLocations: async (company = "", companyType = "") => {
    if (!company || company === "all") {
      set({ locations: [] });
      return;
    }
    try {
      set({ locationsLoading: true });

      const params = { company };
      if (companyType && companyType !== "all") {
        params.companyType = companyType;
      }

      const res = await axiosInstance.get("/admin/getCompaniesName", { params });

      set({
        locations: res.data.locations || [],
        locationsLoading: false
      });
    } catch (error) {
      set({ locationsLoading: false, locations: [] });
      toast.error(error?.response?.data?.message || "Failed to fetch locations");
    }
  },

  /* ================= ADD COMPANY ================= */
  addCompany: async (company) => {
    try {
      const res = await axiosInstance.post("/admin/addCompanyName", { company });

      toast.success(res.data.message);

      set({
        companies: res.data.course?.company || []
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add company");
    }
  },

  /* ================= DELETE COMPANY ================= */
  deleteCompany: async (company) => {
    try {
      const encodedName = encodeURIComponent(company);
      const res = await axiosInstance.delete(`/admin/deleteCompanyName/${encodedName}`);

      toast.success(res.data.message);

      set({
        companies: res.data.course?.company || []
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete company");
    }
  }
}));
