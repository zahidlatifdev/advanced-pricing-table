import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, HelpCircle, Info, Zap, X, ArrowRight, Sparkles, Shield, Clock, Users, BarChart, Gift, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const initialState = {
    isYearly: false,
    selectedPlan: null,
    showComparison: false,
    currency: 'USD',
    promoCode: '',
    discountApplied: false,
    progress: 0,
    plans: [
        {
            name: 'Basic',
            description: 'Essential features for small projects',
            monthlyPrice: 19,
            yearlyPrice: 190,
            features: [
                { name: 'Up to 5 projects', description: 'Create and manage up to 5 different projects' },
                { name: '5GB storage', description: 'Store up to 5GB of files and assets' },
                { name: 'Basic support', description: 'Email support with 48-hour response time' },
                { name: 'Limited API access', description: 'Access to basic API endpoints' },
                { name: 'Community forums', description: 'Access to our community support forums' },
            ],
            icon: <Check className="h-4 w-4" />,
            color: 'from-blue-400 to-blue-600',
            maxUsers: 5,
            trialDays: 14,
        },
        {
            name: 'Pro',
            description: 'Advanced features for growing teams',
            monthlyPrice: 49,
            yearlyPrice: 490,
            features: [
                { name: 'Unlimited projects', description: 'Create and manage an unlimited number of projects' },
                { name: '50GB storage', description: 'Store up to 50GB of files and assets' },
                { name: 'Priority support', description: 'Email and chat support with 24-hour response time' },
                { name: 'Advanced analytics', description: 'Gain insights with detailed project and team analytics' },
                { name: 'Full API access', description: 'Unrestricted access to all API endpoints' },
                { name: 'Custom integrations', description: 'Connect with your favorite tools' },
                { name: 'Team collaboration', description: 'Advanced team management and collaboration features' },
            ],
            icon: <Zap className="h-4 w-4" />,
            popular: true,
            color: 'from-purple-400 to-purple-600',
            maxUsers: 20,
            trialDays: 30,
        },
        {
            name: 'Enterprise',
            description: 'Custom solutions for large organizations',
            monthlyPrice: 99,
            yearlyPrice: 990,
            features: [
                { name: 'Unlimited everything', description: 'No limits on projects, storage, or team members' },
                { name: 'Dedicated support', description: '24/7 phone, email, and chat support with dedicated account manager' },
                { name: 'Custom integrations', description: 'Build and maintain custom integrations for your workflow' },
                { name: 'SLA', description: 'Guaranteed uptime and performance with custom SLA' },
                { name: 'Advanced security', description: 'Enhanced security features and compliance support' },
                { name: 'Custom training', description: 'Personalized onboarding and training sessions' },
                { name: 'White-labeling', description: 'Ability to white-label the platform with your branding' },
            ],
            icon: <Sparkles className="h-4 w-4" />,
            color: 'from-green-400 to-green-600',
            maxUsers: 'Unlimited',
            trialDays: 60,
        },
    ],
    additionalFeatures: [
        { name: 'Single Sign-On (SSO)', description: 'Secure and streamlined authentication', icon: <Shield className="h-4 w-4" /> },
        { name: 'Audit Logs', description: 'Detailed logs of all account activities', icon: <Clock className="h-4 w-4" /> },
        { name: 'User Roles & Permissions', description: 'Granular control over user access', icon: <Users className="h-4 w-4" /> },
        { name: 'Advanced Reporting', description: 'Generate and export custom reports', icon: <BarChart className="h-4 w-4" /> },
    ],
    exchangeRates: {
        USD: 1,
        EUR: 0.85,
        GBP: 0.75,
        JPY: 110,
    },
    testimonials: [
        {
            quote: "This platform has revolutionized our workflow. Highly recommended!",
            author: "John Doe",
            position: "CEO of TechCorp"
        },
        {
            quote: "The features and customer support are unmatched. A game-changer for our team.",
            author: "Jane Smith",
            position: "CTO of InnovateCo"
        },
        {
            quote: "Scalable, reliable, and user-friendly. Everything we needed in one place.",
            author: "Mike Johnson",
            position: "Project Manager at BuildIt"
        }
    ],
    faqItems: [
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, PayPal, and bank transfers for annual subscriptions."
        },
        {
            question: "Can I change my plan later?",
            answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
        },
        {
            question: "Is there a long-term commitment?",
            answer: "No, all plans are billed monthly or annually with no long-term commitment. You can cancel at any time."
        },
        {
            question: "Do you offer custom enterprise solutions?",
            answer: "Yes, we offer tailored solutions for large enterprises. Please contact our sales team for more information."
        }
    ]
};

