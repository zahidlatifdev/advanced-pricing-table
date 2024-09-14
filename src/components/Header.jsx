import React from 'react'
import { Button } from '@/components/ui/button'
import { Edit3, Save, Download } from 'lucide-react'
import exportPricingPage from '@/components/exports/pricingDownloadHandler'
import { motion } from 'framer-motion'

export default function Header({ pageTitle, setPageTitle, isEditing, setIsEditing }) {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center items-center mb-12"
            >
                <h1 className="text-4xl sm:text-5xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {isEditing ? (
                        <input
                            type="text"
                            value={pageTitle}
                            onChange={(e) => setPageTitle(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                        />
                    ) : (
                        <span>{pageTitle}</span>
                    )}
                </h1>
            </motion.div>
            <div id="export" className="flex justify-end mb-8 space-x-4">
                {!isEditing && (
                    <Button
                        onClick={exportPricingPage}
                        className="transition-all duration-300 hover:scale-105 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <Download className="mr-2" />
                        Export
                    </Button>
                )}
                <Button
                    onClick={() => setIsEditing(!isEditing)}
                    className="transition-all duration-300 hover:scale-105 bg-green-600 hover:bg-green-700 text-white"
                >
                    {isEditing ? <Save className="mr-2" /> : <Edit3 className="mr-2" />}
                    {isEditing ? 'Save' : 'Edit'}
                </Button>
            </div>
        </>
    )
}