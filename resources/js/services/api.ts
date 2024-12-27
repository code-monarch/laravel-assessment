import { AnalysisResult } from '@/types';
import axios from 'axios';

export const analyzeHtml = async (formData: FormData): Promise<AnalysisResult> => {

    const { data } = await axios.post<AnalysisResult>(`${process.env.APP_URL}/api/v1/analyze`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    return data;
};