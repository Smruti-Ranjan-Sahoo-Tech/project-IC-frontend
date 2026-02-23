import React from 'react'

const MyQuestions = () => {
  // Mock data - in real implementation, fetch user's questions from API
  // const myQuestions = [
  //   {
  //     id: 1,
  //     question: 'What is the difference between let and const in JavaScript?',
  //     answer: 'let is block-scoped and can be reassigned, while const is block-scoped but cannot be reassigned.',
  //     type: 'Subjective',
  //     course: 'MERN',
  //     date: '2024-02-10',
  //     status: 'Approved'
  //   },
  //   {
  //     id: 2,
  //     question: 'Explain the concept of closures in JavaScript.',
  //     answer: 'A closure is a function that has access to variables from its outer scope even after the outer function returns.',
  //     type: 'Subjective',
  //     course: 'MERN',
  //     date: '2024-02-08',
  //     status: 'Approved'
  //   },
  //   {
  //     id: 3,
  //     question: 'What are async and await?',
  //     answer: 'async/await is syntactic sugar for promises that allows you to write asynchronous code in a synchronous manner.',
  //     type: 'Subjective',
  //     course: 'MERN',
  //     date: '2024-02-05',
  //     status: 'Pending'
  //   }
  // ]

  return (
    <div className="flex-1 bg-gradient-to-br from-teal-50 via-slate-50 to-amber-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 p-4 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          My Questions
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          View and manage your submitted questions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border-l-4 border-teal-500">
          <p className="text-slate-600 dark:text-slate-400 text-sm">Total Questions</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{myQuestions.length}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <p className="text-slate-600 dark:text-slate-400 text-sm">Approved</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{myQuestions.filter(q => q.status === 'Approved').length}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
          <p className="text-slate-600 dark:text-slate-400 text-sm">Pending Review</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{myQuestions.filter(q => q.status === 'Pending').length}</p>
        </div>
      </div>

      {/* Questions Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your Questions</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Question</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Course</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myQuestions.map((question) => (
                <tr key={question.id} className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <td className="px-6 py-4 text-sm">
                    <p className="font-medium text-slate-900 dark:text-white">{question.question.substring(0, 50)}...</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-200">
                      {question.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{question.course}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{question.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      question.status === 'Approved'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {question.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white text-xs rounded-lg transition-colors">
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded-lg transition-colors">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MyQuestions
