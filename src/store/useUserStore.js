import { create } from "zustand"
import { axiosInstance } from "../API/axiosInstace"
import { toast } from "react-toastify"

const defaultUserDashboardFilters = {
    subject: "",
    questionType: "",
    companyType: "all",
    company: "all",
    location: "all"
}

export const useUserStore = create((set, get) => ({
    posts: [],
    subjects: [],
    pendingReviews: [],
    approvedReviews: [],
    pendingNotes: [],
    approvedNotes: [],
    loading: false,
    subjectLoading: false,
    allUserReviewLoading: false,
    allUserNoteLoading: false,
    reviewLoading: false,
    reviewHistoryLoading: false,
    noteLoading: false,
    noteHistoryLoading: false,
    allUserReviews: [],
    allUserNotes: [],
    allUserReviewsPagination: {
        currentPage: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    },
    allUserNotesPagination: {
        currentPage: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    },
    userDashboardFilters: { ...defaultUserDashboardFilters },
    pagination: {
        currentPage: 1,
        limit: 10,
        total: 0,
        totalPages: 0
    },

    getPostData: async ({
        subject = "all",
        questionType = "all",
        companyType = "all",
        company = "all",
        location = "all",
        page = 1,
        limit = 10
    } = {}) => {
        set({ loading: true })
        try {
            const subjectParam = subject || "all"
            const questionTypeParam = questionType || "all"
            const res = await axiosInstance.get(`/user/getpostdata/${subjectParam}/${questionTypeParam}`, {
                params: {
                    page,
                    limit,
                    companyType: companyType || "all",
                    company: company || "all",
                    location: location || "all"
                }
            })
            set({
                posts: res.data.posts,
                pagination: {
                    currentPage: res.data.page,
                    limit: res.data.limit,
                    total: res.data.total,
                    totalPages: res.data.totalPages
                }
            })
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        } finally {
            set({ loading: false })
        }
    },

    getSubjectsByCourse: async () => {
        set({ subjectLoading: true })
        try {
            const res = await axiosInstance.get(`/user/getSubjectName`)
            set({ subjects: res.data.subjects || [] })
        } catch (error) {
            set({ subjects: [] })
            toast.error(error?.response?.data?.message || error.message)
        } finally {
            set({ subjectLoading: false })
        }
    },

    setUserDashboardFilters: (updates) => {
        set((state) => ({
            userDashboardFilters: {
                ...state.userDashboardFilters,
                ...updates
            }
        }))
    },

    resetUserDashboardFilters: () => {
        set({ userDashboardFilters: { ...defaultUserDashboardFilters } })
    },

    fetchUserDashboardPosts: async ({ page = 1, limit = 10 } = {}) => {
        const { userDashboardFilters, getPostData } = get()
        return getPostData({
            subject: userDashboardFilters.subject || "all",
            questionType: userDashboardFilters.questionType || "all",
            companyType: userDashboardFilters.companyType || "all",
            company: userDashboardFilters.company || "all",
            location: userDashboardFilters.location || "all",
            page,
            limit
        })
    },

    addReview: async (payload) => {
        set({ reviewLoading: true })
        try {
            const res = await axiosInstance.post("/user/add-review", payload)
            toast.success(res.data.message || "Review submitted successfully")
            return res.data.reviews || []
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
            return []
        } finally {
            set({ reviewLoading: false })
        }
    },

    getReview: async () => {
        set({ reviewHistoryLoading: true })
        try {
            const res = await axiosInstance.get("/user/get-review")
            set({
                pendingReviews: res.data.pendingReviews || [],
                approvedReviews: res.data.approvedReviews || []
            })
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        } finally {
            set({ reviewHistoryLoading: false })
        }
    },

    getAllUserReviews: async ({
        subject = "all",
        questionType = "all",
        companyType = "all",
        company = "all",
        location = "all",
        page = 1,
        limit = 10
    }) => {
        set({ allUserReviewLoading: true })
        try {
            const res = await axiosInstance.get("/user/get-all-user-reviews", {
                params: {
                    subject: subject || "all",
                    questionType: questionType || "all",
                    companyType: companyType || "all",
                    company: company || "all",
                    location: location || "all",
                    page,
                    limit
                }
            })

            set({
                allUserReviews: res.data.reviews || [],
                allUserReviewsPagination: {
                    currentPage: res.data.page || 1,
                    limit: res.data.limit || limit,
                    total: res.data.total || 0,
                    totalPages: res.data.totalPages || 0
                }
            })
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        } finally {
            set({ allUserReviewLoading: false })
        }
    },

    addNote: async (payload) => {
        set({ noteLoading: true })
        try {
            const formData = new FormData()
            Object.entries(payload || {}).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== "") {
                    formData.append(key, value)
                }
            })
            const res = await axiosInstance.post("/user/add-note", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            toast.success(res.data.message || "Note submitted successfully")
            return res.data.note || res.data.notes || {}
        } catch (error) {
            const apiMessage = error?.response?.data?.message
            const resolvedMessage =
                typeof apiMessage === "string"
                    ? apiMessage
                    : (apiMessage && JSON.stringify(apiMessage)) || error.message || "Failed to submit note"
            toast.error(resolvedMessage)
            return null
        } finally {
            set({ noteLoading: false })
        }
    },

    getNote: async () => {
        set({ noteHistoryLoading: true })
        try {
            const res = await axiosInstance.get("/user/get-note")
            set({
                pendingNotes: res.data.pendingNotes || [],
                approvedNotes: res.data.approvedNotes || []
            })
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        } finally {
            set({ noteHistoryLoading: false })
        }
    },

    getAllUserNotes: async ({
        subject = "all",
        questionType = "all",
        companyType = "all",
        company = "all",
        location = "all",
        page = 1,
        limit = 10
    }) => {
        set({ allUserNoteLoading: true })
        try {
            const res = await axiosInstance.get("/user/get-all-user-note", {
                params: {
                    subject: subject || "all",
                    questionType: questionType || "all",
                    companyType: companyType || "all",
                    company: company || "all",
                    location: location || "all",
                    page,
                    limit
                }
            })

            set({
                allUserNotes: res.data.notes || [],
                allUserNotesPagination: {
                    currentPage: res.data.page || 1,
                    limit: res.data.limit || limit,
                    total: res.data.total || 0,
                    totalPages: res.data.totalPages || 0
                }
            })
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        } finally {
            set({ allUserNoteLoading: false })
        }
    },

    clearPosts: () => set({
        posts: [],
        subjects: [],
        pendingReviews: [],
        approvedReviews: [],
        pendingNotes: [],
        approvedNotes: [],
        allUserReviews: [],
        allUserNotes: [],
        userDashboardFilters: { ...defaultUserDashboardFilters },
        pagination: { currentPage: 1, limit: 10, total: 0, totalPages: 0 },
        allUserReviewsPagination: { currentPage: 1, limit: 10, total: 0, totalPages: 0 },
        allUserNotesPagination: { currentPage: 1, limit: 10, total: 0, totalPages: 0 }
    })
}))
