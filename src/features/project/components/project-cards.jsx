import { Card } from "react-bootstrap";
import Loading from "../../../components/Loading";
import { useProjectCard } from "../hooks/useProjectCard";


const ProjectCards = () => {
    const {navigate,projects}=useProjectCard();

    if (projects) {
        return (
            <>
                {projects.map((project, index) => (
                    <Card key={index} onClick={()=>navigate('/view-project/123')}> 
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
