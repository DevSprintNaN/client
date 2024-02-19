import React from 'react';
import { useNavigate } from 'react-router';
import parse from 'html-react-parser';

const ForumCards = ({ forums }) => {
    const navigate = useNavigate();
    return (
        <section className="text-gray-600 body-font">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {forums.map((forum, index) => (
                        <div key={index} className="p-4 cursor-pointer" onClick={()=>navigate(`/view-forum/${forum._id}`)}>
                            <div className="h-full rounded-xl shadow-md bg-violet-100 overflow-hidden">
                                <img className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100" src={forum.cover_image===undefined?"https://images.unsplash.com/photo-1618172193622-ae2d025f4032?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80":forum.cover_image} alt="forum" />
                                <div className="p-6">
                                    <h2 className="tracking-widest text-sm title-font font-medium text-violet-400 mb-1">By {forum.author}</h2>
                                    <h1 className="title-font text-lg font-bold text-purple-800 mb-3">{forum.title}</h1>
                                    <p className="leading-relaxed mb-3 text-xs font-bold">{new Date(forum.uploadDate).toDateString()}</p>
                                    <p className="leading-relaxed mb-3">{parse(forum.description)}</p>
                                </div>
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ForumCards;
