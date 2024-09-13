import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Check, HelpCircle, Info, Zap, X, ArrowRight, Shield, Clock, Users, BarChart, Edit3, Plus, Minus, Save, Trash2, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { motion, AnimatePresence } from 'framer-motion';
import TextEditor from './Edit'; // Adjust the path as needed

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
};

export default function EnhancedEditablePricingPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [progress, setProgress] = useState(0);
  const [pageTitle, setPageTitle] = useState({ text: 'Choose Your Perfect Plan', style: {} });
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [secondaryColor, setSecondaryColor] = useState('#6b7280');
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [selectedElement, setSelectedElement] = useState(null);
  const [monthlyText, setMonthlyText] = useState({ text: 'Monthly', style: {} });
  const [yearlyText, setYearlyText] = useState({ text: 'Yearly', style: {} });

  const [plans, setPlans] = useState([
    {
      name: { text: 'Basic', style: {} },
      description: { text: 'Essential features for small projects', style: {} },
      monthlyPrice: 19,
      yearlyPrice: 190,
      features: [
        { name: { text: 'Up to 5 projects', style: {} }, description: { text: 'Create and manage up to 5 different projects', style: {} } },
        { name: { text: '5GB storage', style: {} }, description: { text: 'Store up to 5GB of files and assets', style: {} } },
        { name: { text: 'Basic support', style: {} }, description: { text: 'Email support with 48-hour response time', style: {} } },
        { name: { text: 'Limited API access', style: {} }, description: { text: 'Access to basic API endpoints', style: {} } },
        { name: { text: 'Community forums', style: {} }, description: { text: 'Access to our community support forums', style: {} } },
      ],
      color: '#3b82f6',
      maxUsers: 5,
      trialDays: 14,
    },
    {
      name: { text: 'Pro', style: {} },
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
      color: '#8b5cf6',
      popular: true,
      maxUsers: 20,
      trialDays: 30,
    },
    {
      name: { text: 'Enterprize', style: {} },
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
      color: '#10b981',
      maxUsers: 'Unlimited',
      trialDays: 60,
    },
  ]);

  const [additionalFeatures, setAdditionalFeatures] = useState([
    { name: 'Single Sign-On (SSO)', description: 'Secure and streamlined authentication', icon: 'Shield' },
    { name: 'Audit Logs', description: 'Detailed logs of all account activities', icon: 'Clock' },
    { name: 'User Roles & Permissions', description: 'Granular control over user access', icon: 'Users' },
    { name: 'Advanced Reporting', description: 'Generate and export custom reports', icon: 'BarChart' },
  ]);

  const [currencies, setCurrencies] = useState({
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.85 },
    GBP: { symbol: '£', rate: 0.75 },
    JPY: { symbol: '¥', rate: 110 },
  });

  const [faqs, setFaqs] = useState([
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for annual subscriptions.',
    },
    {
      question: 'Can I change my plan later?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
    },
    {
      question: 'Is there a long-term commitment?',
      answer: 'No, all plans are billed monthly or annually with no long-term commitment. You can cancel at any time.',
    },
    {
      question: 'Do you offer custom enterprise solutions?',
      answer: 'Yes, we offer tailored solutions for large enterprises. Please contact our sales team for more information.',
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCurrencyChange = (value) => {
    setCurrency(value);
  };

  const handlePromoCodeSubmit = (e) => {
    e.preventDefault();
    if (promoCode.toLowerCase() === 'discount10') {
      setDiscountApplied(true);
    }
  };

  const formatPrice = (price) => {
    const convertedPrice = price * currencies[currency].rate;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, currencyDisplay: 'narrowSymbol' }).format(convertedPrice);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    setSelectedElement(null);
  };

  const handlePlanEdit = (index, field, value) => {
    const newPlans = plans.map((plan, idx) => idx === index ? { ...plan, [field]: value } : plan);
    setPlans(newPlans);
  };

  const handleFeatureEdit = (planIndex, featureIndex, field, value) => {
    const newPlans = plans.map((plan, idx) =>
      idx === planIndex
        ? {
            ...plan,
            features: plan.features.map((feature, fIdx) =>
              fIdx === featureIndex ? { ...feature, [field]: value } : feature
            ),
          }
        : plan
    );
    setPlans(newPlans);
  };

  const handleAdditionalFeatureEdit = (index, field, value) => {
    const newFeatures = additionalFeatures.map((feature, idx) =>
      idx === index ? { ...feature, [field]: value } : feature
    );
    setAdditionalFeatures(newFeatures);
  };

  const addPlan = () => {
    const newPlan = {
      name: { text: 'New Plan', style: {} },
      description: { text: 'Description for the new plan', style: {} },
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [],
      color: '#000000',
      maxUsers: 1,
      trialDays: 0,
    };
    setPlans([...plans, newPlan]);
  };

  const removePlan = (index) => {
    const newPlans = plans.filter((_, i) => i !== index);
    setPlans(newPlans);
  };

  const addFeature = (planIndex) => {
    const newPlans = plans.map((plan, idx) =>
      idx === planIndex ? { ...plan, features: [...plan.features, { name: 'New Feature', description: 'Description for the new feature' }] } : plan
    );
    setPlans(newPlans);
  };

  const removeFeature = (planIndex, featureIndex) => {
    const newPlans = plans.map((plan, idx) =>
      idx === planIndex ? { ...plan, features: plan.features.filter((_, i) => i !== featureIndex) } : plan
    );
    setPlans(newPlans);
  };

  const addAdditionalFeature = () => {
    setAdditionalFeatures([...additionalFeatures, { name: 'New Feature', description: 'Description for the new feature', icon: 'Check' }]);
  };

  const removeAdditionalFeature = (index) => {
    const newFeatures = additionalFeatures.filter((_, i) => i !== index);
    setAdditionalFeatures(newFeatures);
  };

  const addFaq = () => {
    setFaqs([...faqs, { question: 'New Question', answer: 'Answer to the new question' }]);
  };

  const removeFaq = (index) => {
    const newFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(newFaqs);
  };

  const handleFaqEdit = (index, field, value) => {
    const newFaqs = faqs.map((faq, idx) => (idx === index ? { ...faq, [field]: value } : faq));
    setFaqs(newFaqs);
  };

  const applyTextStyle = (textObj) => {
    if (!textObj || typeof textObj !== 'object') {
      return String(textObj);
    }

    const { text, style = {} } = textObj;
    let styledText = text;

    if (style.color) {
      styledText = `<span style="color: ${style.color}">${styledText}</span>`;
    }
    if (style.fontSize) {
      styledText = `<span style="font-size: ${style.fontSize}">${styledText}</span>`;
    }
    if (style.href) {
      styledText = `<a href="${style.href}" style="color: inherit; text-decoration: underline;">${styledText}</a>`;
    }
    return styledText;
  };

  const renderEditableText = (textObj, onChange, multiline = false, id = '') => {
    if (!textObj || typeof textObj !== 'object') {
      textObj = { text: String(textObj), style: {} };
    }

    const { text, style = {} } = textObj;
    const isSelected = selectedElement && selectedElement.id === id;

    const slateInitialValue = [{ type: 'paragraph', children: [{ text }] }];

    return isEditing ? (
      <div
        className={`relative ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
        onClick={() => setSelectedElement({ id, type: 'text', onChange })}
      >
        <TextEditor
          content={slateInitialValue}
          onSave={(newSlateContent) => {
            const newText = newSlateContent[0]?.children[0]?.text || '';
            onChange({ text: newText, style });
          }}
        />
      </div>
    ) : (
      <span
        className="editable-text"
        dangerouslySetInnerHTML={{ __html: applyTextStyle(textObj) }}
      />
    );
  };

  const renderEditableButton = (text, onClick, style = {}, id = '') => {
    const isSelected = selectedElement && selectedElement.id === id;
    return isEditing ? (
      <div
        className={`relative ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
        onClick={() => setSelectedElement({ id, type: 'button', style, onChange: (newText, newStyle) => onClick(newText, newStyle) })}
      >
        <Button style={style}>{text}</Button>
        {isSelected && (
          <div className="absolute top-full left-0 mt-2 bg-white p-2 border border-gray-300 rounded shadow-lg z-10">
            <Label>Text</Label>
            <input
              type="text"
              value={text}
              onChange={(e) => onClick(e.target.value, style)}
              className="block w-full mt-1 p-2 border border-gray-300 rounded"
            />
            <Label className="mt-2">Text Color</Label>
            <input
              type="color"
              value={style.color || '#ffffff'}
              onChange={(e) => onClick(text, { ...style, color: e.target.value })}
              className="block w-full mt-1"
            />
            <Label className="mt-2">Font Size</Label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={parseFloat(style.fontSize) || 1}
              onChange={(e) => onClick(text, { ...style, fontSize: `${e.target.value}rem` })}
              className="block w-full mt-1"
            />
          </div>
        )}
      </div>
    ) : (
      <Button
        onClick={onClick}
        style={style}
      >
        {text}
      </Button>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16 transition-all duration-300 ease-in-out"
      style={{
        '--primary-color': primaryColor,
        '--secondary-color': secondaryColor,
        fontSize: `${fontSizeMultiplier}rem`,
      }}
    >
      {/* Header */}
      <motion.div
        className="flex justify-between items-center mb-8"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center">
          {renderEditableText(pageTitle, setPageTitle, false, 'page-title')}
        </h1>
        <Button onClick={toggleEditing}>
          {isEditing ? <Save className="mr-2" /> : <Edit3 className="mr-2" />}
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </motion.div>

      {/* Pricing Plans */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={`flex flex-col ${plan.popular ? 'border-primary' : ''} transition-all duration-300 ease-in-out hover:shadow-lg`}>
              <CardHeader style={{ backgroundColor: plan.color }} className="text-white">
                <CardTitle className="flex items-center justify-between">
                  {renderEditableText(plan.name, (value) => handlePlanEdit(index, 'name', value), false, `plan-name-${index}`)}
                  {isEditing && (
                    <Switch
                      checked={plan.popular}
                      onCheckedChange={(checked) => handlePlanEdit(index, 'popular', checked)}
                    />
                  )}
                  {plan.popular && (
                    <Badge variant="secondary" className="bg-white text-primary">
                      {renderEditableText({ text: 'Popular', style: {} }, () => {}, false, `popular-badge-${index}`)}
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-white/90">
                  {renderEditableText(plan.description, (value) => handlePlanEdit(index, 'description', value), true, `plan-description-${index}`)}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="text-3xl font-bold mb-4">
                  {isEditing ? (
                    <input
                      type="number"
                      value={isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      onChange={(e) => handlePlanEdit(index, isYearly ? 'yearlyPrice' : 'monthlyPrice', parseFloat(e.target.value))}
                      className="w-24 p-1 border border-gray-300 rounded"
                    />
                  ) : (
                    formatPrice(isYearly ? plan.yearlyPrice / 12 : plan.monthlyPrice)
                  )}
                  <span className="text-sm font-normal text-muted-foreground">
                    /{isYearly ? 'mo' : 'month'}
                  </span>
                </div>
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
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>
                        {renderEditableText(feature.name, (value) => handleFeatureEdit(index, featureIndex, 'name', value), false, `feature-${index}-${featureIndex}`)}
                      </span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 ml-2 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {renderEditableText(feature.description, (value) => handleFeatureEdit(index, featureIndex, 'description', value), false, `feature-description-${index}-${featureIndex}`)}
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
                <div className="text-sm text-muted-foreground mb-4">
                  <span className="font-semibold">Max Users:</span>{' '}
                  {renderEditableText(plan.maxUsers, (value) => handlePlanEdit(index, 'maxUsers', value), false, `max-users-${index}`)}
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  <span className="font-semibold">Trial Period:</span>{' '}
                  {renderEditableText(plan.trialDays, (value) => handlePlanEdit(index, 'trialDays', value), false, `trial-days-${index}`)} days
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                  {renderEditableText({ text: `Choose ${plan.name.text}`, style: {} }, () => {}, false, `choose-plan-${index}`)}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {isEditing && (
        <Button className="mt-4" onClick={addPlan}>
          Add New Plan
        </Button>
      )}

      <div className="flex justify-center mt-8">
        {renderEditableButton(
          `${showComparison ? 'Hide' : 'Show'} Feature Comparison`,
          () => setShowComparison(!showComparison),
          { variant: 'outline' },
          'toggle-comparison'
        )}
      </div>

      {showComparison && (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="p-2 text-left">Feature</th>
                {plans.map((plan, index) => (
                  <th key={index} className="p-2 text-center">
                    {renderEditableText(plan.name, (value) => handlePlanEdit(index, 'name', value), false, {}, `comparison-plan-${index}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {plans[plans.length - 1].features.map((feature, featureIndex) => (
                <tr key={featureIndex} className="border-b">
                  <td className="p-2">
                    {renderEditableText(feature.name, (value) => handleFeatureEdit(plans.length - 1, featureIndex, 'name', value), false, {}, `comparison-feature-${featureIndex}`)}
                  </td>
                  {plans.map((plan, planIndex) => (
                    <td key={planIndex} className="p-2 text-center">
                      {isEditing ? (
                        <Switch
                          checked={plan.features.some(f => f.name === feature.name)}
                          onCheckedChange={(checked) => {
                            const newPlans = [...plans];
                            if (checked) {
                              newPlans[planIndex].features.push({ ...feature });
                            } else {
                              newPlans[planIndex].features = newPlans[planIndex].features.filter(f => f.name !== feature.name);
                            }
                            setPlans(newPlans);
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
        </div>
      )}

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          {renderEditableText('Additional Features', (value) => { }, false, {}, 'additional-features-title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {additionalFeatures.map((feature, index) => (
            <Card key={index} className="transition-all duration-300 ease-in-out hover:shadow-lg">
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
                    React.createElement(iconMap[feature.icon], { className: 'h-6 w-6 mr-2' })
                  )}
                  <span className="ml-2">
                    {renderEditableText(feature.name, (value) => handleAdditionalFeatureEdit(index, 'name', value), false, {}, `additional-feature-name-${index}`)}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  {renderEditableText(feature.description, (value) => handleAdditionalFeatureEdit(index, 'description', value), false, {}, `additional-feature-description-${index}`)}
                </p>
              </CardContent>
              {isEditing && (
                <CardFooter>
                  <Button variant="destructive" onClick={() => removeAdditionalFeature(index)}>
                    Remove Feature
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
        {isEditing && (
          <Button className="mt-4" onClick={addAdditionalFeature}>
            Add Additional Feature
          </Button>
        )}
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          {renderEditableText('Frequently Asked Questions', (value) => { }, false, {}, 'faq-title')}
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>
                {renderEditableText(faq.question, (value) => handleFaqEdit(index, 'question', value), false, {}, `faq-question-${index}`)}
              </AccordionTrigger>
              <AccordionContent>
                {renderEditableText(faq.answer, (value) => handleFaqEdit(index, 'answer', value), true, {}, `faq-answer-${index}`)}
              </AccordionContent>
              {isEditing && (
                <Button variant="destructive" onClick={() => removeFaq(index)}>
                  Remove FAQ
                </Button>
              )}
            </AccordionItem>
          ))}
        </Accordion>
        {isEditing && (
          <Button className="mt-4" onClick={addFaq}>
            Add FAQ
          </Button>
        )}
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          {renderEditableText('Have a Promo Code?', (value) => { }, false, {}, 'promo-title')}
        </h2>
        <form onSubmit={handlePromoCodeSubmit} className="flex justify-center">
          <Input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="max-w-xs mr-2"
          />
          {renderEditableButton('Apply', () => { }, {}, 'apply-promo')}
        </form>
        {discountApplied && (
          <p className="text-center text-green-500 mt-2">
            {renderEditableText('10% discount applied!', (value) => { }, false, {}, 'discount-message')}
          </p>
        )}
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          {renderEditableText('What Our Customers Say', (value) => { }, false, {}, 'testimonials-title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="transition-all duration-300 ease-in-out hover:shadow-lg">
            <CardContent className="pt-6">
              <p className="italic">
                {renderEditableText('"This platform has revolutionized our workflow. Highly recommended!"', (value) => { }, false, {}, 'testimonial-1')}
              </p>
              <p className="font-semibold mt-4">
                {renderEditableText('- John Doe, CEO of TechCorp', (value) => { }, false, {}, 'testimonial-1-author')}
              </p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 ease-in-out hover:shadow-lg">
            <CardContent className="pt-6">
              <p className="italic">
                {renderEditableText('"The features and customer support are unmatched. A game-changer for our team."', (value) => { }, false, {}, 'testimonial-2')}
              </p>
              <p className="font-semibold mt-4">
                {renderEditableText('- Jane Smith, CTO of InnovateCo', (value) => { }, false, {}, 'testimonial-2-author')}
              </p>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 ease-in-out hover:shadow-lg">
            <CardContent className="pt-6">
              <p className="italic">
                {renderEditableText('"Scalable, reliable, and user-friendly. Everything we needed in one place."', (value) => { }, false, {}, 'testimonial-3')}
              </p>
              <p className="font-semibold mt-4">
                {renderEditableText('- Mike Johnson, Project Manager at BuildIt', (value) => { }, false, {}, 'testimonial-3-author')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          {renderEditableText('Ready to Get Started?', (value) => { }, false, {}, 'cta-title')}
        </h2>
        <p className="mb-8">
          {renderEditableText('Join thousands of satisfied customers and take your project to the next level.', (value) => { }, false, {}, 'cta-description')}
        </p>
        {renderEditableButton(
          'Start Your Free Trial',
          () => { },
          {
            size: 'lg',
            className: 'transition-all duration-300 ease-in-out hover:scale-105',
          },
          'cta-button'
        )}
      </div>

      {selectedPlan && (
        <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {renderEditableText(`Subscribe to ${selectedPlan.name} Plan`, (value) => { }, false, {}, 'dialog-title')}
              </DialogTitle>
              <DialogDescription>
                {renderEditableText(`You've selected the ${selectedPlan.name} plan. Please review the details below.`, (value) => { }, false, {}, 'dialog-description')}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <h3 className="font-semibold mb-2">
                {renderEditableText('Plan Details:', (value) => { }, false, {}, 'dialog-details-title')}
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  {renderEditableText(`Price: ${formatPrice(isYearly ? selectedPlan.yearlyPrice / 12 : selectedPlan.monthlyPrice)}/${isYearly ? 'month (billed annually)' : 'month'}`, (value) => { }, false, {}, 'dialog-price')}
                </li>
                <li>
                  {renderEditableText(`Billing Cycle: ${isYearly ? 'Annual' : 'Monthly'}`, (value) => { }, false, {}, 'dialog-billing-cycle')}
                </li>
                <li>
                  {renderEditableText(`Max Users: ${selectedPlan.maxUsers}`, (value) => { }, false, {}, 'dialog-max-users')}
                </li>
                <li>
                  {renderEditableText(`Trial Period: ${selectedPlan.trialDays} days`, (value) => { }, false, {}, 'dialog-trial-period')}
                </li>
              </ul>
            </div>
            <div className="flex justify-end space-x-2">
              {renderEditableButton('Cancel', () => setSelectedPlan(null), { variant: 'outline' }, 'dialog-cancel')}
              {renderEditableButton('Confirm Subscription', () => {
                alert(`Thank you for subscribing to the ${selectedPlan.name} plan!`);
                setSelectedPlan(null);
              }, {}, 'dialog-confirm')}
            </div>
          </DialogContent>
        </Dialog>
      )}

      <div className="mt-16">
        <h3 className="text-lg font-semibold mb-2">
          {renderEditableText('Our Growth', (value) => { }, false, {}, 'growth-title')}
        </h3>
        <Progress value={progress} className="w-full" />
        <p className="text-sm text-muted-foreground mt-2">
          {renderEditableText('Over 10,000 businesses trust our platform', (value) => { }, false, {}, 'growth-description')}
        </p>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-12">
        {renderEditableText('All plans come with a 30-day money-back guarantee.', (value) => { }, false, {}, 'guarantee-text')}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="inline-block h-4 w-4 ml-1 mb-1 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {renderEditableText("If you're not satisfied, get a full refund within 30 days", (value) => { }, false, {}, 'guarantee-tooltip')}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </p>

      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p>
          {renderEditableText('© 2023 Your Company Name. All rights reserved.', (value) => { }, false, {}, 'footer-copyright')}
        </p>
        <div className="mt-2">
          {renderEditableText('Terms of Service', (value) => { }, false, { href: '#' }, 'footer-terms')} |{' '}
          {renderEditableText('Privacy Policy', (value) => { }, false, { href: '#' }, 'footer-privacy')} |{' '}
          {renderEditableText('Contact Us', (value) => { }, false, { href: '#' }, 'footer-contact')}
        </div>
      </footer>
    </motion.div>
  );
}
