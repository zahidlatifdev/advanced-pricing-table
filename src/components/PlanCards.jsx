import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Check, Info, Trash2 } from 'lucide-react'

export default function PlanCards({ plans, isYearly, currency, isEditing, handlePlanEdit, handleFeatureEdit, setSelectedPlan, addPlan, removePlan, addFeature, removeFeature }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, currencyDisplay: 'narrowSymbol' }).format(price)
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                    <Card className={`flex flex-col h-full ${plan.popular ? 'border-blue-600 shadow-lg' : ''} transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105`}>
                        <CardHeader style={{ backgroundColor: isEditing ? 'transparent' : plan.color }} className={`${isEditing ? 'bg-white' : 'text-white'} rounded-t-lg`}>
                            <CardTitle className="flex items-center justify-between">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={plan.name}
                                        onChange={(e) => handlePlanEdit(index, 'name', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                                    />
                                ) : (
                                    plan.name
                                )}
                                {isEditing && (
                                    <Switch
                                        checked={plan.popular}
                                        onCheckedChange={(checked) => handlePlanEdit(index, 'popular', checked)}
                                    />
                                )}
                                {plan.popular && (
                                    <Badge variant="secondary" className="bg-white text-blue-600">
                                        Popular
                                    </Badge>
                                )}
                            </CardTitle>
                            <CardDescription className={isEditing ? 'text-gray-600' : 'text-white/90'}>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={plan.description}
                                        onChange={(e) => handlePlanEdit(index, 'description', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                                    />
                                ) : (
                                    plan.description
                                )}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <div className="text-4xl font-bold mt-4 mb-4 text-center">
                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                                        onChange={(e) => handlePlanEdit(index, isYearly ? 'yearlyPrice' : 'monthlyPrice', parseFloat(e.target.value))}
                                        className="w-24 p-1 border border-gray-300 rounded text-center"
                                    />
                                ) : (
                                    formatPrice(isYearly ? plan.yearlyPrice / 12 : plan.monthlyPrice)
                                )}
                                <span className="text-sm font-normal text-gray-500">
                                    /{isYearly ? 'mo' : 'month'}
                                </span>
                            </div>
                            {isYearly && (
                                <div className="mb-4 text-sm">
                                    <span className="line-through text-gray-500">
                                        {formatPrice(plan.monthlyPrice * 12)}/year
                                    </span>
                                    <span className="ml-2 text-blue-600 font-semibold">
                                        {formatPrice(plan.yearlyPrice)}/year
                                    </span>
                                </div>
                            )}
                            <ul className="space-y-2 mb-4">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center">
                                        <Check className="h-4 w-4 text-blue-600 mr-2" />
                                        <span>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={feature.name}
                                                    onChange={(e) => handleFeatureEdit(index, featureIndex, 'name', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                                                />
                                            ) : (
                                                feature.name
                                            )}
                                        </span>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Info className="h-4 w-4 ml-2 text-gray-500 cursor-help" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>
                                                        {isEditing ? (
                                                            <input
                                                                type="text"
                                                                value={feature.description}
                                                                onChange={(e) => handleFeatureEdit(index, featureIndex, 'description', e.target.value)}
                                                                className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                                                            />
                                                        ) : (
                                                            feature.description
                                                        )}
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        {isEditing && (
                                            <Button variant="ghost" size="sm" onClick={() => removeFeature(index, featureIndex)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            {isEditing && (
                                <Button variant="outline" onClick={() => addFeature(index)}>
                                    Add Feature
                                </Button>
                            )}
                            <div className="text-sm text-gray-500 mb-4">
                                <span className="font-semibold">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={plan.maxUsers}
                                            onChange={(e) => handlePlanEdit(index, 'maxUsers', parseInt(e.target.value))}
                                            className="w-30 p-1 border border-gray-300 rounded text-center"
                                        />
                                    ) : (
                                        plan.maxUsers
                                    )}
                                </span>
                            </div>
                            <div className="text-sm text-gray-500 mb-4">
                                <span className="font-semibold">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={plan.trialDays}
                                            onChange={(e) => handlePlanEdit(index, 'trialDays', parseInt(e.target.value))}
                                            className="w-30 p-1 border border-gray-300 rounded text-center"
                                        />
                                    ) : (
                                        plan.trialDays
                                    )}
                                </span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full transition-all duration-300 ease-in-out hover:scale-105 bg-blue-600 hover:bg-blue-700 text-white"
                                variant={plan.popular ? 'default' : 'outline'}
                                onClick={() => !isEditing && setSelectedPlan(plan)}
                            >
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={`Choose ${plan.name}`}
                                        onChange={(e) => handlePlanEdit(index, 'chooseButtonText', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded bg-white text-gray-900"
                                    />
                                ) : (
                                    `Choose ${plan.name}`
                                )}
                            </Button>
                            {isEditing && (
                                <Button
                                    className="w-full mt-2 transition-all duration-300 ease-in-out hover:scale-105"
                                    variant={'outline'}
                                    onClick={() => setSelectedPlan(plan)}
                                >
                                    Edit Popup
                                </Button>
                            )}
                        </CardFooter>
                        {isEditing && (
                            <Button variant="destructive" onClick={() => removePlan(index)}>
                                Remove Plan
                            </Button>
                        )}
                    </Card>
                </motion.div>
            ))}
            {isEditing && (
                <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white" onClick={addPlan}>
                    Add New Plan
                </Button>
            )}
        </div>
    )
}