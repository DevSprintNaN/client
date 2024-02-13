import { Card } from "react-bootstrap";
import Loading from "../../../components/Loading";
import { useProjectCard } from "../hooks/useProjectCard";
import IonIcon from '@reacticons/ionicons';

const ProjectCards = () => {
    const { navigate, projects } = useProjectCard();

    if (projects) {
        return (
            <div className="w-100">
                {projects.map((project, index) => (
                    <Card key={index} className="bg-violet-50 hover:shadow-lg mb-4">
                        <Card.Header onClick={() => navigate('/view-project/123')} className="bg-violet-100 cursor-pointer text-lg font-bold">{project.projectName}</Card.Header>
                        <Card.Body>
                            <div className="md:flex mb-5">
                            <div className="ms-4 me-5">
                                <div className="mb-4 font-bold">Project Contributors:</div>
                                <ul className="list-disc">
                                {project.projectContributors.map((contributor, index) => (
                                    <li key={index} className="ms-5">{contributor}</li>
                                ))}
                                </ul>
                            </div>
                            <div className="ms-4">
                                <div className="mb-4 font-bold">Project Contents:</div>
                                <ul className="ms-4 list-disc">
                                {project.projectContent.map((content, index) => (
                                    <li key={index} className="me-2">{content}</li>
                                ))}
                                </ul>
                            </div>
                            </div>
                        </Card.Body>
                        <Card.Footer className="bg-violet-100">
                            <button className="bg-purple-700 text-white px-2 py-2 rounded-md hover:bg-purple-900  focus:outline-none focus:ring-2 focus:ring-offset-2  transition-colors duration-300"><IonIcon name="share-social-outline" className="me-2"/>Share</button>
                        </Card.Footer>
                    </Card>
                ))}
            </div>
        );
    } else {
        return <Loading />;
    }
};

export default ProjectCards;
