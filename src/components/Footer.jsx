import React from 'react'

export default function Footer({ isEditing }) {
    const renderEditableFooterLink = (text, href) => {
        return isEditing ? (
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    defaultValue={text}
                    className="w-1/2 p-2 border border-gray-300 rounded"
                    placeholder="Link text"
                />
                <input
                    type="text"
                    defaultValue={href}
                    className="w-1/2 p-2 border border-gray-300 rounded"
                    placeholder="Link URL"
                />
            </div>
        ) : (
            <a href={href} className="text-blue-600 mx-2 hover:underline">
                {text}
            </a>
        )
    }

    return (
        <footer className="mt-16 text-center text-sm text-muted-foreground">
            <p>
                {isEditing ? (
                    <input
                        type="text"
                        defaultValue="© 2023 Your Company Name. All rights reserved."
                        className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                    />
                ) : (
                    '© 2023 Your Company Name. All rights reserved.'
                )}
            </p>
            <div className="mt-2">
                {renderEditableFooterLink('Terms of Service', '#')} |
                {renderEditableFooterLink('Privacy Policy', '#')} |
                {renderEditableFooterLink('Contact Us', '#')}
            </div>
        </footer>
    )
}