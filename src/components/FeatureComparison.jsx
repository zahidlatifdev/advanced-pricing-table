import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Check, X, ArrowRight } from 'lucide-react'

export default function FeatureComparison({ showComparison, setShowComparison, plans, isEditing, handleFeatureEdit }) {
    return (
        <>
            <div className="flex justify-center mt-12">
                <Button
                    variant="outline"
                    onClick={() => setShowComparison(!showComparison)}
                    className="transition-all duration-300 hover:scale-105"
                >
                    {showComparison ? 'Hide' : 'Show'} Feature Comparison
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>

            <AnimatePresence>
                {showComparison && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mt-8 overflow-x-auto"
                    >
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2 text-left">Feature</th>
                                    {plans.map((plan, index) => (
                                        <th key={index} className="p-2 text-center">
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={plan.name}
                                                    onChange={(e) => handleFeatureEdit(index, 'name', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                                                />
                                            ) : (
                                                plan.name
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {plans[plans.length - 1].features.map((feature, featureIndex) => (
                                    <tr key={featureIndex} className="border-b">
                                        <td className="p-2">
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={feature.name}
                                                    onChange={(e) => handleFeatureEdit(plans.length - 1, featureIndex, 'name', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                                                />
                                            ) : (
                                                feature.name
                                            )}
                                        </td>
                                        {plans.map((plan, planIndex) => (
                                            <td key={planIndex} className="p-2 text-center">
                                                {isEditing ? (
                                                    <Switch
                                                        checked={plan.features.some(f => f.name === feature.name)}
                                                        onCheckedChange={(checked) => {
                                                            const newPlans = [...plans]
                                                            if (checked) {
                                                                newPlans[planIndex].features.push({ ...feature })
                                                            } else {
                                                                newPlans[planIndex].features = newPlans[planIndex].features.filter(f => f.name !== feature.name)
                                                            }
                                                            handleFeatureEdit(newPlans)
                                                        }}
                                                    />
                                                ) : plan.features.some(f => f.name === feature.name) ? (
                                                    <Check className="h-4 w-4 mx-auto text-green-500" />
                                                ) : (
                                                    <X className="h-4 w-4 mx-auto text-red-500" />
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}