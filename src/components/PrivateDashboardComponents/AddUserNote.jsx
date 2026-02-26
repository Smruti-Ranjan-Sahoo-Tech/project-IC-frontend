import React, { useEffect, useMemo, useState } from "react"
import { toast } from "react-toastify"
import { useCourseStore } from "../../store/useCourseStore"
import { useUserStore } from "../../store/useUserStore"

const getSubjectName = (subject) => {
  if (typeof subject === "string") return subject
  return subject?.name || ""
}

const isApprovedSubject = (subject) => {
  if (typeof subject === "string") return true
  return subject?.status === "approve"
}

const AddUserNote = () => {
  const { subjects, companies, fetchSubjectsForCourse, fetchCompanies, companiesLoading } = useCourseStore()
  const { addNote, getNote, pendingNotes, approvedNotes, noteLoading, noteHistoryLoading } = useUserStore()

  const [form, setForm] = useState({
    companyType: "Other",
    company: "",
    location: "",
    questionType: "Interview",
    subject: "",
    title: ""
  })
  const [pdfFile, setPdfFile] = useState(null)

  const selectableSubjects = useMemo(
    () =>
      subjects
        .filter((item) => isApprovedSubject(item))
        .map((item) => getSubjectName(item))
        .filter(Boolean),
    [subjects]
  )

  useEffect(() => {
    fetchSubjectsForCourse()
    fetchCompanies()
    getNote()
  }, [fetchSubjectsForCourse, fetchCompanies, getNote])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))

    if (name === "companyType") {
      fetchCompanies(value)
      setForm((prev) => ({ ...prev, companyType: value, company: "" }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!pdfFile) {
      toast.error("Please upload a PDF file.")
      return
    }
    if (!form.company.trim() || !form.location.trim() || !form.subject.trim()) {
      toast.error("Please fill company, location, and subject.")
      return
    }

    const res = await addNote({
      ...form,
      company: form.company.trim(),
      location: form.location.trim(),
      subject: form.subject.trim(),
      title: form.title.trim(),
      pdfFile
    })

    if (res) {
      setForm({
        companyType: "Other",
        company: "",
        location: "",
        questionType: "Interview",
        subject: "",
        title: ""
      })
      setPdfFile(null)
      fetchCompanies()
      getNote()
    }
  }

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gradient-to-br from-teal-50 via-slate-50 to-amber-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Add Note</h1>
          <p className="text-slate-600 dark:text-slate-400">Upload your PDF note for verification</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="grid md:grid-cols-3 gap-3">
            <select
              name="companyType"
              value={form.companyType}
              onChange={handleChange}
              className="p-3 border rounded-lg dark:bg-slate-900 dark:border-slate-700 dark:text-white"
            >
              <option value="MNC">MNC</option>
              <option value="Startup">Startup</option>
              <option value="Other">Other</option>
            </select>
            <select
              name="company"
              value={form.company}
              onChange={handleChange}
              className="p-3 border rounded-lg dark:bg-slate-900 dark:border-slate-700 dark:text-white"
            >
              <option value="">{companiesLoading ? "Loading companies..." : "Select company"}</option>
              {companies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
              className="p-3 border rounded-lg dark:bg-slate-900 dark:border-slate-700 dark:text-white"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            <select
              name="questionType"
              value={form.questionType}
              onChange={handleChange}
              className="p-3 border rounded-lg dark:bg-slate-900 dark:border-slate-700 dark:text-white"
            >
              <option value="Interview">Interview</option>
              <option value="Coding">Coding</option>
              <option value="Subjective">Subjective</option>
            </select>
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="p-3 border rounded-lg dark:bg-slate-900 dark:border-slate-700 dark:text-white"
            >
              <option value="">Select subject</option>
              {selectableSubjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title (optional)"
              className="p-3 border rounded-lg dark:bg-slate-900 dark:border-slate-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Upload PDF</label>
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
              className="w-full p-2 border rounded-lg dark:bg-slate-900 dark:border-slate-700 dark:text-white"
            />
          </div>

          <button type="submit" disabled={noteLoading} className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg disabled:opacity-60">
            {noteLoading ? "Submitting..." : "Submit Note"}
          </button>
        </form>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">My Note Request Status</h2>
          {noteHistoryLoading ? (
            <p className="text-slate-500">Loading your requests...</p>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Pending / Rejected</h3>
                {pendingNotes.length === 0 ? (
                  <p className="text-slate-500">No pending note requests</p>
                ) : (
                  <div className="space-y-2">
                    {pendingNotes.map((item) => (
                      <div key={item._id} className="p-3 rounded-lg bg-slate-100 dark:bg-slate-900 flex justify-between gap-3">
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{item.title || item.subject || "Untitled note"}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-300">{item.company} ({item.companyType}) - {item.location}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full h-fit ${item.status === "rejected" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"}`}>
                          {item.status || "pending"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Approved</h3>
                {approvedNotes.length === 0 ? (
                  <p className="text-slate-500">No approved notes yet</p>
                ) : (
                  <div className="space-y-2">
                    {approvedNotes.map((item) => (
                      <div key={item._id} className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex justify-between gap-3">
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{item.title || item.subject || "Untitled note"}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-300">{item.company} ({item.companyType}) - {item.location}</p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full h-fit bg-emerald-100 text-emerald-700">approved</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AddUserNote
