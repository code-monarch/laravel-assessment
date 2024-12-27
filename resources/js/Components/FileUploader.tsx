import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
    onFileSelect: (file: File) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect }) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            onFileSelect(acceptedFiles[0]);
        }
    }, [onFileSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'text/html': ['.html', '.htm'],
        },
        maxFiles: 1,
    });

    return (
        <div
            {...getRootProps()}
            className={cn('p-8 border-2 border-dashed rounded-lg text-center cursor-pointer',
                isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300')}
        >
            <input {...getInputProps()} />
            <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
                {isDragActive
                    ? 'Drop the HTML file here'
                    : 'Drag and drop an HTML file here, or click to select'}
            </p>
        </div>
    );
};