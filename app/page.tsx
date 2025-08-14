"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

type InterviewStage =
  | "welcome"
  | "domain_question"
  | "problem_intro"
  | "problem_resonance"
  | "problem_explanation"
  | "value_prop"
  | "price_test"
  | "intent"
  | "closing"
  | "complete"

interface InterviewData {
  domain: string
  domainResponse: string
  resonanceScore: number | null
  explanationResponse: string
  valuePropResponse: string
  priceResponse: string
  intentResponse: string
}

export default function InterviewAgent() {
  const [stage, setStage] = useState<InterviewStage>("welcome")
  const [currentInput, setCurrentInput] = useState("")
  const [data, setData] = useState<InterviewData>({
    domain: "productivity and time management",
    domainResponse: "",
    resonanceScore: null,
    explanationResponse: "",
    valuePropResponse: "",
    priceResponse: "",
    intentResponse: "",
  })

  const handleNext = () => {
    switch (stage) {
      case "welcome":
        setStage("domain_question")
        break
      case "domain_question":
        setData((prev) => ({ ...prev, domainResponse: currentInput }))
        setCurrentInput("")
        setStage("problem_intro")
        break
      case "problem_intro":
        setStage("problem_resonance")
        break
      case "problem_resonance":
        const score = Number.parseInt(currentInput)
        if (score >= 1 && score <= 5) {
          setData((prev) => ({ ...prev, resonanceScore: score }))
          setCurrentInput("")
          setStage("problem_explanation")
        }
        break
      case "problem_explanation":
        setData((prev) => ({ ...prev, explanationResponse: currentInput }))
        setCurrentInput("")
        setStage("value_prop")
        break
      case "value_prop":
        setData((prev) => ({ ...prev, valuePropResponse: currentInput }))
        setCurrentInput("")
        setStage("price_test")
        break
      case "price_test":
        setData((prev) => ({ ...prev, priceResponse: currentInput }))
        setCurrentInput("")
        setStage("intent")
        break
      case "intent":
        setData((prev) => ({ ...prev, intentResponse: currentInput }))
        setCurrentInput("")
        setStage("closing")
        break
      case "closing":
        setStage("complete")
        break
    }
  }

  const handleScoreSelect = (score: number) => {
    setCurrentInput(score.toString())
  }

  const renderStage = () => {
    switch (stage) {
      case "welcome":
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <Image src="/logo.png" alt="Interview Agent Logo" width={120} height={60} className="mx-auto" />
              <h1 className="text-3xl font-bold text-foreground">User Interview</h1>
            </div>

            <Card className="border-2">
              <CardContent className="p-8 space-y-4">
                <p className="text-lg leading-relaxed">Hi! Thanks so much for taking the time to chat with me.</p>
                <p className="leading-relaxed">
                  I'm doing early research on behalf of a founder who's exploring a new idea. They're genuinely
                  interested in learning what's <em>really</em> going on for people like you — even if the truth is
                  messy or unexpected.
                </p>
                <p className="leading-relaxed">
                  So please be brutally honest. That's exactly what the founder <strong>wants and needs</strong> at this
                  stage.
                </p>
                <p className="leading-relaxed">
                  Everything you share will be kept confidential and only shared in aggregated form with the founder —
                  never directly linked to you.
                </p>
                <p className="font-medium">Sound good?</p>
              </CardContent>
            </Card>

            <Button onClick={handleNext} className="w-full py-6 text-lg">
              Let's Begin
            </Button>
          </div>
        )

      case "domain_question":
        return (
          <div className="space-y-6">
            <Card className="border-2">
              <CardContent className="p-8 space-y-4">
                <p className="text-lg leading-relaxed">
                  The founder is keen to understand your experience when it comes to <strong>"{data.domain}"</strong>
                </p>
                <p className="leading-relaxed">
                  Could you share some background? Could you tell me about any goals you currently have with regards to{" "}
                  <strong>"{data.domain}"</strong>? What are you currently trying to do to reach those goals? What
                  emotions do you feel as you work towards them?
                </p>
              </CardContent>
            </Card>

            <Textarea
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder="Share your experience and goals..."
              className="min-h-32 text-lg"
            />

            <Button onClick={handleNext} disabled={!currentInput.trim()} className="w-full py-6 text-lg">
              Continue
            </Button>
          </div>
        )

      case "problem_intro":
        return (
          <div className="space-y-6">
            <Card className="border-2">
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed">
                  Thanks! Unless there's anything else you'd like to share, we can zoom into some specific 'problem
                  spaces' that the founder is exploring.
                </p>
              </CardContent>
            </Card>

            <Button onClick={handleNext} className="w-full py-6 text-lg">
              Let's Explore Problems
            </Button>
          </div>
        )

      case "problem_resonance":
        return (
          <div className="space-y-6">
            <Card className="border-2">
              <CardContent className="p-8 space-y-4">
                <p className="text-lg leading-relaxed">
                  On a scale of 1 to 5, how much does this statement resonate with your own personal experience?
                </p>
                <div className="bg-muted p-6 rounded-lg border-l-4 border-primary">
                  <p className="text-lg font-medium">
                    🧠 "I struggle to stay focused and productive throughout my workday, often getting distracted by
                    notifications, emails, and competing priorities."
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5].map((score) => (
                <Button
                  key={score}
                  variant={currentInput === score.toString() ? "default" : "outline"}
                  onClick={() => handleScoreSelect(score)}
                  className="py-8 text-xl font-bold"
                >
                  {score}
                </Button>
              ))}
            </div>

            <div className="flex justify-between text-sm text-muted-foreground px-2">
              <span>Not at all</span>
              <span>Completely</span>
            </div>

            <Button onClick={handleNext} disabled={!currentInput} className="w-full py-6 text-lg">
              Continue
            </Button>
          </div>
        )

      case "problem_explanation":
        return (
          <div className="space-y-6">
            <Card className="border-2">
              <CardContent className="p-8 space-y-4">
                <p className="text-lg leading-relaxed">Can you tell me more about why you gave that score?</p>
                <p className="text-muted-foreground">→ Was there a situation or example that came to mind?</p>
              </CardContent>
            </Card>

            <Textarea
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder="Tell me about your experience..."
              className="min-h-32 text-lg"
            />

            <Button onClick={handleNext} disabled={!currentInput.trim()} className="w-full py-6 text-lg">
              Continue
            </Button>
          </div>
        )

      case "value_prop":
        return (
          <div className="space-y-6">
            <Card className="border-2">
              <CardContent className="p-8 space-y-4">
                <p className="text-lg leading-relaxed">Here's a value proposition the founder is exploring:</p>
                <div className="bg-muted p-6 rounded-lg border-l-4 border-primary">
                  <p className="text-lg font-medium">
                    ✨ "An AI-powered focus assistant that blocks distractions, prioritizes your tasks, and helps you
                    maintain deep work sessions throughout your day."
                  </p>
                </div>
                <p className="leading-relaxed">If they delivered on that, how likely would you be to:</p>
                <p className="font-medium">→ Sign up for early access</p>
                <p className="text-muted-foreground text-sm">
                  (Very likely, somewhat likely, unsure, unlikely, very unlikely)
                </p>
              </CardContent>
            </Card>

            <Textarea
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder="How likely would you be to sign up? Why?"
              className="min-h-24 text-lg"
            />

            <Button onClick={handleNext} disabled={!currentInput.trim()} className="w-full py-6 text-lg">
              Continue
            </Button>
          </div>
        )

      case "price_test":
        return (
          <div className="space-y-6">
            <Card className="border-2">
              <CardContent className="p-8 space-y-4">
                <p className="text-lg leading-relaxed">
                  If that worked as promised, what would you expect to pay for it?
                </p>
                <p className="text-muted-foreground">→ What would feel fair?</p>
                <p className="text-muted-foreground">→ What would feel expensive?</p>
              </CardContent>
            </Card>

            <Textarea
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder="Share your thoughts on pricing..."
              className="min-h-24 text-lg"
            />

            <Button onClick={handleNext} disabled={!currentInput.trim()} className="w-full py-6 text-lg">
              Continue
            </Button>
          </div>
        )

      case "intent":
        return (
          <div className="space-y-6">
            <Card className="border-2">
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed">
                  Would it be okay if we shared your email with the founder so they can invite you to get early access?
                </p>
              </CardContent>
            </Card>

            <Input
              type="email"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder="your.email@example.com (or 'no thanks')"
              className="text-lg py-6"
            />

            <Button onClick={handleNext} disabled={!currentInput.trim()} className="w-full py-6 text-lg">
              Continue
            </Button>
          </div>
        )

      case "closing":
        return (
          <div className="space-y-6">
            <Card className="border-2">
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed">
                  That's all from my side — is there anything else you think I should understand about your experience?
                </p>
                <p className="mt-4 text-muted-foreground">Really appreciate your time and honesty. 🙏</p>
              </CardContent>
            </Card>

            <Textarea
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder="Any final thoughts? (optional)"
              className="min-h-24 text-lg"
            />

            <Button onClick={handleNext} className="w-full py-6 text-lg">
              Finish Interview
            </Button>
          </div>
        )

      case "complete":
        return (
          <div className="space-y-6 text-center">
            <div className="space-y-4">
              <Image src="/logo.png" alt="Interview Agent Logo" width={120} height={60} className="mx-auto" />
              <h2 className="text-3xl font-bold text-foreground">Thank You!</h2>
            </div>

            <Card className="border-2">
              <CardContent className="p-8 space-y-4">
                <p className="text-lg leading-relaxed">
                  That's all for now — thanks so much for your time and thoughtful answers. You've really helped the
                  founder understand which problems matter most.
                </p>
                <p className="text-muted-foreground">
                  Your responses have been recorded and will be shared with the founder in aggregated form to help
                  improve their product.
                </p>
              </CardContent>
            </Card>

            <Button
              onClick={() => {
                setStage("welcome")
                setCurrentInput("")
                setData({
                  domain: "productivity and time management",
                  domainResponse: "",
                  resonanceScore: null,
                  explanationResponse: "",
                  valuePropResponse: "",
                  priceResponse: "",
                  intentResponse: "",
                })
              }}
              variant="outline"
              className="py-6 text-lg"
            >
              Start New Interview
            </Button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">{renderStage()}</div>
    </div>
  )
}
