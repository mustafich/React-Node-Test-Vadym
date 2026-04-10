import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee } from "../../redux/action/user";
import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { CFormSelect } from "@coreui/react";
import { pakistanCities } from "../../constant";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateUser = ({ open, setOpen, scroll }) => {
  //////////////////////////////////////// VARIABLES /////////////////////////////////////
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const initialEmployeeState = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    phone: "",
    email: "",
  }
  const initialErrors = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    phone: "",
  }

  //////////////////////////////////////// STATES /////////////////////////////////////
  const [employeeData, setEmployeeData] = useState(initialEmployeeState);
  const [errors, setErrors] = useState(initialErrors);

  //////////////////////////////////////// USE EFFECTS /////////////////////////////////////

  //////////////////////////////////////// FUNCTIONS /////////////////////////////////////
  const validate = () => {
    const { firstName, lastName, username, password, phone } = employeeData;
    const newErrors = {
      firstName: firstName.trim() ? "" : "First name is required",
      lastName:  lastName.trim()  ? "" : "Last name is required",
      username:  username.trim()  ? "" : "Username is required",
      password:  password.trim()  ? "" : "Password is required",
      phone:     phone.trim()     ? "" : "Phone is required",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((msg) => msg === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(createEmployee(employeeData, setOpen));
    setEmployeeData(initialEmployeeState)
  };

  const handleChange = (field, value) => {
    setEmployeeData((prevFilters) => ({ ...prevFilters, [field]: value, }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEmployeeData(initialEmployeeState)
    setErrors(initialErrors);
  };

  return (
      <div>
        <Dialog
            scroll={scroll}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            fullWidth="sm"
            maxWidth="sm"
            aria-describedby="alert-dialog-slide-description">
          <DialogTitle className="flex items-center justify-between">
            <div className="text-sky-400 font-primary">Add New Employee</div>
            <div className="cursor-pointer" onClick={handleClose}>
              <PiXLight className="text-[25px]" />
            </div>
          </DialogTitle>
          <DialogContent>
            <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
              <div className="text-xl flex justify-start items-center gap-2 font-normal">
                <PiNotepad size={23} />
                <span>Employee Detials</span>
              </div>
              <Divider />
              <table className="mt-4">
                <tr>
                  <td className="pb-4 text-lg">First Name </td>
                  <td className="pb-4">
                    <TextField
                        size="small"
                        fullWidth
                        value={employeeData.firstName}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        error={!!errors.firstName}
                        helperText={<span style={{ display: "block", minHeight: "18px" }}>{errors.firstName}</span>}
                        FormHelperTextProps={{ component: "span" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pb-4 text-lg">Last Name </td>
                  <td className="pb-4">
                    <TextField
                        size="small"
                        fullWidth
                        value={employeeData.lastName}
                        onChange={(e) => handleChange('lastName', e.target.value)}
                        error={!!errors.lastName}
                        helperText={<span style={{ display: "block", minHeight: "18px" }}>{errors.lastName}</span>}
                        FormHelperTextProps={{ component: "span" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pb-4 text-lg">User Name </td>
                  <td className="pb-4">
                    <TextField
                        size="small"
                        fullWidth
                        value={employeeData.username}
                        onChange={(e) => handleChange('username', e.target.value)}
                        error={!!errors.username}
                        helperText={<span style={{ display: "block", minHeight: "18px" }}>{errors.username}</span>}
                        FormHelperTextProps={{ component: "span" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pb-4 text-lg">Email </td>
                  <td className="pb-4">
                    <TextField
                        size="small"
                        fullWidth
                        placeholder="Optional"
                        value={employeeData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        helperText={<span style={{ display: "block", minHeight: "18px" }} />}
                        FormHelperTextProps={{ component: "span" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="flex items-start pt-2 text-lg">Password </td>
                  <td className="pb-4">
                    <TextField
                        type="password"
                        value={employeeData.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                        size="small"
                        fullWidth
                        error={!!errors.password}
                        helperText={<span style={{ display: "block", minHeight: "18px" }}>{errors.password}</span>}
                        FormHelperTextProps={{ component: "span" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="flex items-start pt-2 text-lg">Phone </td>
                  <td className="pb-4">
                    <TextField
                        type="number"
                        size="small"
                        value={employeeData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        fullWidth
                        error={!!errors.phone}
                        helperText={<span style={{ display: "block", minHeight: "18px" }}>{errors.phone}</span>}
                        FormHelperTextProps={{ component: "span" }}
                    />
                  </td>
                </tr>
              </table>
            </div>
          </DialogContent>
          <DialogActions>
            <button
                onClick={handleClose}
                variant="contained"
                type="reset"
                className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
              Cancel
            </button>
            <button
                onClick={handleSubmit}
                variant="contained"
                className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
              {isFetching ? 'Submitting...' : 'Submit'}
            </button>
          </DialogActions>
        </Dialog>
      </div>

  );
};

export default CreateUser;