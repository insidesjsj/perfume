import React, {FC, useEffect, useState} from 'react';
import saveAfter from '../assets/images/save_complete.png';
import saveDef from '../assets/images/save_default.png';
import {resultPerfumeData} from '../data/resultPerfumeData';
import PerfumeContent from './perfumeContent';
import {getClovaPerfumeInfo} from '../api/getClovaPerfumeInfo';

interface perfumeInfoProps {
    perfumeData: resultPerfumeData,
    isSaved: boolean | undefined,
    saveClick: (id: number, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => Promise<void>,
}
const PerfumeInfo: FC<perfumeInfoProps> = ({perfumeData, isSaved, saveClick}) => {
    const [showPerfumeContent, setShowPerfumeContent] = useState(false);
    const [content, setContent] = useState('');
    const handleQuestionClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
        setShowPerfumeContent(() => !showPerfumeContent);
    };

    const handleOutsideClick = () => {
        setShowPerfumeContent(false);
    };

    useEffect(() => {
        const getContentData = async () => {
            try {
                console.log('Fetching data for perfume ID:', perfumeData.id); // 추가 로그
                const response = await getClovaPerfumeInfo(perfumeData.id);
                console.log('API response:', response); // 추가 로그
                const content = response.result.message.content;
                setContent(content);
                console.log('getContentData: ', content);
            } catch (error) {
                console.error('Error fetching perfume info:', error);
            }
        };
        getContentData();
    }, [perfumeData.id]);

    return (
        <div className='w-full h-full' onClick={handleOutsideClick}>
            <div className="w-[1180px] mx-auto">
                <div
                    className="flex mx-auto h-[532px] mt-[52px] shadow-main-div border border-white rounded-[30px] bg-white-70">
                    <div className="flex justify-between w-full">
                        <div className="ml-[100px]">
                            <div className="ml-1 mt-[85px] text-2xl font-medium text-caption1 tracking-caption1">
                                {perfumeData.brand}
                            </div>
                            <div className="mt-4 ml-1 text-5xl font-semibold leading-tight">
                                {perfumeData.name}
                            </div>
                            <div className="ml-1 mt-1.5 text-caption1 font-normal leading-tight text-[28px]">
                                {perfumeData.ename}
                            </div>
                            <div className='mt-[41px] flex items-center'>
                                <div
                                    className='w-[22px] h-[22px] font-semibold rounded-3xl bg-question text-questionmark text-caption1 text-center hover:text-white hover:bg-caption1'
                                    onClick={handleQuestionClick}
                                >
                                    ?
                                </div>
                                <div className='ml-2 text-question-text font-medium'>
                                    어떤 향인지 알고 싶어요
                                </div>
                                {showPerfumeContent &&
                                    <PerfumeContent content={content} />
                                }
                            </div>

                            <div
                                className="w-[300px] h-20 bg-white-50 cursor-pointer border border-white rounded-[100px] pl-10 pr-10 mt-[68px] mb-20 pt-6 pb-[26px] shadow-home-button-hover"
                                onClick={(event) => saveClick(perfumeData.id, event)}
                            >
                                <div className="flex items-center justify-between">
                                    {isSaved ? (
                                        <img src={saveAfter}/>
                                    ) : (
                                        <img src={saveDef}/>
                                    )}
                                    <p className="mb-0 text-2xl text-save-button">
                                        내 향수 저장하기
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-[578px]">
                            <div className="flex items-center justify-center h-full">
                                <img
                                    src={perfumeData.imageURL}
                                    className="max-w-full max-h-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PerfumeInfo;