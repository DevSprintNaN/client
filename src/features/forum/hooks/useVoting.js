import { useEffect, useState } from "react";
import dispatch from "../../../context/dispatch/dispatch";
import actions from "../../../context/dispatch/actions";

export const useVoting=(id,forum,setForum)=>{
    const [vote, setVote] = useState(null);

    useEffect(()=>{
        const fetchVotingStatus=async()=>{
            const response=await dispatch(actions.isUpvoted,id);
            if(response.isUpvoted){
                setVote(1);
            }
            else{
                const response=await dispatch(actions.isDownvoted,id);
                if(response.isDownvoted){
                    setVote(-1);
                }
            }
        }

        fetchVotingStatus();
    },[])

    const handleUpvote = () => {
        dispatch(actions.upvote,{id});
        if( vote === null){
            setVote(1);
            let temp=forum;
            temp.upvotes+=1;
            setForum(temp);
        }
        else if(vote===1){
            setVote(null);
            let temp=forum;
            temp.upvotes-=1;
            setForum(temp);
        }
        else{
            setVote(1);
            let temp=forum;
            temp.upvotes+=1;
            temp.downvotes-=1;
            setForum(temp);
        }
        console.log(vote)
    };

    const handleDownvote = () => {
        dispatch(actions.downvote,{id});
        if(vote===null){
            setVote(-1);
            let temp=forum;
            temp.downvotes+=1;
            setForum(temp);
        }
        else if(vote===-1){
            setVote(null);
            let temp=forum;
            temp.downvotes-=1;
            setForum(temp);
        
        }
        else{
            setVote(-1);
            let temp=forum;
            temp.downvotes+=1;
            temp.upvotes-=1;
            setForum(temp);
        }
        console.log(vote)
    };

    return { vote, handleUpvote, handleDownvote };
}