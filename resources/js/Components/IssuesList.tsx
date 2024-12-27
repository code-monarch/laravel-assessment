import { FC } from 'react';
import { ExclamationCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { AccessibilityIssue } from '@/types';

interface IssuesListProps {
    issues: AccessibilityIssue[];
}

export const IssuesList: FC<IssuesListProps> = ({ issues }) => {
    return (
        <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Accessibility Issues</h2>
            <div className="space-y-4">
                {issues.map((issue, index) => (
                    <div
                        key={index}
                        className={`p-4 rounded-lg ${issue.severity === 'error' ? 'bg-red-50' : 'bg-yellow-50'
                            }`}
                    >
                        {issue.severity === 'error' ? (
                            <ExclamationCircleIcon className="h-5 w-5 text-red-400 inline-block mr-2" />
                        ) : (
                            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400 inline-block mr-2" />
                        )}
                        <div className="mt-2">
                            <p className="font-medium">{issue.message}</p>
                            <p className="text-sm text-gray-600 mt-1">
                                Element: <code className="bg-gray-100 px-1 rounded">{issue.element}</code>
                            </p>
                            <p className="text-sm text-gray-600">
                                Location: Line {issue.line}, Column {issue.column}
                            </p>
                            {issue.suggestion && (
                                <p className="text-sm text-gray-600 mt-2">
                                    Suggestion: {issue.suggestion}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};