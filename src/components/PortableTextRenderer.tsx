import React from 'react';
import {
  PortableText,
  PortableTextMarkComponentProps,
  PortableTextMarkDefinition,
  PortableTextListItemBlock,
} from '@portabletext/react';

// Define interfaces for props and child types
interface PortableTextRendererProps {
  content: any; // Replace with a more specific type based on your data
}

interface Child {
  _key: string;
  text: string;
  marks?: string[];
}

interface LinkAnnotation {
  _key: string;
  href: string;
  openInNewTab?: boolean;
}

const PortableTextRenderer: React.FC<PortableTextRendererProps> = ({ content }) => {
  // Function to render individual children with their marks
  const renderChildWithMarks = (child: Child, markDefs: LinkAnnotation[] = []): React.ReactNode => {
    let renderedText: React.ReactNode = child.text; // Initialize as text

    // Process each mark in the child
    child.marks?.forEach((mark) => {
      if (mark === 'strong') {
        renderedText = <strong key={child._key}>{renderedText}</strong>;
      } else if (mark === 'em') {
        renderedText = <em key={child._key}>{renderedText}</em>;
      } else if (mark.startsWith('link')) {
        // Find the link annotation based on the mark
        const linkAnnotation = markDefs.find((def) => def._key === mark);
        if (linkAnnotation) {
          renderedText = (
            <a
              key={child._key}
              href={linkAnnotation.href}
              target={linkAnnotation.openInNewTab ? "_blank" : "_self"}
              rel="noopener noreferrer"
            >
              {renderedText}
            </a>
          );
        }
      }
    });

    return renderedText;
  };

  // Main rendering logic for PortableText
  return (
    <div>
      <PortableText
        value={content}
        components={{
          block: {
            h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
            normal: ({ children }) => <p className="text-base my-4">{children}</p>,
          },
          marks: {
            strong: ({ children }) => <strong>{children}</strong>,
            em: ({ children }) => <em>{children}</em>,
            link: ({ value, children }: PortableTextMarkComponentProps<PortableTextMarkDefinition>) => (
              <a
                href={value.href}
                target={value.openInNewTab ? "_blank" : "_self"}
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
          },
          list: {
            bullet: ({ children } ) => <ul className="list-disc ml-6">{children}</ul>,
            number: ({ children }) => <ol className="list-decimal ml-6">{children}</ol>,
          },
          listItem: {
            bullet: ({
              children,
              markDefs, // Note that markDefs will be of the PortableTextListItemBlock type
            }) => (
              <li>
                {Array.isArray(children) ? (
                  children.map((child: Child) => renderChildWithMarks(child, markDefs))
                ) : (
                  <span>No content</span> // Fallback if children is not an array
                )}
              </li>
            ),
            number: ({
              children,
              markDefs, // Note that markDefs will be of the PortableTextListItemBlock type
            }) => (
              <li>
                {Array.isArray(children) ? (
                  children.map((child: Child) => renderChildWithMarks(child, markDefs))
                ) : (
                  <span>No content</span> // Fallback if children is not an array
                )}
              </li>
            ),
          },
          
          
        }}
      />
    </div>
  );
};

export default PortableTextRenderer;


