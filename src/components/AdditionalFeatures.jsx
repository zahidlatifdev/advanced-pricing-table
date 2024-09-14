import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Clock, Users, BarChart, Zap, Check, Info, HelpCircle, ArrowRight } from 'lucide-react'

const iconMap = {
    Shield,
    Clock,
    Users,
    BarChart,
    Zap,
    Check,
    Info,
    HelpCircle,
    ArrowRight,
}

export default function AdditionalFeatures({ additionalFeatures, isEditing, handleAdditionalFeatureEdit, addAdditionalFeature, removeAdditionalFeature }) {
    return (
        <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {isEditing ? (
                    <input
                        type="text"
                        defaultValue="Additional Features"
                        className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                    />
                ) : (
                    'Additional Features'
                )}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {additionalFeatures.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                        <Card className="transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    {isEditing ? (
                                        <Select
                                            value={feature.icon}
                                            onValueChange={(value) => handleAdditionalFeatureEdit(index, 'icon', value)}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select icon" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.keys(iconMap).map((iconName) => (
                                                    <SelectItem key={iconName} value={iconName}>
                                                        {iconName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        React.createElement(iconMap[feature.icon], { className: "h-6 w-6 mr-2 text-blue-600" })
                                    )}
                                    <span className="ml-2">
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={feature.name}
                                                onChange={(e) => handleAdditionalFeatureEdit(index, 'name', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                                            />
                                        ) : (
                                            feature.name
                                        )}
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    {isEditing ? (
                                        <textarea
                                            value={feature.description}
                                            onChange={(e) => handleAdditionalFeatureEdit(index, 'description', e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                                            rows={3}
                                        />
                                    ) : (
                                        feature.description
                                    )}
                                </p>
                            </CardContent>
                            {isEditing && (
                                <Button variant="destructive" onClick={() => removeAdditionalFeature(index)}>
                                    Remove Feature
                                </Button>
                            )}
                        </Card>
                    </motion.div>
                ))}
            </div>
            {isEditing && (
                <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white" onClick={addAdditionalFeature}>
                    Add Additional Feature
                </Button>
            )}
        </div>
    )
}