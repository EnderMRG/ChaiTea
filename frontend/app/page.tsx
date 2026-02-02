'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  BarChart3,
  Leaf,
  TrendingUp,
  Zap,
  Users,
  LineChart,
  Shield,
  Gauge,
} from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: Leaf,
      title: 'Cultivation Intelligence',
      description:
        'Real-time IoT monitoring of soil moisture, temperature, humidity, and light levels with predictive analytics for optimal growing conditions.',
    },
    {
      icon: BarChart3,
      title: 'AI Leaf Quality Scanner',
      description:
        'Advanced computer vision powered by Gemini AI to grade leaf quality, detect diseases, and ensure premium tea standards automatically.',
    },
    {
      icon: Zap,
      title: 'Smart Climate Control',
      description:
        'Automated environmental management with precise temperature and humidity control for ideal tea growth conditions.',
    },
    {
      icon: Users,
      title: 'Plucker Analytics',
      description:
        'Track basket production per plucker, monitor efficiency metrics, and optimize harvest scheduling in real-time.',
    },
    {
      icon: TrendingUp,
      title: 'Market Intelligence',
      description:
        'AI-powered price forecasting, market trend analysis, and demand prediction to maximize profitability.',
    },
    {
      icon: LineChart,
      title: 'Harvest Optimization',
      description:
        'Data-driven harvest planning, yield predictions, and pest/disease detection to minimize losses.',
    },
  ];

  const stats = [
    { label: 'Real-time Sensors', value: '20+' },
    { label: 'AI Analysis Models', value: '5' },
    { label: 'Data Points Daily', value: '10K+' },
    { label: 'Accuracy Rate', value: '98%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">CHAI-NET</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Intelligent Tea Garden Management System
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              CHAI-NET combines real-time IoT monitoring, AI-powered leaf quality analysis, and
              predictive analytics to optimize every aspect of tea cultivation and maximize yields.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Launch Dashboard
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-t border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Comprehensive Features
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need for modern tea garden management
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="p-6 hover:border-primary/50 transition-colors">
                  <Icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border py-20 sm:py-32 bg-card">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Transform Your Tea Garden Today
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Experience the future of agricultural intelligence with CHAI-NET. Increase yields,
            reduce costs, and ensure premium quality.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Explore Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-foreground">CHAI-NET</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Intelligent tea garden management for the modern age.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 CHAI-NET. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
