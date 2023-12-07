import { useState, useEffect } from "react";
import axios from "axios";
import Content from "./content";

const InfinteSection = () => {

    // 마운트 시 데이터 호출 후 저장
    const [data, setData] = useState([]);
    const dataUrl = "https://jsonplaceholder.org/posts";

    const dataGet = async () => {
        try {
            const res = await axios.get(`${dataUrl}`);
    
            setData(res.data);
    
        } catch (err) {
            console.log("error");
        }
    };

    useEffect(()=> {
        dataGet()
        return
    }, []);

    return (
            <Content data={data} /> 
    )
}

export default InfinteSection