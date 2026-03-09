import Link from "next/link"
import React from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"

const months = [
  { label: "MM", value: null },
  { label: "01", value: "01" },
  { label: "02", value: "02" },
  { label: "03", value: "03" },
  { label: "04", value: "04" },
  { label: "05", value: "05" },
  { label: "06", value: "06" },
  { label: "07", value: "07" },
  { label: "08", value: "08" },
  { label: "09", value: "09" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" },
]

const years = [
  { label: "YYYY", value: null },
  { label: "2024", value: "2024" },
  { label: "2025", value: "2025" },
  { label: "2026", value: "2026" },
  { label: "2027", value: "2027" },
  { label: "2028", value: "2028" },
  { label: "2029", value: "2029" },
]

export default function PaymentPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Decorative background (consistent with your enhanced pages) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/25 via-sky-500/20 to-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-40 right-[-120px] h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-fuchsia-500/15 via-indigo-500/15 to-sky-500/15 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.06)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_75%)]" />
      </div>

      {/* Top nav */}
      <header className="relative z-10 border-b border-border/60 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-foreground text-background">
              <span className="text-sm font-bold">A</span>
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Lord Naz</p>
              <p className="text-xs text-muted-foreground">Checkout</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/#features" className="text-sm text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="/#security" className="text-sm text-muted-foreground hover:text-foreground">
              Security
            </Link>
            <Link href="/support" className="text-sm text-muted-foreground hover:text-foreground">
              Support
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Home</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 mx-auto max-w-6xl px-4 py-10 md:py-14">
        {/* Page header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Payment</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose a payment method. All transactions are secure and encrypted.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-0">
            <Button variant="secondary" asChild>
              <Link href="/pricing">View Plans</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/support">Need Help?</Link>
            </Button>
          </div>
        </div>

        {/* Content grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Left: Payment form */}
          <div className="lg:col-span-2">
            <Card className="border-border/60 bg-background/70 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-background/50">
              <CardHeader className="space-y-2">
                <CardTitle className="text-xl">Payment Method</CardTitle>
                <CardDescription>
                  Enter your card details and billing address to complete checkout.
                </CardDescription>

                <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Secure payment • SSL encrypted • PCI-ready UI
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Card details */}
                <FieldSet>
                  <FieldLegend>Card details</FieldLegend>
                  <FieldDescription>We accept major credit and debit cards.</FieldDescription>

                  <FieldGroup className="mt-4">
                    <Field>
                      <FieldLabel>
                        <Label htmlFor="nameOnCard">Name on Card</Label>
                      </FieldLabel>
                      <Input id="nameOnCard" placeholder="e.g., Muhammad Nazrul Hanif" />
                    </Field>

                    <Field>
                      <FieldLabel>
                        <Label htmlFor="cardNumber">Card Number</Label>
                      </FieldLabel>
                      <Input
                        id="cardNumber"
                        inputMode="numeric"
                        placeholder="1234 5678 9012 3456"
                      />
                      <FieldDescription>Enter your 16-digit card number.</FieldDescription>
                    </Field>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <Field>
                        <FieldLabel>
                          <Label>Month</Label>
                        </FieldLabel>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {months.map((item) => (
                                <SelectItem
                                  key={item.label}
                                  value={item.value ?? "placeholder-mm"}
                                  disabled={item.value === null}
                                >
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </Field>

                      <Field>
                        <FieldLabel>
                          <Label>Year</Label>
                        </FieldLabel>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="YYYY" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {years.map((item) => (
                                <SelectItem
                                  key={item.label}
                                  value={item.value ?? "placeholder-yyyy"}
                                  disabled={item.value === null}
                                >
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </Field>

                      <Field>
                        <FieldLabel>
                          <Label htmlFor="cvv">CVV</Label>
                        </FieldLabel>
                        <Input
                          id="cvv"
                          inputMode="numeric"
                          placeholder="123"
                          maxLength={4}
                        />
                        <FieldDescription>3–4 digits on your card.</FieldDescription>
                      </Field>
                    </div>
                  </FieldGroup>
                </FieldSet>

                <FieldSeparator />

                {/* Billing Address */}
                <FieldSet>
                  <FieldLegend>Billing Address</FieldLegend>
                  <FieldDescription>
                    The billing address associated with your payment method.
                  </FieldDescription>

                  <FieldGroup className="mt-4">
                    <div className="flex items-center gap-2">
                      <Checkbox id="sameAsShipping" />
                      <Label htmlFor="sameAsShipping" className="text-sm">
                        Same as shipping address
                      </Label>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field>
                        <FieldLabel>
                          <Label htmlFor="address1">Address line 1</Label>
                        </FieldLabel>
                        <Input id="address1" placeholder="Street address" />
                      </Field>

                      <Field>
                        <FieldLabel>
                          <Label htmlFor="address2">Address line 2</Label>
                        </FieldLabel>
                        <Input id="address2" placeholder="Unit, suite, etc. (optional)" />
                      </Field>

                      <Field>
                        <FieldLabel>
                          <Label htmlFor="city">City</Label>
                        </FieldLabel>
                        <Input id="city" placeholder="e.g., Sungai Buloh" />
                      </Field>

                      <Field>
                        <FieldLabel>
                          <Label htmlFor="postcode">Postcode</Label>
                        </FieldLabel>
                        <Input id="postcode" inputMode="numeric" placeholder="e.g., 47000" />
                      </Field>
                    </div>

                    <Field>
                      <FieldLabel>
                        <Label htmlFor="comments">Comments</Label>
                      </FieldLabel>
                      <Textarea id="comments" placeholder="Add any notes for this payment (optional)" />
                    </Field>
                  </FieldGroup>
                </FieldSet>
              </CardContent>

              <CardFooter className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  By submitting, you confirm the payment details are correct.
                </p>

                <div className="flex w-full gap-2 sm:w-auto">
                  <Button className="w-full sm:w-auto" type="button">
                    Submit
                  </Button>
                  <Button className="w-full sm:w-auto" variant="outline" type="button">
                    Cancel
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Right: Order summary */}
          <aside className="lg:col-span-1">
            <Card className="border-border/60 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg">Order Summary</CardTitle>
                <CardDescription>Learning-mode preview (static values)</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="rounded-lg border border-border/60 bg-background/40 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Plan</span>
                    <span className="font-medium">Starter</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Billing</span>
                    <span className="font-medium">Monthly</span>
                  </div>

                  <div className="my-4 h-px bg-border/60" />

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">$12.00</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">$0.00</span>
                  </div>

                  <div className="my-4 h-px bg-border/60" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <span className="text-xl font-semibold">$12.00</span>
                  </div>
                </div>

                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-700 dark:text-emerald-300">
                  Your payment details are not stored in this demo UI.
                  This section is for learning and layout practice.
                </div>

                <Button variant="secondary" className="w-full" asChild>
                  <Link href="/pricing">Change plan</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* Footer */}
        <footer className="mt-10 border-t border-border/60 pt-6 text-xs text-muted-foreground">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Lord Naz. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/terms" className="hover:text-foreground">Terms</Link>
              <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
              <Link href="/support" className="hover:text-foreground">Support</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
