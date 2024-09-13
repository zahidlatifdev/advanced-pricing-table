import React from 'react'
import { motion } from 'framer-motion'
import { Check, HelpCircle, Info, Zap, X, ArrowRight, Sparkles, Shield, Clock, Users, BarChart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'

const AdvancedPricingTable = (props) => {
    const {
        isYearly,
        currency,
        plans,
        additionalFeatures,
        exchangeRates,
        testimonials,
        faqItems
    } = props

    const formatPrice = (price) => {
        const convertedPrice = price * exchangeRates[currency]
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(convertedPrice)
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10
            }
        }
    }

    return (
        <motion.div
            className="container max-w-[85rem] mx-auto px-4 py-16 bg-gradient-to-b from-gray-50 to-white"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.h1
                className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
                variants={itemVariants}
            >
                Choose Your Perfect Plan
            </motion.h1>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
            >
                {plans.map((plan, index) => (
                    <motion.div key={plan.name} variants={itemVariants}>
                        <Card className={`flex flex-col h-full overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${plan.popular ? 'border-primary' : ''}`}>
                            <CardHeader className={`bg-gradient-to-r ${plan.color} text-white rounded-t-lg`}>
                                <CardTitle className="flex items-center justify-between">
                                    {plan.name}
                                    {plan.popular && (
                                        <Badge variant="secondary" className="bg-white text-primary animate-pulse">
                                            Popular
                                        </Badge>
                                    )}
                                </CardTitle>
                                <CardDescription className="text-white/90">{plan.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <motion.div
                                    className="text-4xl font-bold mb-4 mt-3"
                                    key={isYearly ? 'yearly' : 'monthly'}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {formatPrice(isYearly ? plan.yearlyPrice / 12 : plan.monthlyPrice)}
                                    <span className="text-sm font-normal text-muted-foreground">
                                        /{isYearly ? 'mo' : 'month'}
                                    </span>
                                </motion.div>
                                {isYearly && (
                                    <div className="mb-4 text-sm">
                                        <span className="line-through text-muted-foreground">
                                            {formatPrice(plan.monthlyPrice * 12)}/year
                                        </span>
                                        <span className="ml-2 text-primary font-semibold">
                                            {formatPrice(plan.yearlyPrice)}/year
                                        </span>
                                    </div>
                                )}
                                <ul className="space-y-2 mb-4">
                                    {plan.features.map((feature, featureIndex) => (
                                        <motion.li
                                            key={featureIndex}
                                            className="flex items-center"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: featureIndex * 0.1 }}
                                        >
                                            {plan.icon}
                                            <span className="ml-2">{feature.name}</span>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Info className="h-4 w-4 ml-2 text-muted-foreground cursor-help" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>{feature.description}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </motion.li>
                                    ))}
                                </ul>
                                <div className="text-sm text-muted-foreground mb-4">
                                    <span className="font-semibold">Max Users:</span> {plan.maxUsers}
                                </div>
                                <div className="text-sm text-muted-foreground mb-4">
                                    <span className="font-semibold">Trial Period:</span> {plan.trialDays} days
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full transition-all duration-300 hover:shadow-lg"
                                    variant={plan.popular ? 'default' : 'outline'}
                                >
                                    Choose {plan.name}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            {/* Additional sections (feature comparison, testimonials, FAQ, etc.) can be added here */}
        </motion.div>
    )
}

export default AdvancedPricingTable