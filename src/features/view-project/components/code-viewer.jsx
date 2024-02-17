import { useEffect, useState } from 'react';
import hljs from 'highlight.js';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeViewer = ({ src }) => {
    const [language, setLanguage] = useState(null);
    const [content, setContent] = useState('');

    const fetchFileContent = async () => {
        try {
            const response = fetch(src,{
                method:"GET"
            });
            const text = await response.text();
            console.log(text);
            setContent(text);
            const detectedLanguage = hljs.highlightAuto(text).language;
            setLanguage(detectedLanguage);
        } catch (error) {
            console.error('Error fetching file content:', error);
        }
    };

    useEffect(() => {
        fetchFileContent();
    }, [src]);

    return (
        <div className="h-full p-2 bg-gray-100 min-h-screen flex flex-col">
            <SyntaxHighlighter language={language} style={darcula} showLineNumbers>
                {content}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeViewer;
