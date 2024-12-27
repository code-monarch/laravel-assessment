import { AnalysisResult } from '@/types';
import { FC } from 'react';

export const ScoreDisplay: FC<Pick<AnalysisResult, 'summary' | 'score'>> = ({ score, summary }) => {
    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-600';
        if (score >= 70) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <div className="bg-white p-6 mt-4 rounded-lg shadow-sm">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Accessibility Score</h2>
                <p className={`text-4xl font-bold ${getScoreColor(score)}`}>
                    {score.toFixed(1)}%
                </p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                    <p className="text-sm text-gray-500">Errors</p>
                    <p className="text-xl font-semibold text-red-600">{summary.errors ?? 0}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Warnings</p>
                    <p className="text-xl font-semibold text-yellow-600">{summary.warnings ?? 0}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Total Issues</p>
                    <p className="text-xl font-semibold">{summary.total ?? 0}</p>
                </div>
            </div>
        </div>
    );
};