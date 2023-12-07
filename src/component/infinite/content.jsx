import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { styled } from "styled-components";
import { useEffect } from "react";
const Content = (Image) => {

    // props로 받은 전체 데이터 배열
    const [scrollImage, setScrollImage] = useState(Image.data);

    // 초기 렌더링 시 보여줄 데이터 배열
    const [imageData, setImageData] = useState(null);
 
    // props와  scrollImage
    useEffect(()=> {
        setScrollImage(Image.data);

        //초기 보여줄 컨텐츠 개수 지정
        const sliceImage = scrollImage.slice(0,4);
        setImageData(sliceImage)

    },[Image, scrollImage]);

    // 무한 스크롤 기능 중단 여부
    const [hasMore, setHasMore] = useState(true);

    // 로드 될 컨텐츠 index 배열
    let [contentIdx, setContentIdx] = useState([4,9]);

    // 스크롤링시 함수
    const fetchMoreData= () => {

        // 로드될 컨텐츠의 마지막 index number가 전체 데이터 배열의 length 보다 작을 시 추가 데이터 load
        if ( contentIdx[1] < scrollImage.length) {
            setTimeout(()=> {
                setImageData(imageData.concat(scrollImage.slice(contentIdx[0],contentIdx[1])))
                setContentIdx(prevState => [prevState[0] + 5, prevState[1] + 5])
            }, 700)
        }
        //  무한스크롤 중단
        else {
            setHasMore(false);
        }
    }
    


    return (
      <>
        {imageData && (
            <Wrap id="parentScroll">
                <InfiniteScroll 
                    dataLength={imageData.length} 
                    next={fetchMoreData} 
                    hasMore={hasMore} 
                    loader={<Loading>Loading...</Loading>} 
                    endMessage={<p>Do not load data</p>}
                    scrollableTarget="parentScroll"
                    height={350}
                >
                    {imageData.map((item, idx)=> {
                        return (
                            <ContentBox key={item.id}>
                                <img style={{width:"100%"}} src={item.image} alt="content image"></img>
                                <h3>{item.title}</h3>
                            </ContentBox>
                        )
                    })} 
                </InfiniteScroll>
            </Wrap>
        )}
      </>

    )
}

const Wrap = styled.div`
    background:#f7f7f7;
    border-radius:50px;
    overflow:hidden;
    padding: 50px 25px;
    border:20px solid black;
    border-top: 50px solid black;
    border-bottom: 100px solid black;
    position:relative;

`

const ContentBox = styled.div`
    margin-bottom:30px;
    max-width:250px;
    background:white;
    border:1px solid #fff;

`
const Loading = styled.div`
    position:absolute;
    top:0;
    left:0;
    background:rgba(0,0,0, .5);
    text-align:center;
    font-size:25px;
    width:100%;
    height:100%;
    color:#fff;
    line-height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
   
`


export default Content