"use client";

import React, { FormEvent, useState } from "react";
import DatePicker from "./components/date-picker";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ subsets: ["latin"] });

interface FormData {
  reportType: string;
  client: string;
  reportFile: any;
}

interface DatePickerData {
  startDate: string;
  endDate: string;
}

const Home = () => {
  const [form, setForm] = useState<FormData>({
    reportType: "",
    client: "",
    reportFile: null,
  });
  const [date, setDate] = useState<DatePickerData>({
    startDate: "",
    endDate: "",
  });

  const fileUploadHandler = async (e: any) => {
    const fileInput = e.target;
    if (!fileInput.files) {
      console.warn("no file was chosen");
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("files list is empty");
      return;
    }

    setForm({ ...form, reportFile: fileInput.files[0] });
  };

  const changeHandler = async (e: any) => {
    console.log(form);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (date.endDate.length === 0 || date.startDate.length === 0)
    //   return alert("enter date");
    // if (form.client.length === 0 || form.reportType.length === 0)
    //   return alert("Select Data");
    try {
      const formData = new FormData();
      formData.append("csv_file", form.reportFile);
      formData.append("client", form.client);
      formData.append("report_type", form.reportType);
      formData.append("date", date.startDate);
      console.log(formData);
      const res = await fetch("http://127.0.0.1:5000/api/generate_report", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error("something went wrong, check your console.");
        return;
      }

      const data: { fileUrl: string } = await res.json();
    } catch (error) {
      console.error("something went wrong, check your console.");
    }
  };

  return (
    <div className="flex h-full min-h-screen w-full">
      {/* 2 Backgrounds */}
      <div className="w-[30%] bg-blue-500"></div>
      <div className="w-[70%] bg-gray-100"></div>

      {/* Main Foreground */}
      <div className="absolute inset-0  z-10 mx-auto my-auto flex  h-[48em]  w-[96em] rounded-lg bg-white drop-shadow-2xl">
        {/* Container for inner elements */}
        <div className="relative mx-auto my-10 h-full w-[60%]  py-10">
          <h1 className="mb-20 text-5xl font-bold uppercase ">Report System</h1>
          {/* Two columns */}
          <form onSubmit={submitHandler} encType="multipart/form-data">
            <div className="relative flex justify-between space-x-6">
              <div
                className={`${openSans.className}relative h-full w-full  space-y-10`}
              >
                <div className="flex flex-col justify-between space-y-10">
                  {/* First Column */}
                  {/* Report Type */}
                  <div className="flex flex-col space-y-3 ">
                    <h2 className="text-lg font-bold uppercase text-[#708090]">
                      Type
                    </h2>
                    <div className="flex justify-between space-x-4">
                      <div className="flex w-48">
                        <input
                          type="radio"
                          hidden
                          name="reportType"
                          className="peer"
                          id="monthly-btn"
                          value={"weekly"}
                          onChange={changeHandler}
                        />
                        <label
                          htmlFor="monthly-btn"
                          className="w-full rounded-full border-2 border-[#607D8B] bg-white px-8  py-4 text-center text-black peer-checked:bg-[#262837] peer-checked:text-white "
                        >
                          Monthly
                        </label>
                      </div>
                      <div className="flex w-48">
                        <input
                          type="radio"
                          hidden
                          name="reportType"
                          className="peer"
                          id="weekly-btn"
                          value={"weekly"}
                          onChange={changeHandler}
                        />
                        <label
                          htmlFor="weekly-btn"
                          className="w-full rounded-full border-2 border-[#607D8B] bg-white px-8  py-4 text-center text-black peer-checked:bg-[#262837] peer-checked:text-white"
                        >
                          Weekly
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* Date */}
                  <div className="flex  flex-col space-y-3">
                    <h2 className="text-lg font-bold uppercase text-[#708090]">
                      Date
                    </h2>
                    <DatePicker getDate={setDate} />
                  </div>
                  {/* Client Options */}
                  <div className="space-y-4">
                    <label
                      htmlFor="countries"
                      className="text-lg font-bold uppercase text-[#708090]"
                    >
                      Client
                    </label>
                    <select
                      onChange={changeHandler}
                      id="countries"
                      name="client"
                      className="placehold0 block w-full rounded-lg border border-gray-300 bg-gray-50 p-4  focus:border-blue-500 focus:ring-1 focus:ring-blue-500 "
                    >
                      <option defaultValue={""}>Choose a client</option>
                      <option value="seec">SEEC</option>
                      <option value="ewpr">EWPR</option>
                      <option value="ncnp">NCNP</option>
                      <option value="malfintech">MalFinTech</option>
                      <option value="futureface">FutureFace</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* UPLOAD SECTION */}
              <div className="flex w-full flex-col ">
                <h2 className="text-lg font-bold uppercase text-[#708090]">
                  UPLOAD
                </h2>
                <div className="mx-auto mt-4 flex h-full w-full flex-col justify-between border border-dashed border-teal-600 p-4  text-center">
                  <div className="flex h-1/2 flex-col items-center justify-between bg-gray-200">
                    <input
                      type="file"
                      id="file-upload"
                      onChange={fileUploadHandler}
                      hidden
                    />
                    <label
                      htmlFor="file-upload"
                      className="z-20 flex h-full w-full cursor-pointer flex-col-reverse items-center justify-center"
                    >
                      <p className="z-10 text-center text-xs font-light text-gray-500">
                        Accepted formats are CSV
                      </p>
                      <svg
                        className="z-10 h-8 w-8 text-indigo-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                      </svg>
                    </label>
                  </div>
                  <input
                    value={`SUBMIT`}
                    type="submit"
                    className="w-full bg-[#262837] py-3 font-bold text-white hover:cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
