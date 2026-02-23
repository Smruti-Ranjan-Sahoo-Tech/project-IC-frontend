import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
import { useAuthStore } from "../store/useAuthStore";
import Footer from "../components/Footer/Footer";

const Home = () => {
  const { isLoggedIn, role } = useAuthStore();
  const navigate = useNavigate();

  const dashboardDirect = () => {
    if (isLoggedIn) {
      navigate(role === "admin" ? "/admin" : "/user");
      return;
    }
    navigate("/login");
  };

  const features = [
    { label: "Students Trained", value: "1K+" },
    { label: "Placement Questions", value: "5K+" },
    { label: "Company Patterns", value: "20+" },
    { label: "Success Rate", value: "92%" }
  ];

  const companies = [
    {
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
    },
    {
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
    },
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
    },
    {
      name: "Infosys",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg"
    },
    {
      name: "Wipro",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg"
    },
    {
      name: "Accenture",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg"
    },
    {
      name: "Deloitte",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Deloitte_Logo.svg"
    }
  ];

  return (
    <>
      <main className="bg-white dark:bg-slate-950">
      <section className="bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="home-text-reveal text-5xl md:text-6xl font-extrabold leading-tight">
              Learn <span className="text-amber-500">Smart</span>, Achieve{" "}
              <span className="text-amber-500">Fast</span>
            </h1>

            <p className="home-text-reveal home-delay-1 mt-4 text-lg text-gray-700 dark:text-slate-300">
              Crack top company placements with confidence.
            </p>

            <p className="home-text-reveal home-delay-2 mt-2 text-gray-600 dark:text-slate-400">
              Prepare aptitude, coding, and interviews with focused practice
              questions and clear answers.
            </p>

            <div className="home-text-reveal home-delay-3 mt-6 flex gap-4 flex-wrap">
              <button
                onClick={dashboardDirect}
                className="bg-teal-500 flex gap-1 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition"
              >
                Get Started
                <span className="mt-1">
                  <GoArrowUpRight />
                </span>
              </button>

              <Link
                to={isLoggedIn ? "/user" : "/register"}
                className="border border-teal-700 text-teal-600 dark:text-teal-300 px-6 py-3 rounded-lg font-semibold hover:bg-teal-500 hover:text-white transition"
              >
                Explore Questions
              </Link>
            </div>
          </div>

          <div className="home-box-pop home-delay-2 bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 space-y-6 border border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="home-box-pop home-delay-3 hover-card border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center hover:shadow-md transition">
                <h3 className="font-semibold text-lg text-amber-500">
                  Aptitude
                </h3>
                <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                  Quant, Logical, Verbal
                </p>
              </div>

              <div className="home-box-pop home-delay-4 hover-card border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center hover:shadow-md transition">
                <h3 className="font-semibold text-lg text-amber-500">Coding</h3>
                <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                  DSA and company problems
                </p>
              </div>

              <div className="home-box-pop home-delay-5 hover-card border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center hover:shadow-md transition">
                <h3 className="font-semibold text-lg text-amber-500">
                  Interviews
                </h3>
                <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                  HR and technical rounds
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {features.map((item) => (
            <div key={item.label} className="home-box-pop">
              <p className="text-3xl font-bold text-amber-500">{item.value}</p>
              <p className="text-sm text-gray-600 dark:text-slate-400">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Why Choose Us?
          </h2>

          <div className="mt-10 grid md:grid-cols-3 gap-8">
            {[
              "Company-Specific Preparation",
              "Updated Placement Questions",
              "Expert-Designed Learning Path"
            ].map((title) => (
              <div
                key={title}
                className="home-box-pop hover-card bg-white dark:bg-slate-950 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-800"
              >
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
                  Learn with real interview patterns and structured preparation.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Companies You Will Be Ready For
          </h2>

          <div className="mt-10 logo-marquee-mask group overflow-hidden">
            <div className="logo-marquee-track flex gap-8 whitespace-nowrap group-hover:[animation-play-state:paused]">
              {[...companies, ...companies].map((company, idx) => (
                <div
                  key={`${company.name}-${idx}`}
                  className="logo-card-float flex items-center justify-center min-w-[180px] h-20 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="max-h-10 max-w-[140px] object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-slate-900 to-amber-500"></div>
        <div className="absolute bottom-0 left-20 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-delay-1"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold">
            Start Your Developer Journey Today
          </h2>
          <p className="mt-4 text-lg md:text-xl opacity-95">
            Explore curated learning resources and level up your skills with
            confidence.
          </p>
          <button
            onClick={dashboardDirect}
            className="mt-8 inline-flex items-center justify-center px-8 py-3 rounded-lg bg-white text-teal-700 font-semibold hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Start Learning
          </button>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
