import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
// import { Country, ICountry } from 'country-state-city';
// import { searchLocation } from '@/api/locationAPi';
// import { useReport } from '@/context/ReportContext';
import CelestialBackground from "../components/animations/CelestialBackground";
import CustomSelect from "../components/ui/CustomSelect";

const MONTHS = [
  { name: "Jan", val: "1" },
  { name: "Feb", val: "2" },
  { name: "Mar", val: "3" },
  { name: "Apr", val: "4" },
  { name: "May", val: "5" },
  { name: "Jun", val: "6" },
  { name: "Jul", val: "7" },
  { name: "Aug", val: "8" },
  { name: "Sep", val: "9" },
  { name: "Oct", val: "10" },
  { name: "Nov", val: "11" },
  { name: "Dec", val: "12" },
];

export default function BirthDetailsForm({ onSubmitDetails }) {
  const navigate = useNavigate();
  // const { fetchReport } = useReport();
  const [activeTab, setActiveTab] = useState("Gemstone");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [data, setData] = useState({
    fullName: "",
    email: "",
    gender: "",
    birthDay: "1",
    birthMonth: "1",
    birthYear: "2000",
    birthHour: "12",
    birthMinute: "00",
    birthSecond: "00",
    birthCountry: "IN",
    birthCity: "",
    latitude: "",
    longitude: "",
    weight: "",
  });

  const onChange = (updates) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const [apiCities, setApiCities] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isValidCity, setIsValidCity] = useState(false);

  // Dynamic Calendar Validation
  const maxDays = data.birthMonth
    ? new Date(
        data.birthYear ? Number(data.birthYear) : 2024,
        Number(data.birthMonth),
        0,
      ).getDate()
    : 31;
  const days = Array.from({ length: maxDays }, (_, i) => String(i + 1));

  useEffect(() => {
    if (data.birthDay && Number(data.birthDay) > maxDays) {
      onChange({ birthDay: String(maxDays) });
    }
  }, [maxDays]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1920 + 1 }, (_, i) =>
    String(currentYear - i),
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.gender) {
      alert("Please select your gender.");
      return;
    }
    // fetchReport(data);

    // Clear form fields
    onChange({
      fullName: "",
      email: "",
      gender: "",
      birthDay: "1",
      birthMonth: "1",
      birthYear: "2000",
      birthHour: "12",
      birthMinute: "00",
      birthSecond: "00",
      birthCountry: "IN",
      birthCity: "",
      latitude: "",
      longitude: "",
      weight: "",
    });

    if (onSubmitDetails) {
      onSubmitDetails({
        name: data.fullName,
        gender: data.gender,
        dob: `${data.birthDay}/${data.birthMonth}/${data.birthYear}`,
        tob: `${data.birthHour}:${data.birthMinute} ${parseInt(data.birthHour || "12") >= 12 ? "PM" : "AM"}`,
        country: data.country,
        city: data.birthCity,
        weightKg: data.weight,
      });
    }

    navigate("/loading");
  };

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center p-4 lg:p-8 relative overflow-x-hidden overflow-y-auto">
      <div className="fixed inset-0 z-0 bg-[#0B0F19]">
        <CelestialBackground />
      </div>
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-16 items-center relative z-10 py-6 md:py-8 lg:py-12">
        {/* Left Side Text */}
        <div className="text-white space-y-5 lg:space-y-7 flex flex-col items-center md:items-start w-full">
          <a
            href="https://www.astroved.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-2 md:mb-4"
          >
            <img
              src="https://cdn.astroved.com/images/images-av/AstroVed-Logo.svg"
              alt="AstroVed Logo"
              className="h-10 md:h-12 w-auto"
            />
          </a>
          <h1 className="text-3xl md:text-2xl lg:text-5xl font-normal leading-tight text-white drop-shadow-md font-serif text-center md:text-left">
            Discover Your Personalized <br className="hidden md:block" />{" "}
            Gemstone
          </h1>
          <p className="text-white/90 text-sm md:text-sm lg:text-base leading-relaxed font-normal max-w-lg mx-auto md:mx-0 text-center md:text-left">
            Find the gemstone aligned with your birth chart, planetary strengths
            and current Dasha.
          </p>

          <div className="space-y-3 lg:space-y-5 pt-4 border-t border-white/20 max-w-md w-full">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600/20 flex items-center justify-center border border-emerald-500/50 mt-0.5">
                <svg
                  className="w-3.5 h-3.5 text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"
                  ></path>
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-base font-medium text-white">
                  100% Secure & Confidential
                </h3>
                <p className="text-sm text-white/70 mt-0.5">
                  Your details are used only to calculate your personalized
                  gemstone recommendation.
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-center md:justify-start">
              {/* Fallback image if asset doesn't exist */}
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-emerald-900/40 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <span className="text-emerald-400 font-serif text-lg">
                  Emerald
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-visible max-w-md w-full mx-auto md:ml-auto md:mr-0 flex flex-col my-auto">
          {/* Tabs */}
          <div className="flex w-full shrink-0">
            <button
              onClick={() => setActiveTab("Gemstone")}
              className={`flex-1 py-3 text-center font-normal text-sm transition-colors duration-200 rounded-t-2xl ${
                activeTab === "Gemstone"
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              Gemstone
            </button>
          </div>

          <div className="p-4 md:p-5 lg:p-6 space-y-3 lg:space-y-4 relative flex-1">
            {/* Header Title Grid */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-serif text-lg md:text-xl lg:text-2xl font-normal text-gray-800 tracking-tight leading-none">
                  Enter Your Birth Details
                </h2>
                <p className="text-gray-500 text-sm mt-2 font-medium">
                  Get your personalized Gemstone report with accurate
                  predictions.
                </p>
              </div>
            </div>

            {/* Input Details form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Row: Name and Gender */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="relative">
                  <label
                    htmlFor="name-input"
                    className="absolute -top-2 left-3 px-1 bg-white text-[10px] text-emerald-600 font-normal tracking-wide z-10"
                  >
                    Full Name
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    required
                    value={data.fullName || ""}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                      onChange({ fullName: val });
                    }}
                    className="w-full px-4 py-3 text-sm text-gray-800 font-medium placeholder-gray-500 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="gender-select"
                    className="absolute -top-2 left-3 px-1 bg-white text-[10px] text-emerald-600 font-normal tracking-wide z-10"
                  >
                    Gender
                  </label>
                  <div className="relative">
                    <CustomSelect
                      id="gender-select"
                      required
                      value={data.gender || ""}
                      onChange={(val) => onChange({ gender: val })}
                      placeholder="Select Gender"
                      options={[
                        { value: "Male", label: "Male" },
                        { value: "Female", label: "Female" },
                      ]}
                      className="!pl-4 !pr-8 !py-3 !text-sm border-gray-200 rounded-xl focus-within:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Day / Month / Year Dropdowns */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
                {/* Day */}
                <div className="relative">
                  <label
                    htmlFor="day-select"
                    className="absolute -top-2 left-2 px-1 bg-white text-[10px] text-emerald-600 font-normal tracking-wide z-10"
                  >
                    Day
                  </label>
                  <div className="relative">
                    <CustomSelect
                      id="day-select"
                      required
                      value={data.birthDay || ""}
                      onChange={(val) => onChange({ birthDay: val })}
                      placeholder="DD"
                      options={days.map((d) => ({ value: d, label: d }))}
                      className="!pl-2 sm:!pl-3 !pr-6 sm:!pr-8 !py-3 !text-xs sm:!text-sm border-gray-200 rounded-lg focus-within:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Month */}
                <div className="relative">
                  <label
                    htmlFor="month-select"
                    className="absolute -top-2 left-2 px-1 bg-white text-[10px] text-emerald-600 font-normal tracking-wide z-10"
                  >
                    Month
                  </label>
                  <div className="relative">
                    <CustomSelect
                      id="month-select"
                      required
                      value={data.birthMonth || ""}
                      onChange={(val) => onChange({ birthMonth: val })}
                      placeholder="MM"
                      options={MONTHS.map((m) => ({
                        value: m.val,
                        label: m.name,
                      }))}
                      className="!pl-2 sm:!pl-3 !pr-6 sm:!pr-8 !py-3 !text-xs sm:!text-sm border-gray-200 rounded-lg focus-within:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Year */}
                <div className="relative">
                  <label
                    htmlFor="year-select"
                    className="absolute -top-2 left-2 px-1 bg-white text-[10px] text-emerald-600 font-normal tracking-wide z-10"
                  >
                    Year
                  </label>
                  <div className="relative">
                    <CustomSelect
                      id="year-select"
                      required
                      value={data.birthYear || ""}
                      onChange={(val) => onChange({ birthYear: val })}
                      placeholder="YYYY"
                      options={years.map((y) => ({ value: y, label: y }))}
                      className="!pl-2 sm:!pl-3 !pr-6 sm:!pr-8 !py-3 !text-xs sm:!text-sm border-gray-200 rounded-lg focus-within:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Birth Time: Hour / Minute / AM/PM */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
                {/* Hour */}
                <div className="relative">
                  <label
                    id="hour-label"
                    htmlFor="hour-select"
                    className="absolute -top-2 left-2 px-1 bg-white text-[10px] text-emerald-600 font-normal tracking-wide z-10"
                  >
                    Hour
                  </label>
                  <div className="relative">
                    <CustomSelect
                      id="hour-select"
                      required
                      value={String(
                        parseInt(data.birthHour || "12") % 12 || 12,
                      ).padStart(2, "0")}
                      onChange={(val) => {
                        const isPM = parseInt(data.birthHour || "12") >= 12;
                        const numVal = parseInt(val);
                        let new24Hour = numVal;
                        if (isPM && numVal !== 12) new24Hour += 12;
                        if (!isPM && numVal === 12) new24Hour = 0;
                        onChange({
                          birthHour: String(new24Hour).padStart(2, "0"),
                        });
                      }}
                      placeholder="HH"
                      options={Array.from({ length: 12 }, (_, i) => {
                        const h = String(i + 1).padStart(2, "0");
                        return { value: h, label: h };
                      })}
                      className="!pl-2 sm:!pl-3 !pr-6 sm:!pr-8 !py-3 !text-xs sm:!text-sm border-gray-200 rounded-lg focus-within:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Minute */}
                <div className="relative">
                  <label
                    id="minute-label"
                    htmlFor="minute-select"
                    className="absolute -top-2 left-2 px-1 bg-white text-[10px] text-emerald-600 font-normal tracking-wide z-10"
                  >
                    Minute
                  </label>
                  <div className="relative">
                    <CustomSelect
                      id="minute-select"
                      required
                      value={data.birthMinute || ""}
                      onChange={(val) => onChange({ birthMinute: val })}
                      placeholder="MM"
                      options={Array.from({ length: 60 }, (_, i) => {
                        const v = String(i).padStart(2, "0");
                        return { value: v, label: v };
                      })}
                      className="!pl-2 sm:!pl-3 !pr-6 sm:!pr-8 !py-3 !text-xs sm:!text-sm border-gray-200 rounded-lg focus-within:border-emerald-500"
                    />
                  </div>
                </div>

                {/* AM / PM */}
                <div className="relative">
                  <label
                    id="ampm-label"
                    htmlFor="ampm-select"
                    className="absolute -top-2 left-2 px-1 bg-white text-[10px] text-emerald-600 font-normal tracking-wide z-10"
                  >
                    AM / PM
                  </label>
                  <div className="relative">
                    <CustomSelect
                      id="ampm-select"
                      required
                      value={
                        parseInt(data.birthHour || "12") >= 12 ? "PM" : "AM"
                      }
                      onChange={(val) => {
                        const current12 =
                          parseInt(data.birthHour || "12") % 12 || 12;
                        let new24Hour = current12;
                        if (val === "PM" && current12 !== 12) new24Hour += 12;
                        if (val === "AM" && current12 === 12) new24Hour = 0;
                        onChange({
                          birthHour: String(new24Hour).padStart(2, "0"),
                        });
                      }}
                      placeholder="AM/PM"
                      options={[
                        { value: "AM", label: "AM" },
                        { value: "PM", label: "PM" },
                      ]}
                      className="!pl-2 sm:!pl-3 !pr-6 sm:!pr-8 !py-3 !text-xs sm:!text-sm border-gray-200 rounded-lg focus-within:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Row: Country and City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="relative">
                  <label
                    htmlFor="country-select"
                    className="absolute -top-2 left-3 px-1 bg-white text-[10px] text-emerald-600 font-normal tracking-wide z-10"
                  >
                    Birth Country
                  </label>
                  <div className="relative">
                    <CustomSelect
                      id="country-select"
                      required
                      value={data.birthCountry || ""}
                      onChange={(val) =>
                        onChange({ birthCountry: val, birthCity: "" })
                      }
                      placeholder="Select Country"
                      options={[
                        { value: "IN", label: "India" },
                        { value: "US", label: "United States" },
                      ]} // placeholder
                      className="!pl-4 !pr-8 !py-3 !text-sm border-gray-200 rounded-xl focus-within:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="city-input"
                    className="absolute -top-2 left-3 px-1 bg-white text-[10px] text-emerald-600 font-normal tracking-wide z-10"
                  >
                    Birth City / District
                  </label>
                  <div className="relative">
                    <input
                      id="city-input"
                      type="text"
                      required
                      value={data.birthCity || ""}
                      onChange={(e) => {
                        onChange({ birthCity: e.target.value });
                        setShowSuggestions(true);
                      }}
                      placeholder="e.g. Chennai"
                      className="w-full pl-4 pr-8 py-3 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-text relative z-0 disabled:opacity-50"
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>

              {/* Weight */}
              <div className="grid grid-cols-1 gap-3 pt-1">
                <div className="relative mt-1">
                  <label
                    htmlFor="weight-input"
                    className="absolute -top-2 left-3 px-1 bg-white text-[10px] text-emerald-600 font-normal tracking-wide z-10"
                  >
                    Weight (Optional)
                  </label>
                  <input
                    id="weight-input"
                    type="number"
                    value={data.weight || ""}
                    onChange={(e) => onChange({ weight: e.target.value })}
                    className="w-full px-4 py-3 text-sm text-gray-800 font-medium placeholder-gray-500 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    placeholder="Enter weight in kg"
                  />
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] text-white font-normal text-sm md:text-[13px] lg:text-base whitespace-nowrap rounded-xl shadow-lg transition-all duration-200 cursor-pointer text-center flex items-center justify-center gap-2"
                >
                  Discover My Gemstone
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
