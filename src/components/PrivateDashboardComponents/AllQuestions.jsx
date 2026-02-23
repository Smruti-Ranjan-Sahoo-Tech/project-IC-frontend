import React, { useEffect, useMemo, useState } from "react";
import { useAdminStore } from "../../store/useAdminStore";
import { useCourseStore } from "../../store/useCourseStore";
import { ListChecks } from "lucide-react";
import { toast } from "react-toastify";
import QuestionsTable from "./AllQuestionsParts/QuestionsTable";
import QuestionsPagination from "./AllQuestionsParts/QuestionsPagination";
import EditQuestionModal from "./AllQuestionsParts/EditQuestionModal";

const QUESTIONS_PER_PAGE = 8;

const getSubjectName = (subject) => {
  if (typeof subject === "string") return subject;
  return subject?.name || "";
};

const isApprovedSubject = (subject) => {
  if (typeof subject === "string") return true;
  return subject?.status === "approve";
};

const AllQuestions = () => {
  const { posts, loading, getAllPosts, updatePost, deletePost } = useAdminStore();
  const {
    subjects,
    companies,
    fetchSubjectsForCourse,
    fetchCompanies,
    addCompany,
    loading: loadingSubjects
  } = useCourseStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [editingPost, setEditingPost] = useState(null);
  const [editData, setEditData] = useState({
    question: "",
    answer: "",
    questionType: "Interview",
    subject: "",
    companyType: "Other",
    company: "",
    location: ""
  });
  const [editNewCompany, setEditNewCompany] = useState("");
  const selectableSubjects = subjects
    .filter((subject) => isApprovedSubject(subject))
    .map((subject) => getSubjectName(subject))
    .filter(Boolean);

  useEffect(() => {
    getAllPosts();
    fetchSubjectsForCourse();
    fetchCompanies();
  }, [getAllPosts, fetchSubjectsForCourse, fetchCompanies]);

  const totalPages = Math.max(1, Math.ceil((posts?.length || 0) / QUESTIONS_PER_PAGE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedPosts = useMemo(() => {
    if (!posts?.length) return [];

    const start = (currentPage - 1) * QUESTIONS_PER_PAGE;
    const end = start + QUESTIONS_PER_PAGE;
    return posts.slice(start, end);
  }, [posts, currentPage]);

  const openEditModal = (post) => {
    setEditingPost(post);
    setEditData({
      question: post.question || "",
      answer: post.answer || "",
      questionType: post.questionType || "Interview",
      subject: post.subject || "",
      companyType: post.companyType || "Other",
      company: post.company || "",
      location: post.location || ""
    });
    setEditNewCompany("");
  };

  const closeEditModal = () => {
    setEditingPost(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    if (name === "companyType") {
      setEditData((prev) => ({
        ...prev,
        companyType: value,
        company: ""
      }));
      fetchCompanies(value);
      return;
    }

    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingPost) return;

    if (
      !editData.question.trim() ||
      !editData.answer.trim() ||
      !editData.subject.trim()
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    const companyValue =
      editData.company === "__new__"
        ? editNewCompany.trim()
        : editData.company.trim();

    if (!companyValue) {
      toast.error("Please select or add a company.");
      return;
    }

    if (!editData.location.trim()) {
      toast.error("Please enter location.");
      return;
    }

    if (editData.company === "__new__") {
      await addCompany(companyValue);
    }

    const updated = await updatePost(editingPost._id, {
      question: editData.question.trim(),
      answer: editData.answer.trim(),
      questionType: editData.questionType,
      subject: editData.subject,
      companyType: editData.companyType,
      company: companyValue,
      location: editData.location.trim()
    });

    if (updated) {
      closeEditModal();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this question?")) return;
    await deletePost(id);
  };

  return (
    <div className="min-h-full p-4 sm:p-6 md:p-10 bg-gradient-to-br from-teal-50 via-slate-50 to-amber-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300">
            <ListChecks size={22} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
              All Questions
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Manage all questions with edit and delete controls.
            </p>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-teal-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 shadow-xl">
          <QuestionsTable
            loading={loading}
            posts={paginatedPosts}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
          <QuestionsPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <EditQuestionModal
        isOpen={Boolean(editingPost)}
        onClose={closeEditModal}
        onSubmit={handleUpdate}
        editData={editData}
        onEditChange={handleEditChange}
        editNewCompany={editNewCompany}
        onEditNewCompanyChange={setEditNewCompany}
        companies={companies}
        selectableSubjects={selectableSubjects}
        loadingSubjects={loadingSubjects}
        loading={loading}
      />
    </div>
  );
};

export default AllQuestions;
