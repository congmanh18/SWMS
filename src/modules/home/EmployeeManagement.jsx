import React, { useEffect, useState } from "react";
import TabBar from "./components/TabBar";
import { IconPlus, IconArrowDown, IconLogOut, IconSearch } from "./assets/Icon";
import TableManager from "./components/TableManager";
import BoxWindow from "./components/BoxWindow";
import { useDispatch, useSelector } from "react-redux";
import { loadEmployee } from "../../store/employeeManagerSlice";
import { useAction } from "./components/ActionContext";

function Home() {
  const { dataEmployee } = useSelector((state) => state.employee_manager);
  const [filter, setFilter] = useState("all");
  const { action, setAction } = useAction();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSelectChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://6645b6bab8925626f892d650.mockapi.io/employees/emp");
        const data = await response.json();
        dispatch(loadEmployee(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    return () => {
      dispatch(loadEmployee([]));
    };
  }, [dispatch]);

  return (
    <div className="relative h-screen min-w-[520px] items-center justify-center overflow-hidden bg-[#E3EDF9]">
      <div className="flex min-w-[520px] flex-col bg-[#E3EDF9] md:flex-row">
        <div className="relative h-[100px] w-full md:w-[70px] lg:w-[220px]">
          <div
            id="tab_nav"
            className="fixed flex h-[100px] w-full flex-row items-center overflow-hidden bg-[#67BC47] px-2 md:h-screen md:w-[70px] md:flex-col md:items-start md:pt-4 md:transition-[width] md:duration-75 md:ease-in-out lg:w-[220px]"
          >
            <div className="flex flex-row items-center pl-4 md:mx-auto md:pl-0 lg:gap-3">
              <div
                className="relative m-3 hidden h-9 w-10 cursor-pointer md:block md:h-7 md:w-7 lg:h-9 lg:w-10"
                onClick={() => expandTabNar()}
              >
                <span className="absolute left-2/4 top-1/4 block w-full -translate-x-2/4 bg-white md:h-[2px] lg:h-[3px]"></span>
                <span className="absolute left-2/4 top-2/4 block w-full -translate-x-2/4 bg-white md:h-[2px] lg:h-[3px]"></span>
                <span className="absolute left-2/4 top-3/4 block w-full -translate-x-2/4 bg-white md:h-[2px] lg:h-[3px]"></span>
              </div>
              <h1 className="block text-xl font-black italic text-white md:hidden lg:block">
                Waste Management
              </h1>
            </div>

            <div className="flex w-full flex-row justify-between md:mt-8 md:h-full md:flex-col">
              <TabBar />
              <div className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#DF3333] px-6 py-2 text-white md:mb-4 md:p-2 xl:px-6 xl:py-2">
                <IconLogOut />
                <span className="hidden text-xs font-bold text-white lg:block">
                  Log Out
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 flex-1 p-4">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between gap-2">
              <div className="flex flex-1 flex-row ">
                <button
                  id="searchButton"
                  className="block rounded-s-xl bg-green-500 px-4 text-white"
                >
                  <IconSearch />
                </button>
                <input
                  id="search"
                  className="w-full rounded-e-xl border border-s-0 px-3 text-gray-700 focus:bg-slate-50 focus:outline-none"
                  placeholder="Search..."
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <button
                className="rounded-xl border bg-white p-3"
                onClick={() => setAction({ ...action, isAdd: true })}
              >
                <IconPlus />
              </button>
            </div>
            <div className="h-full w-full flex-1 rounded-xl bg-white p-4">
              <div className="flex flex-row justify-between">
                <h1 className="ml-1 font-bold">Employee Management</h1>
                <div className="relative mr-3 flex flex-row">
                  <select
                    name="employee"
                    id="selectEmployee"
                    defaultValue="all"
                    onChange={handleSelectChange}
                    className="inline-block cursor-pointer appearance-none rounded px-5 text-end focus:outline-none"
                  >
                    <option value="all">All</option>
                    <option value="name">Name</option>
                    <option value="role">Role</option>
                    <option value="category">Category</option>
                    <option value="gender">Gender</option>
                  </select>
                  <div className="pointer-events-none absolute right-[-5px] items-center">
                    <IconArrowDown />
                  </div>
                </div>
              </div>
              <div className="relative mt-5 h-[calc(100vh-200px)] overflow-auto">
                <TableManager
                  filter={filter}
                  dataEmployee={Array.isArray(dataEmployee) ? dataEmployee : []}
                  query={query}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BoxWindow dataEmployee={Array.isArray(dataEmployee) ? dataEmployee : []} />
    </div>
  );
}

export default React.memo(Home);
