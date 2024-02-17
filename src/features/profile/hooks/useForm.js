import { useState } from "react";

const useForm = (options) => {
  const [currSelected, setCurrSelected] =
    useState(null);
  const [newSkillInput, setNewSkillInput] =
    useState("");
  const [skillMessage, setSkillMessage] =
    useState("");
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    skills: [],
    newSkills: [],
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

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
  };
};

export default useForm;
