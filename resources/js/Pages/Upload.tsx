'use client';

import { useState } from 'react';
import { FileUploader } from '@/Components/FileUploader';
import { IssuesList } from '@/Components/IssuesList';
import { AccessibilityIssue, AnalysisResult } from '@/types';
import { cn } from '@/lib/utils';
import { analyzeHtml } from '@/services/api';
import { ScoreDisplay } from '@/Components/ScoreDisplay';

const UploadPage: React.FC = () => {
    const [issues, setIssues] = useState<AccessibilityIssue[]>([]);
    const [accessibilityScore, setAccessibilityScore] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [summary, setSummary] = useState<Pick<AnalysisResult, 'summary'> | null>(null);

    const handleFileSelect = async (file: File) => {
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await analyzeHtml(formData)

            const { score, issues, summary } = response;
            setAccessibilityScore(score);
            setIssues(issues);
            if (summary !== null) {
                setSummary({ summary });
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to analyze the file.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Upload an HTML File</h1>
            <FileUploader onFileSelect={handleFileSelect} />

            {loading && <p className="mt-4 text-blue-600">Analyzing file...</p>}
            {error && <p className="mt-4 text-red-600">{error}</p>}

            {accessibilityScore !== null && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold">Accessibility Score</h2>
                    <p
                        className={cn('text-2xl font-bold', accessibilityScore >= 80
                            ? 'text-green-600'
                            : accessibilityScore >= 50
                                ? 'text-yellow-600'
                                : 'text-red-600'
                        )}
                    >
                        {accessibilityScore}%
                    </p>
                </div>
            )}
            {accessibilityScore !== null && summary?.summary !== undefined && (
                <ScoreDisplay score={accessibilityScore} summary={summary.summary} />
            )}

            {issues.length > 0 && (
                <IssuesList issues={issues} />
            )}
        </div>
    );
};

export default UploadPage;
