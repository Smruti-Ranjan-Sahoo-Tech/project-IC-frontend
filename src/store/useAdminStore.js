import { create } from "zustand"
import { axiosInstance } from "../API/axiosInstace"
import { toast } from "react-toastify"

export const useAdminStore = create((set, get) => ({
    posts: [],
    loading: false,
    dashBoardData: null,
    dashBoardDataLoding: false,
    allUser:[],
    allUserLoading:false,
    enquiries: [],
    enquiriesLoading: false,
    setFreezeUser:async(id)=>{
        try {
            const res=await axiosInstance.put(`/admin/freezeUser/${id}`)
            toast.success(res.data.message || "User status updated successfully")
            // Refresh user list
            get().setAllUser()
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
    },
    setUnFreezeUser:async(id)=>{
        try {
            const res=await axiosInstance.put(`/admin/unfreezeUser/${id}`)
            toast.success(res.data.message || "User status updated successfully")
            // Refresh user list
            get().setAllUser()
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
    },


    setAllUser:async()=>{
        set({ allUserLoading: true })
           try {
            const {data}=await axiosInstance.get("/admin/getalluser")
            set({ allUser: data.data || [] })
           } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
           }finally{
            set({ allUserLoading: false })
           }
    },

    getAllEnquiries: async () => {
        set({ enquiriesLoading: true })
        try {
            const res = await axiosInstance.get("/enquiry/all")
            set({ enquiries: res.data.data || [] })
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        } finally {
            set({ enquiriesLoading: false })
        }
    },
    
     getDashboardData: async () => {
        set({ dashBoardDataLoding: true })
        try {
            const res= await axiosInstance.get("/admin/dashboard-data")
            set({ dashBoardData: res.data.data })
        } catch (error) {
         toast.error(error?.response?.data?.message || error.message)
        }
        finally{
          set({ dashBoardDataLoding: false })
        }
     },

    getAllPosts: async () => {
        set({ loading: true })
        try {
            const res = await axiosInstance.get("/admin/getallpost")
            set({ posts: res.data.posts || res.data })
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        } finally {
            set({ loading: false })
        }
    },

    createPost: async (data) => {
        set({ loading: true })
        try {
            console.log("Creating post with data:", data)
            const res = await axiosInstance.post("/admin/create-post", data)
            toast.success(res.data.message || "Post created successfully")
            // Refresh posts list
            const currentPosts = get().posts
            set({ posts: [...currentPosts, res.data.post] })
            return res.data.post
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        } finally {
            set({ loading: false })
        }
    },

    updatePost: async (id, data) => {
        set({ loading: true })
        try {
            const res = await axiosInstance.put(`/admin/update-post/${id}`, data)
            toast.success(res.data.message || "Post updated successfully")
            // Update posts list
            const updatedPosts = get().posts.map(post =>
                post._id === id ? res.data.post : post
            )
            set({ posts: updatedPosts })
            return res.data.post
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        } finally {
            set({ loading: false })
        }
    },

    deletePost: async (id) => {
        set({ loading: true })
        try {
            const res = await axiosInstance.delete(`/admin/delete-post/${id}`)
            toast.success(res.data.message || "Post deleted successfully")
            // Remove from posts list
            const filteredPosts = get().posts.filter(post => post._id !== id)
            set({ posts: filteredPosts })
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        } finally {
            set({ loading: false })
        }
    },

    clearPosts: () => set({ posts: [] })
}))
