import Link from "next/link";
import RemoveBtn from "./Removebtn";
import {HipencilAlt} from 'react-icons/hi';

export default function Topics(){
    return(
        <>
        <div className="p-4 border border-slate-300 my-3
        flex justify-betwen gap-5 items-start">
            <div className="font-bold text-2xl">
                <h2>Topic Title</h2>
                <div>Topic description</div>
            </div>
            
            <div className="flex gap-2">
                <RemoveBtn/>
                <Link href={'/edittopic/123'}>
                    <HipencilAlt size={24}/>
                </Link>
            </div>
        </div>

        </>
    )
}