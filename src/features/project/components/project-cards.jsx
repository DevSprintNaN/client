import { Card } from "react-bootstrap";
import Loading from "../../../components/Loading";
import IonIcon from '@reacticons/ionicons';
import { FaStar } from "react-icons/fa";

const ProjectCards = ({ navigate, projects }) => {

    if (projects) {
        return (
            <div className="w-100">
                {projects && projects.map((project, index) => (
                    <Card key={index} className="bg-violet-50 mb-4 shadow-md">
                        <Card.Header onClick={() => navigate('/view-project/' + project._id)} className="bg-violet-100 text-purple-800 cursor-pointer text-xl font-bold p-2 w-full flex justify-between items-center">
                            {project.name}
                            <p className="my-auto">
                                <span className="text-2xl">
                                    27&nbsp;
                                    <FaStar className="inline-block text-yellow-400 text-2xl" />
                                </span>
                            </p>
                        </Card.Header>

                        <Card.Body className="p-2">

                            <dl className="flex space-x-24 mb-3">
                                <div className="flex flex-col-reverse">
                                    <dd className="text-md text-black">{project.ownerName}</dd>
                                    <dt className="text-lg font-bold text-black">Project Owner</dt>
                                </div>
                                <div className="flex flex-col-reverse">
                                    <dd className="text-md text-black">{project.creationDate}</dd>
                                    <dt className="text-lg font-bold text-black">Created At</dt>
                                </div>
                                <div className="flex flex-col-reverse">
                                    <dd className="text-md text-black">{project.lastModified}</dd>
                                    <dt className="text-lg font-bold text-black">Last Modified</dt>
                                </div>
                            </dl>


                            <div className="pb-2">
                                <div className=" inline-block mr-2" >
                                    <div className="flex  pr-2 h-full items-center">
                                        <p className="title-font font-bold">Contributed By </p>
                                    </div>
                                </div>
                                {project.users.map((contributor, index) => (
                                    <div key={index} className=" inline-block mr-2" >
                                        <div className="flex h-full items-center">
                                            <p className="title-font font-medium">{index < project.users.length - 1 ? `${contributor}, ` : contributor}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pb-2">
                                <div className=" inline-block mr-2" >
                                    <div className="flex  pr-2 h-full items-center">
                                        <p className="title-font font-bold">Contents</p>
                                    </div>
                                </div>
                                {(project.contents && project.contents.length > 0) ? (
                                    project.contents.map((content, index) => (
                                        <div key={index} className="inline-block mr-2">
                                            <div className="flex h-full items-center">
                                                <p className="title-font font-medium">
                                                    {index < project.contents.length - 1 ? `${content}, ` : content}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <span className="text-md text-gray-800">No content added yet</span>
                                )}


                            </div>


                        </Card.Body>
                        <Card.Footer className="p-2 h-full">
                            <button className="bg-purple-700 text-white px-3 py-1.5 rounded-md hover:bg-purple-900  focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 flex items-center">
                                <IonIcon name="share-social-outline" className="me-2 text-lg" />
                                Share
                            </button>
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
