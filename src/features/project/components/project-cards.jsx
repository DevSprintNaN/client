import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Loading from "../../../components/Loading";


const ProjectCards = () => {
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
        }
    ]);

    useEffect(() => {

    }, [projects])

    if (projects) {
        return (
            <>
                {projects.map((project, index) => (
                    <Card key={index}> 
                        <Card.Header>{project.projectName}</Card.Header>
                        <Card.Body>
                            <div className="contributors">Project Contributors</div>
                            {project.projectContributors.map((contributor, index) => ( 
                                <div key={index}>
                                    {contributor}
                                </div>
                            ))}
                            <div className="content">Project Contents</div>
                            {project.projectContent.map((content, index) => ( 
                                <div key={index}>
                                    {content}
                                </div>
                            ))}
                        </Card.Body>
                        <Card.Footer>
                            <button className="btn" style={{marginRight:"20px"}}>Share</button>
                            <button className="btn">Show</button>
                        </Card.Footer>
                    </Card>
                ))}
            </>
        );
    } else {
        return (
            <Loading />
        )
    }
}

export default ProjectCards;
