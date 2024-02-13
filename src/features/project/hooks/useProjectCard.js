import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useProjectCard=()=>{
    const navigate=useNavigate();
    const [projects] = useState([
        {
            projectName: "DevOps",
            projectContributors: ["Mirza Mohammad Azwad", "Nibir Kabir", "Nafisa Maliyat"],
            projectContent: ["C++", "Python", "JS"]
        },
        {
            projectName: "GitOps",
            projectContributors: ["Mirza Mohammad Azwad", "Nibir Kabir", "Nafisa Maliyat"],
            projectContent: ["C++", "Python", "JS"]
        },
        {
            projectName: "DevOps",
            projectContributors: ["Mirza Mohammad Azwad", "Nibir Kabir", "Nafisa Maliyat"],
            projectContent: ["C++", "Python", "JS"]
        },
        {
            projectName: "GitOps",
            projectContributors: ["Mirza Mohammad Azwad", "Nibir Kabir", "Nafisa Maliyat"],
            projectContent: ["C++", "Python", "JS"]
        },
        {
            projectName: "DevOps",
            projectContributors: ["Mirza Mohammad Azwad", "Nibir Kabir", "Nafisa Maliyat"],
            projectContent: ["C++", "Python", "JS"]
        },
        {
            projectName: "GitOps",
            projectContributors: ["Mirza Mohammad Azwad", "Nibir Kabir", "Nafisa Maliyat"],
            projectContent: ["C++", "Python", "JS"]
        },
        {
            projectName: "DevOps",
            projectContributors: ["Mirza Mohammad Azwad", "Nibir Kabir", "Nafisa Maliyat"],
            projectContent: ["C++", "Python", "JS"]
        },
        {
            projectName: "GitOps",
            projectContributors: ["Mirza Mohammad Azwad", "Nibir Kabir", "Nafisa Maliyat"],
            projectContent: ["C++", "Python", "JS"]
        },
        {
            projectName: "DevOps",
            projectContributors: ["Mirza Mohammad Azwad", "Nibir Kabir", "Nafisa Maliyat"],
            projectContent: ["C++", "Python", "JS"]
        },
        {
            projectName: "GitOps",
            projectContributors: ["Mirza Mohammad Azwad", "Nibir Kabir", "Nafisa Maliyat"],
            projectContent: ["C++", "Python", "JS"]
        },
        {
            projectName: "DevOps",
            projectContributors: ["Mirza Mohammad Azwad", "Nibir Kabir", "Nafisa Maliyat"],
            projectContent: ["C++", "Python", "JS"]
        },
        {
            projectName: "GitOps",
            projectContributors: ["Mirza Mohammad Azwad", "Nibir Kabir", "Nafisa Maliyat"],
            projectContent: ["C++", "Python", "JS"]
        },
        {
            projectName: "DevOps",
            projectContributors: ["Mirza Mohammad Azwad", "Nibir Kabir", "Nafisa Maliyat"],
            projectContent: ["C++", "Python", "JS"]
        },
        {
            projectName: "GitOps",
            projectContributors: ["Mirza Mohammad Azwad", "Nibir Kabir", "Nafisa Maliyat"],
            projectContent: ["C++", "Python", "JS"]
        },
        {
            projectName: "DevOps",
            projectContributors: ["Mirza Mohammad Azwad", "Nibir Kabir", "Nafisa Maliyat"],
            projectContent: ["C++", "Python", "JS"]
        },
        {
            projectName: "GitOps",
            projectContributors: ["Mirza Mohammad Azwad", "Nibir Kabir", "Nafisa Maliyat"],
            projectContent: ["C++", "Python", "JS"]
        },
        {
            projectName: "DevOps",
            projectContributors: ["Mirza Mohammad Azwad", "Nibir Kabir", "Nafisa Maliyat"],
            projectContent: ["C++", "Python", "JS"]
        },
        {
            projectName: "GitOps",
            projectContributors: ["Mirza Mohammad Azwad", "Nibir Kabir", "Nafisa Maliyat"],
            projectContent: ["C++", "Python", "JS"]
        },
        {
            projectName: "DevOps",
            projectContributors: ["Mirza Mohammad Azwad", "Nibir Kabir", "Nafisa Maliyat"],
            projectContent: ["C++", "Python", "JS"]
        },
        {
            projectName: "GitOps",
            projectContributors: ["Mirza Mohammad Azwad", "Nibir Kabir", "Nafisa Maliyat"],
            projectContent: ["C++", "Python", "JS"]
        }
    ]);

    return {navigate,projects}
}