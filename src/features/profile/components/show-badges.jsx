import React, {useState, useEffect} from "react";
import actions from "../../../context/dispatch/actions";
import dispatch from "../../../context/dispatch/dispatch";
import NewbieBadge from "./newbie-badge";
import ContribtionsBadge from "./contributions-badge";
import CoderBadge from "./coder-badge";
const ShowBadges = () => {
    const [contributions, setContributions] = useState(null);

    useEffect(() => {
        const fetchContributions = async () => {
            const response = await dispatch(actions.getContributions, {});
            setContributions(response.contributions);

        };
        fetchContributions();

    }, []);

    useEffect(() => {
        console.log(contributions);
    }, [contributions]);

    let contributionsCount = 0;
    let addedLines = 0;

    if (contributions) {
        contributions.forEach((contribution) => {
            contributionsCount++;
            addedLines += contribution.addedLines;
        });
    }

    let badges = [];
    const [isBadgesEmpty, setIsBadgesEmpty] = useState(true);
    const [isCoder, setIsCoder] = useState(false);
    const [isContributor, setIsContributor] = useState(false);
    const [isNewbie, setIsNewbie] = useState(false);
    const createBadges = () =>{
        if(contributionsCount >= 1){
            badges.push("Newbie");
            setIsNewbie(true);
        }
        if(contributionsCount >= 5){
            badges.push("Contributor");
            setIsContributor(true);
        }
        if(addedLines >= 100){
            badges.push("Coder");
            setIsCoder(true);
        }
        setIsBadgesEmpty(false);

    };

    useEffect(() => {
        createBadges();
        console.log(badges.length);
      }, [contributions]);    
      
      useEffect(() => {
        console.log(badges);
      }, [badges]);
      
      return (
        <div className="rounded-md shadow-md p-8 bg-white min-h-full">
          <div className="text-xl font-semibold m-2">
            Badges
          </div>
          <div className="flex items-center justify-center h-full">
            {(!isBadgesEmpty) ? (
                <div className="p-2">
                    {isNewbie && (<div className="mt-1"><NewbieBadge/></div>)}
                    {isCoder && (<div className="mt-1"><CoderBadge /></div>)}
                    {isContributor && (<div className="mt-1"> <ContribtionsBadge/></div>)}
                </div>
              
            ) : (
              <div className="text-center font-semibold  text-xl">
                No badges available
              </div>
            )}
          </div>
        </div>
      );
      
      

};

export default ShowBadges;