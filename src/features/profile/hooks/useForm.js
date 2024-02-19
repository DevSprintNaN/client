import { useEffect, useState } from "react";
import dispatch from "../../../context/dispatch/dispatch";
import actions from "../../../context/dispatch/actions";
import { useNavigate } from "react-router-dom";
import formDispatch, { formStates } from "../../../context/dispatch/formStatus";

const useForm = (options,setDisabled,setPayload,setFormState,setMessage,setEditMode) => {
  const [currSelected, setCurrSelected] =
    useState(null);
  const [newSkillInput, setNewSkillInput] =
    useState("");
  const [skillMessage, setSkillMessage] =
    useState("");
  const navigate=useNavigate();
  const [formData, setFormData] = useState();

  const fetchProfile=async()=>{
    const response=await dispatch(actions.getProfile);
    if(response?.status==="success"){
      let temp={};
      temp.email=response.user.email;
      temp.username=response.user.username;
      temp.skills=response.user.skills?response.user.skills:[];
      temp.newSkills=[];
      temp.currentPassword="";
      temp.newPassword="";
      temp.confirmNewPassword="";
      return temp;
    }
    else{
      navigate("/error500");
    }
  }

  useEffect(()=>{
    fetchProfile().then((result)=>{
      console.log(result);
      setFormData(result);
    });
  },[])

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "skills") {
      const selectedSkill = e.target.value;
      const isSelected = formData.skills.includes(
        selectedSkill
      );
      const updatedSkills = !isSelected
        ? [...formData.skills, selectedSkill]
        : formData.skills;
      setFormData({
        ...formData,
        skills: updatedSkills,
      });
    } else if (name === "newSkills") {
      const newSkill = e.target.value;
      setNewSkillInput(newSkill);
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (
      name === "newPassword" ||
      name === "confirmNewPassword"
    ) {
      const password = document.getElementById(
        "newPassword"
      ).value;
      const confirmPassword =
        document.getElementById(
          "confirmNewPassword"
        ).value;

      if (
        password.length < 8 ||
        password.length > 20
      ) {
        formDispatch(
          formStates.invalid,
          setFormState,
          setPayload
        );
        setMessage(
          "Password must be between 8 and 20 characters long."
        );
        setDisabled(true);
        return;
      }

      if (
        !/[A-Z]/.test(password) ||
        !/\d/.test(password)
      ) {
        formDispatch(
          formStates.invalid,
          setFormState,
          setPayload
        );
        setMessage(
          "Password must contain at least one uppercase letter and one numeric character."
        );
        setDisabled(true);
        return;
      }

      if (password === confirmPassword) {
        setDisabled(false);
        setMessage("");
        formDispatch(
          formStates.default,
          setFormState,
          setPayload
        );
      } else {
        setDisabled(true);
        formDispatch(
          formStates.invalid,
          setFormState,
          setPayload
        );
        setMessage(
          "Password and confirm password values don't match!"
        );
      }
    }

    console.log(formData);
  };

  const handleRemoveSkill = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(
        (selectedSkill) => selectedSkill !== skill
      ),
    });
  };

  const handleRemoveNewSkill = (newSkill) => {
    setFormData({
      ...formData,
      newSkills: formData.newSkills.filter(
        (selectedSkill) =>
          selectedSkill !== newSkill
      ),
    });
  };

  const addNewSkill = () => {
    const existInSkills = options
      ? options
        .map((option) => option.toLowerCase())
        .includes(newSkillInput.toLowerCase())
      : false;

    const existInNewSkill = formData.newSkills
      ?.map((skill) => skill.toLowerCase())
      .includes(newSkillInput.toLowerCase());

    if (
      newSkillInput === "" ||
      newSkillInput === undefined
    ) {
      setSkillMessage("Skill cannot be empty!");
    } else if (existInSkills) {
      setSkillMessage(
        existInSkills
          ? "This skill already exists!"
          : ""
      );
    } else if (existInNewSkill) {
      setSkillMessage(
        existInNewSkill
          ? "You have already added this skill!"
          : ""
      );
    } else {
      const updatedNewSkills = !existInNewSkill
        ? [...formData.newSkills, newSkillInput]
        : formData.newSkills;
      setFormData({
        ...formData,
        newSkills: updatedNewSkills,
      });
      setNewSkillInput("");
      setSkillMessage("")
    }
  };

  const handleSubmit = async (e) => {
    setDisabled(true);
    e.preventDefault();
    formDispatch(formStates.loading, setFormState, setPayload);
    setMessage("");
    console.log(formData);
    setDisabled(true)
    const received=await dispatch(actions.updateProfile,formData);
    console.log(received);
    const response = received?.status==="success";
    if (response) {
      setDisabled(false)
      formDispatch(formStates.success, setFormState, setPayload);
      setMessage("Changes saved successfully!");
      setEditMode(false);
    } else {
      if(response.passwordError){
        setDisabled(false)
        formDispatch(formStates.invalid, setFormState, setPayload);
        setMessage("Incorrect current password!");
      }
      else{
        setDisabled(false)
        formDispatch(formStates.failed, setFormState, setPayload);
        setMessage("Could not make changes!");
      }
    }
  };

  return {
    formData,
    handleInputChange,
    handleRemoveSkill,
    addNewSkill,
    handleRemoveNewSkill,
    skillMessage,
    setSkillMessage,
    currSelected,
    newSkillInput,
    handleSubmit
  };
};

export default useForm;