export default function EnhancedPricingPage() {
    const [state, setState] = useState(initialState);

    useEffect(() => {
        const timer = setTimeout(() => setState(prev => ({ ...prev, progress: 66 })), 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleCurrencyChange = (value) => {
        setState(prev => ({ ...prev, currency: value }));
    };

    const handlePromoCodeSubmit = (e) => {
        e.preventDefault();
        if (state.promoCode.toLowerCase() === 'discount10') {
            setState(prev => ({ ...prev, discountApplied: true }));
        }
    };

    const formatPrice = (price) => {
        const convertedPrice = price * state.exchangeRates[state.currency];
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: state.currency }).format(convertedPrice);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            }
        }
    };

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
    };

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

            {/* Currency selector */}
            <motion.div className="flex justify-end mb-4" variants={itemVariants}>
                <Select onValueChange={handleCurrencyChange} defaultValue={state.currency}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="JPY">JPY (¥)</SelectItem>
                    </SelectContent>
                </Select>
            </motion.div>

            {/* Billing toggle */}
            <motion.div
                className="flex items-center justify-center mb-12"
                variants={itemVariants}
            >
                <span className="mr-3 text-sm font-medium">Monthly</span>
                <Switch
                    checked={state.isYearly}
                    onCheckedChange={(checked) => setState(prev => ({ ...prev, isYearly: checked }))}
                    className="data-[state=checked]:bg-primary"
                />
                <span className="ml-3 text-sm font-medium">Yearly</span>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Save up to 20% with yearly billing</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </motion.div>

            {/* Pricing cards */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
            >
                {state.plans.map((plan, index) => (
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
                                    key={state.isYearly ? 'yearly' : 'monthly'}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {formatPrice(state.isYearly ? plan.yearlyPrice / 12 : plan.monthlyPrice)}
                                    <span className="text-sm font-normal text-muted-foreground">
                                        /{state.isYearly ? 'mo' : 'month'}
                                    </span>
                                </motion.div>
                                {state.isYearly && (
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
                                    onClick={() => setState(prev => ({ ...prev, selectedPlan: plan }))}
                                >
                                    Choose {plan.name}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            {/* Feature comparison toggle */}
            <motion.div
                className="flex justify-center mt-12"
                variants={itemVariants}
            >
                <Button 
                    variant="outline" 
                    onClick={() => setState(prev => ({ ...prev, showComparison: !prev.showComparison }))}
                    className="group transition-all duration-300 hover:bg-primary hover:text-white"
                >
                    {state.showComparison ? 'Hide' : 'Show'} Feature Comparison
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
            </motion.div>

            {/* Feature comparison table */}
            <AnimatePresence>
                {state.showComparison && (
                    <motion.div
                        className="mt-8 overflow-x-auto"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-muted">
                                    <th className="p-2 text-left">Feature</th>
                                    {state.plans.map(plan => (
                                        <th key={plan.name} className="p-2 text-center">{plan.name}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {state.plans[2].features.map((feature, index) => (
                                    <motion.tr
                                        key={index}
                                        className="border-b"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <td className="p-2">{feature.name}</td>
                                        {state.plans.map(plan => (
                                            <td key={plan.name} className="p-2 text-center">
                                                {plan.features.some(f => f.name === feature.name) ? (
                                                    <Check className="h-4 w-4 mx-auto text-green-500" />
                                                ) : (
                                                    <X className="h-4 w-4 mx-auto text-red-500" />
                                                )}
                                            </td>
                                        ))}
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Additional features section */}
            <motion.div
                className="mt-16"
                variants={containerVariants}
            >
                <motion.h2
                    className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
                    variants={itemVariants}
                >
                    Additional Features
                </motion.h2>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    variants={containerVariants}
                >
                    {state.additionalFeatures.map((feature, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        {feature.icon}
                                        <span className="ml-2">{feature.name}</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{feature.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
                className="mt-16"
                variants={containerVariants}
            >
                <motion.h2
                    className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
                    variants={itemVariants}
                >
                    Frequently Asked Questions
                </motion.h2>
                <Accordion type="single" collapsible className="w-full">
                    {state.faqItems.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>{item.question}</AccordionTrigger>
                            <AccordionContent>
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </motion.div>

            {/* Promo code section */}
            <motion.div
                className="mt-16"
                variants={containerVariants}
            >
                <motion.h2
                    className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
                    variants={itemVariants}
                >
                    Have a Promo Code?
                </motion.h2>
                <motion.form
                    onSubmit={handlePromoCodeSubmit}
                    className="flex justify-center"
                    variants={itemVariants}
                >
                    <Input
                        type="text"
                        placeholder="Enter promo code"
                        value={state.promoCode}
                        onChange={(e) => setState(prev => ({ ...prev, promoCode: e.target.value }))}
                        className="max-w-xs mr-2"
                    />
                    <Button type="submit">Apply</Button>
                </motion.form>
                <AnimatePresence>
                    {state.discountApplied && (
                        <motion.p
                            className="text-center text-green-500 mt-2"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                        >
                            10% discount applied!
                        </motion.p>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Customer testimonials */}
            <motion.div
                className="mt-16"
                variants={containerVariants}
            >
                <motion.h2
                    className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
                    variants={itemVariants}
                >
                    What Our Customers Say
                </motion.h2>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                >
                    {state.testimonials.map((testimonial, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105">
                                <CardContent className="pt-6">
                                    <p className="italic">{testimonial.quote}</p>
                                    <p className="font-semibold mt-4">- {testimonial.author}</p>
                                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Call-to-action section */}
            <motion.div
                className="mt-16 text-center"
                variants={containerVariants}
            >
                <motion.h2
                    className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
                    variants={itemVariants}
                >
                    Ready to Get Started?
                </motion.h2>
                <motion.p
                    className="mb-8 text-lg"
                    variants={itemVariants}
                >
                    Join thousands of satisfied customers and take your project to the next level.
                </motion.p>
                <motion.div variants={itemVariants}>
                    <Button size="lg" className="animate-pulse transition-all duration-300 hover:shadow-lg hover:scale-105">
                        Start Your Free Trial
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </motion.div>
            </motion.div>

            {/* Plan selection dialog */}
            <AnimatePresence>
                {state.selectedPlan && (
                    <Dialog open={!!state.selectedPlan} onOpenChange={() => setState(prev => ({ ...prev, selectedPlan: null }))}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Subscribe to {state.selectedPlan.name} Plan</DialogTitle>
                                <DialogDescription>
                                    You've selected the {state.selectedPlan.name} plan. Please review the details below.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                                <h3 className="font-semibold mb-2">Plan Details:</h3>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Price: {formatPrice(state.isYearly ? state.selectedPlan.yearlyPrice / 12 : state.selectedPlan.monthlyPrice)}/{state.isYearly ? 'month (billed annually)' : 'month'}</li>
                                    <li>Billing Cycle: {state.isYearly ? 'Annual' : 'Monthly'}</li>
                                    <li>Max Users: {state.selectedPlan.maxUsers}</li>
                                    <li>Trial Period: {state.selectedPlan.trialDays} days</li>
                                </ul>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={() => setState(prev => ({ ...prev, selectedPlan: null }))}>Cancel</Button>
                                <Button onClick={() => {
                                    // Here you would typically handle the subscription process
                                    alert(`Thank you for subscribing to the ${state.selectedPlan.name} plan!`)
                                    setState(prev => ({ ...prev, selectedPlan: null }))
                                }}>Confirm Subscription</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </AnimatePresence>

            {/* Progress bar */}
            <motion.div
                className="mt-16"
                variants={containerVariants}
            >
                <motion.h3
                    className="text-lg font-semibold mb-2"
                    variants={itemVariants}
                >
                    Our Growth
                </motion.h3>
                <motion.div variants={itemVariants}>
                    <Progress value={state.progress} className="w-full" />
                </motion.div>
                <motion.p
                    className="text-sm text-muted-foreground mt-2"
                    variants={itemVariants}
                >
                    Over 10,000 businesses trust our platform
                </motion.p>
            </motion.div>

            {/* Additional information */}
            <motion.p
                className="text-center text-sm text-muted-foreground mt-12"
                variants={itemVariants}
            >
                All plans come with a 30-day money-back guarantee.
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <HelpCircle className="inline-block h-4 w-4 ml-1 mb-1 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>If you're not satisfied, get a full refund within 30 days</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </motion.p>

            {/* Footer */}
            <motion.footer
                className="mt-16 text-center text-sm text-muted-foreground"
                variants={containerVariants}
            >
                <motion.p variants={itemVariants}>&copy; 2023 Your Company Name. All rights reserved.</motion.p>
                <motion.div
                    className="mt-2"
                    variants={itemVariants}
                >
                    <a href="#" className="underline hover:text-primary transition-colors duration-300">Terms of Service</a> |
                    <a href="#" className="underline ml-2 hover:text-primary transition-colors duration-300">Privacy Policy</a> |
                    <a href="#" className="underline ml-2 hover:text-primary transition-colors duration-300">Contact Us</a>
                </motion.div>
            </motion.footer>
        </motion.div>
    )
}