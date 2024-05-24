import React, { useEffect, useState } from "react";
import { useAction } from "./ActionContext";
import Example_bg_local from "../assets/Example_bg_local.png";
import Example_icon_local from "../assets/Example_icon_local.svg";
import { Input } from "./Input";
import { useDispatch } from "react-redux";
import {
  addEmployee,
  removeEmployeeWithID,
  editEmployee,
} from "../../../store/employeeManagerSlice";
import { countryOptions } from "../assets/DataCountry";
function BoxWindow(props) {
  const { action, setActionDefault, setAction } = useAction();
  const { dataEmployee } = props;
  const elementModify = dataEmployee.filter((item) => item.id === action.id)[0];
  const [newEmployee, setNewEmployee] = useState({
    birthdate: "",
    category: "",
    gender: "",
    identification: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    nationality: "",
    phone: "",
    poo: "",
    por: "",
    role: "",
  });
  const [updatedElementModify, setUpdatedElementModify] = useState({});

  const setEmptyInformationOfEmployee = () => {
    setNewEmployee({
      birthdate: "",
      category: "",
      gender: "",
      identification: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      nationality: "",
      phone: "",
      poo: "",
      por: "",
      role: "",
    });
  };
  const handleInputChangeCreate = (key, value) => {
    setNewEmployee((prevState) => ({
      ...prevState,
      [key.toLowerCase()]: value,
    }));
  };

  const handleInputChangeEdit = (key, value) => {
    setUpdatedElementModify((prevState) => ({
      ...prevState,
      [key.toLowerCase()]: value,
    }));
  };

  const dispatch = useDispatch();
  const handleRemoveWithID = (id) => {
    dispatch(removeEmployeeWithID(id));
    setActionDefault();
  };

  const handleAddEmployee = (newE) => {
    dispatch(addEmployee(newE));
    setActionDefault();
    setEmptyInformationOfEmployee();
  };

  const handleEditEmployee = (newE) => {
    const newEWithId = {
      ...newE,
      id: action.id,
    };
    dispatch(editEmployee(newEWithId));
    setUpdatedElementModify({});
    setActionDefault();
  };

  return (
    <div
      className={`absolute left-0 top-0 z-10 ${action.isRead || action.isEdit || action.isRemove || action.isAdd ? "" : "hidden"} h-full w-full rounded-xl`}
    >
      <div className="h-full w-full bg-black opacity-30"></div>
      {action.isRead || action.isEdit ? (
        <div className="fixed left-2/4 top-2/4 z-20 block w-2/5 -translate-x-2/4 -translate-y-2/4 overflow-hidden rounded-xl bg-white pb-4">
          <div className="relative w-full">
            <div className="w-full overflow-hidden rounded-b-3xl">
              <img src={Example_bg_local} alt="" className="" />
            </div>
            <div className="absolute left-2/4 top-1/3 h-28 w-28 -translate-x-2/4 rounded-full bg-center">
              <img src={Example_icon_local} alt="" />
            </div>
          </div>
          <div className="flex flex-col gap-7">
            <div className="mt-5 flex flex-col gap-1 px-10">
              <Input
                title="Name"
                placeholder={elementModify.first_name + " " + elementModify.middle_name + " " + elementModify.last_name}
                type="text"
                status={`${action.isRead ? "read" : "edit"}`}
                name="name"
                onChange={handleInputChangeEdit}
              />

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <Input
                    title="Date of birth"
                    type="date"
                    placeholder="2022-11-02"
                    status={`${action.isRead ? "read" : "edit"}`}
                    name="birthdate"
                    onChange={handleInputChangeEdit}
                  />
                </div>
                <div className="flex flex-col">
                  <Input
                    title="Role"
                    type="text"
                    placeholder={elementModify.role_name}
                    status={`${action.isRead ? "read" : "edit"}`}
                    name="role"
                    onChange={handleInputChangeEdit}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <Input
                    title="Gender"
                    type="radio"
                    value={elementModify.gender}
                    status={`${action.isRead ? "read" : "edit"}`}
                    name="gender"
                    onChange={handleInputChangeEdit}
                  />
                </div>
                <div className="flex flex-col">
                  <div>
                    <label
                      htmlFor="national"
                      className="ml-1 text-sm font-light text-gray-600"
                    >
                      Nationality:
                    </label>
                    <div className="flex h-8 w-full rounded-lg bg-[#E3EDF9] px-3 text-start text-xs text-gray-500">
                      <select
                        name="national"
                        id="national"
                        className="h-full w-full cursor-pointer bg-[#E3EDF9] focus:outline-none"
                        onChange={(event) => {
                          handleInputChangeEdit("national", event.target.value);
                        }}
                        defaultValue={elementModify.nationality}
                        disabled={action.isRead}
                      >
                        <option value="default">Your national</option>
                        {countryOptions.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <Input
                title="Phone number"
                placeholder={String(elementModify.phone)}
                type="tel"
                status={`${action.isRead ? "read" : "edit"}`}
                name="phone"
                onChange={handleInputChangeEdit}
              />
              <Input
                title="Citizen identification number"
                placeholder={elementModify.cin}
                type="password"
                status={`${action.isRead ? "read" : "edit"}`}
                name="identification"
                onChange={handleInputChangeEdit}
              />
              <Input
                title="Place of origin"
                placeholder={elementModify.poo}
                type="text"
                status={`${action.isRead ? "read" : "edit"}`}
                name="poo"
                onChange={handleInputChangeEdit}
              />
              <Input
                title="Place of residence"
                placeholder={elementModify.por}
                type="text"
                status={`${action.isRead ? "read" : "edit"}`}
                name="por"
                onChange={handleInputChangeEdit}
              />
            </div>
            <div className="flex flex-row justify-center gap-2">
              <button
                className="w-[20%] rounded-lg bg-[#FAFAFA] px-4 py-3 text-center text-xs font-extralight uppercase text-black shadow-lg"
                onClick={setActionDefault}
              >
                cancel
              </button>
              {action.isEdit ? (
                <button
                  className="w-[20%]  rounded-lg bg-[#57A75A] px-4 py-3 text-center text-xs font-extralight uppercase text-white shadow-lg"
                  onClick={() => handleEditEmployee(updatedElementModify)}
                >
                  save
                </button>
              ) : (
                <button
                  className="w-[20%]  rounded-lg bg-[#57A75A] px-4 py-3 text-center text-xs font-extralight uppercase text-white shadow-lg"
                  onClick={() => {
                    setAction({
                      ...action,
                      isEdit: true,
                      isRead: false,
                    });
                  }}
                >
                  edit
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
      {action.isRemove && (
        <div className="fixed left-2/4 top-2/4 z-20 block w-2/5 -translate-x-2/4 -translate-y-2/4 rounded-xl bg-white ">
          <div className="relative flex w-full flex-col justify-between pb-4 pt-5">
            <div className="flex flex-col items-center gap-1 text-center">
              <div className="h-24 w-24 rounded-full bg-center">
                <img src={Example_icon_local} alt="" />
              </div>
              <h3 className="mt-5 font-light">{elementModify.name}</h3>
              <h3 className="font-bold">{elementModify.role}</h3>
              <h4></h4>
              <p className="w-3/4">
                Are you sure you want to remove
                <br />
                <b>{elementModify.name} </b>
                from the list of company employees?
              </p>
            </div>
            <div className="mt-8 flex w-full flex-row justify-center gap-2">
              <button
                className="w-[22%] rounded-lg bg-[#57A75A] px-4 py-3 text-center text-xs font-extralight uppercase text-white shadow-lg"
                onClick={setActionDefault}
              >
                NO
              </button>
              <button
                className="w-[22%] rounded-lg bg-[#FAFAFA] px-4 py-3 text-center text-xs font-extralight uppercase text-black shadow-lg"
                onClick={() => {
                  handleRemoveWithID(action.id);
                }}
              >
                YES
              </button>
            </div>
          </div>
        </div>
      )}
      {action.isAdd && (
        <div className="absolute left-2/4 top-2/4 z-20 block w-2/5 -translate-x-2/4 -translate-y-2/4 overflow-hidden rounded-xl bg-white pb-4">
          <div className="relative w-full">
            <div className="w-full overflow-hidden rounded-b-3xl">
              <img src={Example_bg_local} alt="" className="" />
            </div>
            <div className="absolute left-2/4 top-1/3 h-28 w-28 -translate-x-2/4 rounded-full bg-center">
              <img src={Example_icon_local} alt="" />
            </div>
          </div>
          <div className="flex flex-col gap-7">
            <div id="formInput" className="mt-5 flex flex-col gap-1 px-10">
              <Input
                title="Name"
                placeholder=""
                type="text"
                status="add"
                name="name"
                onChange={handleInputChangeCreate}
              />

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <Input
                    title="Date of birth"
                    type="date"
                    placeholder=""
                    status="add"
                    name="birthdate"
                    onChange={handleInputChangeCreate}
                  />
                </div>
                <div className="flex flex-col">
                  <Input
                    title="Role"
                    type="text"
                    placeholder=""
                    status="add"
                    name="role"
                    onChange={handleInputChangeCreate}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col">
                  <Input
                    title="Gender"
                    type="radio"
                    placeholder=""
                    status="add"
                    name="gender"
                    onChange={handleInputChangeCreate}
                  />
                </div>
                <div className="flex flex-col">
                  <div>
                    <label
                      htmlFor="national"
                      className="ml-1 text-sm font-light text-gray-600"
                    >
                      Nationality:
                    </label>
                    <div className="flex h-8 w-full rounded-lg bg-[#E3EDF9] px-3 text-start text-xs text-gray-500">
                      <select
                        name="national"
                        id="national"
                        className="h-full w-full cursor-pointer bg-[#E3EDF9] focus:outline-none"
                        onChange={(event) => {
                          handleInputChangeCreate(
                            "national",
                            event.target.value,
                          );
                        }}
                      >
                        <option value="default">Your national</option>
                        {countryOptions.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <Input
                title="Phone number"
                placeholder=""
                type="tel"
                status="add"
                name="phone"
                onChange={handleInputChangeCreate}
              />
              <Input
                title="Citizen identification number"
                placeholder=""
                type="password"
                status="add"
                name="identification"
                onChange={handleInputChangeCreate}
              />
              <Input
                title="Place of origin"
                placeholder=""
                type="text"
                status="add"
                name="poo"
                onChange={handleInputChangeCreate}
              />
              <Input
                title="Place of residence"
                placeholder=""
                type="text"
                status="add"
                name="por"
                onChange={handleInputChangeCreate}
              />
            </div>
            <div className="flex flex-row justify-center gap-2">
              <button
                className="w-[20%] rounded-lg bg-[#FAFAFA] px-4 py-3 text-center text-xs font-extralight uppercase text-black shadow-lg"
                onClick={setActionDefault}
              >
                cancel
              </button>
              <button
                className=" w-[20%] rounded-lg bg-[#57A75A] px-4 py-3 text-center text-xs font-extralight uppercase text-white shadow-lg"
                onClick={() => {
                  handleAddEmployee(newEmployee);
                }}
              >
                save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(BoxWindow);
