import React from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'

export default function CallToAction({ buttons, isEditing, handleButtonEdit }) {
    return (
        <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {isEditing ? (
                    <input
                        type="text"
                        defaultValue="Ready to Get Started?"
                        className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                    />
                ) : (
                    'Ready to Get Started?'
                )}
            </h2>
            <p className="mb-8 text-lg">
                {isEditing ? (
                    <input
                        type="text"
                        defaultValue="Join thousands of satisfied customers and take your project to the next level."
                        className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                    />
                ) : (
                    'Join thousands of satisfied customers and take your project to the next level.'
                )}
            </p>
            <Button size="lg" className="transition-all duration-300 ease-in-out hover:scale-105 bg-blue-600 hover:bg-blue-700 text-white">
                {isEditing ? (
                    <div className="flex flex-col space-y-2">
                        <input
                            type="text"
                            value={buttons.startFreeTrial.text}
                            onChange={(e) => handleButtonEdit('startFreeTrial', 'text', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                            placeholder="Button text"
                        />
                        <input
                            type="text"
                            value={buttons.startFreeTrial.href}
                            onChange={(e) => handleButtonEdit('startFreeTrial', 'href', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                            placeholder="Button URL"
                        />
                    </div>
                ) : (
                    <a href={buttons.startFreeTrial.href} className="">
                        {buttons.startFreeTrial.text}
                    </a>
                )}
                <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
        </div>
    )
}